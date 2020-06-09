package com.helloreactnative.multibundle;

import android.content.Context;

import com.facebook.react.bridge.CatalystInstance;
import com.facebook.react.bridge.CatalystInstanceImpl;


public class BridgeUtil {
    /**
     * 拼接assets目录下的Bundle文件路径。
     * 传给催化剂实例进行加载Bundle
     *
     * @param context
     * @param instance
     * @param assetName
     * @param loadSynchronously
     */
    public static void loadScriptFromAsset(Context context,
                                           CatalystInstance instance,
                                           String assetName, boolean loadSynchronously) {
        String source = assetName;
        if (!assetName.startsWith("assets://")) {
            source = "assets://" + assetName;
        }
        ((CatalystInstanceImpl) instance).loadScriptFromAssets(context.getAssets(), source, loadSynchronously);
    }


    public static void loadScriptFromFile(String fileName,
                                          CatalystInstance instance,
                                          String sourceUrl, boolean loadSynchronously) {
        ((CatalystInstanceImpl) instance).loadScriptFromFile(fileName, sourceUrl, loadSynchronously);
    }
}
