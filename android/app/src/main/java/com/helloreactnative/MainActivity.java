package com.helloreactnative;

import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    private static final String TAG = "MainActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "FMsg:onCreate() called with: savedInstanceState = [" + savedInstanceState + "]");
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.d(TAG, "FMsg:onResume() called");
    }

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "HelloReactNative";
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.d(TAG, "FMsg:onPause() called");
    }

    @Override
    protected void onStop() {
        super.onStop();
        Log.d(TAG, "FMsg:onStop() called");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "FMsg:onDestroy() called");
    }
}
