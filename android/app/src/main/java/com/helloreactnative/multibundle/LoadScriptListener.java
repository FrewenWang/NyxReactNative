package com.helloreactnative.multibundle;

/**
 * JSBundle的加载的监听器
 */
public interface LoadScriptListener {
    public void onLoadComplete(boolean success, String scriptPath);
}
