package com.helloreactnative.multibundle;

import android.content.Context;
import android.util.Log;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.CatalystInstance;
import com.facebook.react.bridge.ReactContext;

import java.util.HashSet;
import java.util.Set;

import androidx.annotation.Nullable;

/**
 * @filename: ReactNativeUtils
 * @introduction:
 * @author: Frewen.Wong
 * @time: 2020/6/7 16:59
 *         Copyright ©2020 Frewen.Wong. All Rights Reserved.
 */
public class ReactNativeUtils {
    private static final String TAG = "ReactNativeUtils";
    private static Set<String> sLoadedScript = new HashSet<>();

    /**
     * set this value when debug,you can set BuildConfig.DEBUG if need
     * 需要debug的时候设置成true,你也可以设置成跟BuildConfig.DEBUG一致
     */
    public static final boolean MULTI_DEBUG = false;

    /**
     * 获取催化剂实例，
     * 催化剂实例创建与否代表着我们的ReactContext是否已经实例化完成
     *
     * @param host
     */
    @Nullable
    public static CatalystInstance getCatalystInstance(ReactNativeHost host) {
        ReactInstanceManager manager = host.getReactInstanceManager();
        if (manager == null) {
            Log.e(TAG, "manager is null!!");
            return null;
        }

        ReactContext context = manager.getCurrentReactContext();
        if (context == null) {
            Log.e(TAG, "context is null!!");
            return null;
        }
        return context.getCatalystInstance();
    }

    /**
     * 从Asset目录下在加载Bundle文件
     *
     * @param context   上下文环境
     * @param instance
     * @param assetName
     * @param isSync
     */
    public static void loadScriptFromAsset(Context context,
                                           CatalystInstance instance,
                                           String assetName, boolean isSync) {
        if (sLoadedScript.contains(assetName)) {
            return;
        }
        BridgeUtil.loadScriptFromAsset(context, instance, assetName, isSync);
        sLoadedScript.add(assetName);
    }

    /**
     * 从文件中进行加载Bundle文件
     *
     * @param fileName
     * @param instance
     * @param sourceUrl
     * @param isSync
     */
    public static void loadScriptFromFile(String fileName,
                                          CatalystInstance instance,
                                          String sourceUrl, boolean isSync) {
        if (sLoadedScript.contains(sourceUrl)) {
            return;
        }
        BridgeUtil.loadScriptFromFile(fileName, instance, sourceUrl, isSync);
        sLoadedScript.add(sourceUrl);
    }
}
