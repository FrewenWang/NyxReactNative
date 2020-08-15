package com.helloreactnative.multibundle.ui;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.modules.core.PermissionAwareActivity;
import com.facebook.react.modules.core.PermissionListener;
import com.helloreactnative.R;

public class MultiBundlesActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_multi_bundles);


        ReactInstanceManager reactInstanceManager = ((ReactApplication) getApplication()).getReactNativeHost().getReactInstanceManager();

        /**
         * 事先加载基础包可以减少后面页面加载的时间，但相应的会增加内存使用
         * 当然也可以不用事先加载基础包，AsyncReactActivity中已经包含了这个逻辑，如果判断出没加载基础包会先加载基础包再加载业务包
         */
        if (!reactInstanceManager.hasStartedCreatingInitialContext()) {
            //这里会先加载基础包platform.android.bundle，也可以不加载
            /// 我们来看他为什么会加载platform.android.bundle
            reactInstanceManager.createReactContextInBackground();
        }
    }
}