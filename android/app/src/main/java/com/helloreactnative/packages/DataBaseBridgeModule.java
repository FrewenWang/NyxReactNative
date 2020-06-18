package com.helloreactnative.packages;

import android.os.Handler;
import android.os.HandlerThread;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;

import java.util.HashMap;

import javax.annotation.Nonnull;

/**
 * @filename: DataBaseBridgeModule
 * @introduction:
 * @author: Frewen.Wong
 * @time: 2020/6/18 23:34
 * @copyright Copyright ©2020 Frewen.Wong. All Rights Reserved.
 */
public class DataBaseBridgeModule extends ReactContextBaseJavaModule {
    private static final String TAG = "DataBaseBridgeModule";
    private DbHelper mDbApi = new DbHelper();

    private DbThreadPool mPool;

    private HashMap<String, Handler> mHandlerMap = new HashMap<>();

    public DataBaseBridgeModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        mPool = new DbThreadPool();
    }

    @Override
    public void onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy();
        if (mPool != null) {
            mPool.shutdown();
        }
        releaseHandler();
    }

    private void releaseHandler() {
        for (String key : mHandlerMap.keySet()) {
            Handler handler = mHandlerMap.get(key);
            if (handler != null) {
                handler.removeCallbacksAndMessages(null);
                handler.getLooper().quitSafely();
            }
        }
        mHandlerMap.clear();
    }

    @Nonnull
    @Override
    public String getName() {
        return "DataBase";
    }

    /**
     * 第一次创建表时，不能使用这个方法创建
     *
     * @param sql
     * @param promise
     */
    @ReactMethod
    public void execSQL(String sql, Promise promise) {
        Log.d(TAG, "execSQL Begin");
        mPool.execute(new Runnable() {
            @Override
            public void run() {
                mDbApi.execSQL(sql, promise);
            }
        });
    }

    /**
     * 批量执行SQL的脚本
     *
     * @param sqlArray
     * @param promise
     */
    @ReactMethod
    public void execSQLS(ReadableArray sqlArray, Promise promise) {
        long currentTime = System.currentTimeMillis();
        Log.d(TAG, "execSQLS Begin == " + sqlArray.size());
        mPool.execute(new Runnable() {
            @Override
            public void run() {
                mDbApi.execSQLS(sqlArray, promise);
                Log.d(TAG, "execSQLS End  cost:" + (System.currentTimeMillis() - currentTime));
            }
        });
    }


    private Handler getTableHandler(String tableName) {
        Handler handler = mHandlerMap.get(tableName);
        if (handler == null) {
            handler = createTableHandler(tableName);
            mHandlerMap.put(tableName, handler);
        }
        return handler;
    }


    private Handler createTableHandler(String tableName) {
        HandlerThread thread = new HandlerThread(tableName);
        thread.start();
        return new Handler(thread.getLooper());
    }

    /**
     * 创建表
     *
     * @param tableName
     * @param data
     */
    @ReactMethod
    public void createTable(String tableName, ReadableArray data, Promise promise) {
        getTableHandler(tableName).post(new Runnable() {
            @Override
            public void run() {
                long currentTime = System.currentTimeMillis();
                mDbApi.createTable(tableName, data);
                Log.d(TAG, "createTable End  cost:" + (System.currentTimeMillis() - currentTime));
                promise.resolve("");
            }
        });

    }

    @ReactMethod
    public void hasTable(String tableName, Promise promise) {
        long currentTime = System.currentTimeMillis();
        getTableHandler(tableName).post(new Runnable() {
            @Override
            public void run() {
                mDbApi.hasTable(tableName, promise);
                Log.d(TAG, "hasTable End cost:" + (System.currentTimeMillis() - currentTime));
            }
        });
    }

    /**
     * 删除表
     *
     * @param tableName
     */
    @ReactMethod
    public void dropTable(String tableName, Promise promise) {
        long currentTime = System.currentTimeMillis();
        getTableHandler(tableName).post(new Runnable() {
            @Override
            public void run() {
                mDbApi.dropTable(tableName);
                Log.d(TAG, "dropTable End cost:" + (System.currentTimeMillis() - currentTime));
                promise.resolve("");
            }
        });
    }

    /**
     * 插入一条数据
     *
     * @param table
     * @param data
     * @param promise
     */
    @ReactMethod
    public void insertOrReplace(String table, String data, Promise promise) {
        long currentTime = System.currentTimeMillis();
        getTableHandler(table).post(new Runnable() {
            @Override
            public void run() {
                mDbApi.insertOrReplace(table, data, promise);
                Log.d(TAG, "insertOrReplace  End cost:" + (System.currentTimeMillis() - currentTime));
            }
        });
    }

    /**
     * 批量插入
     *
     * @param table
     * @param json    : 批量插入的json数组
     * @param promise
     */
    @ReactMethod
    public void insertOrReplaceBatch(String table, String json, Promise promise) {
        long currentTime = System.currentTimeMillis();
        getTableHandler(table).post(new Runnable() {
            @Override
            public void run() {
                mDbApi.insertOrReplaceBatch(table, json, promise);
                Log.d(TAG, "insertOrReplaceBatch End cost:" + (System.currentTimeMillis() - currentTime));
            }
        });
    }

    /**
     * 删除
     *
     * @param table
     * @param sql     : 编辑好的sql语句
     * @param promise
     */
    @ReactMethod
    public void rawDelete(String table, String sql, Promise promise) {
        long currentTime = System.currentTimeMillis();
        getTableHandler(table).post(new Runnable() {
            @Override
            public void run() {
                mDbApi.delete(table, sql.trim(), promise);
                Log.d(TAG, "rawDelete End cost:" + (System.currentTimeMillis() - currentTime));
            }
        });
    }

    /**
     * 删除
     *
     * @param table
     * @param args    where 语句的参数，String数组
     * @param promise
     */
    @ReactMethod
    public void delete(String table, String where, ReadableArray args, Promise promise) {
        long currentTime = System.currentTimeMillis();
        getTableHandler(table).post(new Runnable() {
            @Override
            public void run() {
                mDbApi.delete(table, where, args, promise);
                Log.d(TAG, "delete End cost:" + (System.currentTimeMillis() - currentTime));
            }
        });
    }

    /**
     * 更新接口
     *
     * @param table
     * @param jsonValue
     * @param whereClause
     * @param whereArgs
     * @param promise
     */
    @ReactMethod
    public void update(String table, String jsonValue, String whereClause, ReadableArray whereArgs, Promise promise) {
        long currentTime = System.currentTimeMillis();
        getTableHandler(table).post(new Runnable() {
            @Override
            public void run() {
                mDbApi.update(table, jsonValue, whereClause, whereArgs, promise);
                Log.d(TAG, "delete End cost:" + (System.currentTimeMillis() - currentTime));
            }
        });
    }


    /**
     * 批量查询总接口
     *
     * @param table
     * @param sql     : 编辑好的sql语句
     * @param promise
     */
    @ReactMethod
    public void rawQuery(String table, String sql, Promise promise) {
        long currentTime = System.currentTimeMillis();
        getTableHandler(table).post(new Runnable() {
            @Override
            public void run() {
                mDbApi.query(table, sql, promise);
                Log.d(TAG, "rawQuery End cost:" + (System.currentTimeMillis() - currentTime));
            }
        });
    }


    /**
     * 查询总接口
     *
     * @param table
     * @param columns
     * @param selection
     * @param selectionArgs
     * @param groupBy
     * @param having
     * @param orderBy
     * @param limit
     * @param promise
     */
    @ReactMethod
    public void query(boolean distinct, String table, ReadableArray columns, String selection,
                      ReadableArray selectionArgs, String groupBy, String having,
                      String orderBy, String limit, Promise promise) {
        long currentTime = System.currentTimeMillis();
        getTableHandler(table).post(new Runnable() {
            @Override
            public void run() {
                mDbApi.query(distinct, table, columns, selection, selectionArgs, groupBy, having, orderBy, limit, promise);
                Log.d(TAG, "query End cost:" + (System.currentTimeMillis() - currentTime));
            }
        });
    }
}
