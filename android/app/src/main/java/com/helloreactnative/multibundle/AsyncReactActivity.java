package com.helloreactnative.multibundle;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.ViewGroup;
import android.widget.TextView;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.CatalystInstance;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.modules.core.PermissionAwareActivity;
import com.facebook.react.modules.core.PermissionListener;

import java.io.File;
import java.io.IOException;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.FragmentActivity;

/**
 * @filename: AsyncReactActivity
 * @introduction:
 * @author: Frewen.Wong
 * @time: 2020/6/7 16:42
 *         Copyright ©2020 Frewen.Wong. All Rights Reserved.
 */
public abstract class AsyncReactActivity extends FragmentActivity implements DefaultHardwareBackBtnHandler, PermissionAwareActivity {
    /**
     * 所要记载的JSBundle的形式
     * ASSET  Asset目录
     * FILE  本地文件
     * NETWORK 网络加载
     */
    public enum ScriptType {ASSET, FILE, NETWORK}

    /**
     * Bundle加载的标志变量
     */
    protected boolean bundleLoaded = false;

    private final ReactActivityDelegate mDelegate;

    protected AsyncReactActivity() {
        mDelegate = createReactActivityDelegate();
    }

    /**
     * Called at construction time, override if you have a custom delegate implementation.
     */
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentNameInner());
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     * e.g. "MoviesApp"
     */
    final private @Nullable
    String getMainComponentNameInner() {
        if (!bundleLoaded &&
                getBundle().scriptType == ScriptType.NETWORK) {
            return null;
        }
        return getMainComponentName();
    }


    protected @Nullable
    String getMainComponentName() {
        return null;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
        super.onCreate(savedInstanceState, persistentState);
        final ReactInstanceManager manager = getReactNativeHost().getReactInstanceManager();
        /**
         * 如果ReactInstanceManager还没有开始创建Context
         */
        if (!manager.hasStartedCreatingInitialContext() || ReactNativeUtils.getCatalystInstance(getReactNativeHost()) == null) {
            manager.addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
                @Override
                public void onReactContextInitialized(ReactContext context) {
                    loadScript((success, scriptPath) -> {
                        bundleLoaded = success;
                        if (success) {
                            runApp(scriptPath);
                        }
                    });
                    manager.removeReactInstanceEventListener(this);
                }
            });
            getReactNativeHost().getReactInstanceManager().createReactContextInBackground();
        } else {
            loadScript((success, scriptPath) -> {
                bundleLoaded = success;
                if (success)
                    runApp(scriptPath);
            });
        }
    }

    protected void runApp(String scriptPath) {

    }

    protected final ReactNativeHost getReactNativeHost() {
        return mDelegate.getReactNativeHost();
    }

    protected abstract RnBundle getBundle();

    /**
     * JSBundle的加载逻辑的实现
     *
     * @param loadListener
     */
    protected void loadScript(final LoadScriptListener loadListener) {
        // TODO JSBundle的加载逻辑
        final RnBundle bundle = getBundle();
        /** all buz module is loaded when in debug mode*/
        if (ReactNativeUtils.MULTI_DEBUG) {//当设置成debug模式时，所有需要的业务代码已经都加载好了
            loadListener.onLoadComplete(true, null);
            return;
        }

        ScriptType pathType = bundle.scriptType;
        String scriptPath = bundle.scriptUrl;

        final CatalystInstance instance = ReactNativeUtils.getCatalystInstance(getReactNativeHost());

        switch (pathType) {
            case ASSET:
                ReactNativeUtils.loadScriptFromAsset(getApplicationContext(), instance, scriptPath, false);
                loadListener.onLoadComplete(true, null);
                break;
            case FILE:
                // 获取/data/data/com.helloreactnative/files/bundle路径
                File scriptFile = new File(getApplicationContext().getFilesDir()
                        + File.separator +/*ScriptLoadUtil.REACT_DIR+File.separator+*/scriptPath);
                // 获取全路径
                try {
                    scriptPath = scriptFile.getCanonicalPath();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                ReactNativeUtils.loadScriptFromFile(scriptPath, instance, scriptPath, false);
                loadListener.onLoadComplete(true, scriptPath);
                break;
            case NETWORK:
                initView();
                AlertDialog.Builder dialogBuilder = new AlertDialog.Builder(this);
                dialogBuilder.setTitle("Bundle加载中");
                dialogBuilder.setCancelable(false);
                final TextView tvv = new TextView(this);
                //由于demo中把文件放在了github上，所以http建立连接要花好几秒时间
                tvv.setText("conneting");
                tvv.setTextColor(Color.BLACK);
                tvv.setGravity(Gravity.CENTER);
                tvv.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
                dialogBuilder.setView(tvv);
//                mProgressDialog = dialogBuilder.create();
//                mProgressDialog.show();
                break;
        }
    }

    protected void initView() {
        mDelegate.onCreate(null);
    }

    @Override
    protected void onPause() {
        super.onPause();
        mDelegate.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        mDelegate.onResume();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        mDelegate.onDestroy();
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        mDelegate.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        return mDelegate.onKeyDown(keyCode, event) || super.onKeyDown(keyCode, event);
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        return mDelegate.onKeyUp(keyCode, event) || super.onKeyUp(keyCode, event);
    }

    @Override
    public boolean onKeyLongPress(int keyCode, KeyEvent event) {
        return mDelegate.onKeyLongPress(keyCode, event) || super.onKeyLongPress(keyCode, event);
    }

    @Override
    public void onBackPressed() {
        if (!mDelegate.onBackPressed()) {
            super.onBackPressed();
        }
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    @Override
    public void onNewIntent(Intent intent) {
        if (!mDelegate.onNewIntent(intent)) {
            super.onNewIntent(intent);
        }
    }

    @Override
    public void requestPermissions(
            String[] permissions,
            int requestCode,
            PermissionListener listener) {
        mDelegate.requestPermissions(permissions, requestCode, listener);
    }

    @Override
    public void onRequestPermissionsResult(
            int requestCode,
            String[] permissions,
            int[] grantResults) {
        mDelegate.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
}
