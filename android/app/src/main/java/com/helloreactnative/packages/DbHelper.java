package com.helloreactnative.packages;

import android.content.ContentValues;
import android.database.Cursor;
import android.database.sqlite.SQLiteStatement;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import com.frewen.aura.toolkits.core.FreeToolKits;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * 文件名称: BaseDbApi.java
 * 功能描述:
 *
 * @author: panxianrong
 * 创建时间: 2020-01-09
 * 责任人: panxianrong
 * 备份责任人:
 * 修改人:
 * 修改内容:
 * 修改时间:
 * Copyright (C) 2020 cmcm
 */
public class DbHelper {

    private DataBaseProxy mDb;

    private static final String TAG = "DataBase";
    private static final String DB_NAME = "rn.db";

    private Map<String, Map<String, String>> mTableKeyMap = new HashMap<>();

    public DbHelper() {
        String path = FreeToolKits.getAppContext().getFilesDir().getAbsolutePath() + File.separator + DB_NAME;
        mDb = new DataBaseProxy(path, "vase".getBytes());
    }

    public void execSQL(String sql, Promise promise) {
        try {
            mDb.execSQL(sql);
            promise.resolve("");
        } catch (Exception e) {
            promise.reject(e);
        }
    }


    public void execSQLS(ReadableArray sqlArray, Promise promise) {
        Log.d(TAG, "execSQLS Begin == " + sqlArray.size());
        mDb.beginTransaction();
        try {
            if (sqlArray != null) {
                for (int i = 0; i < sqlArray.size(); i++) {
                    String sql = sqlArray.getString(i);
                    Log.d(TAG, "execSQLS sql == " + sql);
                    mDb.execSQL(sql);
                }
            }
            // 设置事务标志为成功，当结束事务时就会提交事务
            mDb.setTransactionSuccessful();
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject(e);
        } finally {
            // 结束事务
            mDb.endTransaction();
        }
    }

    /**
     * 用事务执行某条sql语句
     *
     * @param sql
     * @param promise
     */
    public void execSQLWithTransaction(String sql, Promise promise) {
        SQLiteStatement statement = null;
        try {
            mDb.beginTransaction();
            statement = mDb.compileStatement(sql);
            statement.execute();
            mDb.setTransactionSuccessful();
            promise.resolve("");
        } catch (Exception e) {
            promise.reject(e);
        } finally {
            mDb.endTransaction();
            if (statement != null) {
                statement.close();
            }
        }
    }

    /**
     * @param tableName
     * @param data
     */
    public void createTable(String tableName, ReadableArray data) {
        Log.i(TAG, "createTable");
        try {
            StringBuilder builder = new StringBuilder("CREATE TABLE IF NOT EXISTS ").append(tableName).append("(");

            if (data != null) {
                int size = data.size();
                LinkedHashMap<String, String> keyMap = new LinkedHashMap<>(size);
                mTableKeyMap.put(tableName, keyMap);
                for (int idx = 0; idx < size; idx++) {

                    ReadableMap column = data.getMap(idx);
                    String key = column.getString("key");

                    String type = column.getString("type");
                    String extend = column.getString("extend");

                    keyMap.put(key, type);

                    builder.append(key).append(" ").append(type);
                    builder.append(" ").append(extend);
                    if (idx < size - 1) {
                        builder.append(",");
                    }
                }
            }
            builder.append(");");

            String sql = builder.toString();

            Log.i(TAG, "create table: " + sql);

            mDb.execSQL(sql);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void hasTable(String tableName, Promise promise) {
        try {
            boolean result = mDb.hasTable(tableName);
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject(e);
        }

    }

    /**
     * 删除表
     *
     * @param tableName
     */
    public void dropTable(String tableName) {
        try {
            mTableKeyMap.remove(tableName);
            mDb.execSQL("DROP TABLE IF EXISTS " + tableName);
            Log.i(TAG, "dropTable: " + tableName);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 批量插入
     *
     * @param table
     * @param data
     * @param promise
     */
    public void insertOrReplaceBatch(String table, String data, Promise promise) {

        if (TextUtils.isEmpty(data)) {
            promise.reject("insertOrReplaceBatch fail for data is null!");
            return;
        }

        Map<String, String> columns = mTableKeyMap.get(table);
        if (columns == null) {
            String error = "table:" + table + ", has no columns! please check！";
            promise.reject(error);
            return;
        }

        int size = 0;
        try {
            JSONArray jsonArray = new JSONArray(data);

            size = jsonArray.length();

            long time = System.currentTimeMillis();

            SQLiteStatement insertSql = compileInsertStatement(table, columns);

            mDb.beginTransaction();
            try {

                for (int idx = 0; idx < size; idx++) {

                    JSONObject object = jsonArray.getJSONObject(idx);

                    DataBindUtil.bindData(insertSql, object, columns);

                    insertSql.execute();
                    insertSql.clearBindings();
                }

                mDb.setTransactionSuccessful();
            } catch (Exception e) {
                Log.e(TAG, e.getMessage());
            } finally {
                mDb.endTransaction();
                Log.e(TAG, "insertOrReplaceBatch num:" + size + "; cost:" + (System.currentTimeMillis() - time));
                promise.resolve(size);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private SQLiteStatement compileInsertStatement(String table, Map<String, String> columns) {
        String sql = SqlUtils.createSqlInsert("INSERT OR REPLACE INTO ", table, columns);
        return mDb.compileStatement(sql);
    }


    /**
     * 批量查询总接口
     *
     * @param table
     * @param sql
     * @param promise
     */
    public void query(String table, String sql, Promise promise) {

        Map<String, String> columns = mTableKeyMap.get(table);
        if (columns == null) {
            String error = "table:" + table + ", has no columns! please check！";
            Log.e(TAG, error);
            promise.reject(error);
            return;
        }
        Cursor cursor = null;
        long time = System.currentTimeMillis();
        try {

            cursor = mDb.rawQuery(sql, null);

            if (cursor != null) {

                JSONArray all = DataBindUtil.convertCursorToJsonArray(columns, cursor);
                Log.i(TAG, "query batch data cost:" + (System.currentTimeMillis() - time));
                promise.resolve(all.toString());

            } else {
                promise.reject("");
            }
        } catch (Exception e) {
            promise.reject(e);
        } finally {
            if (cursor != null) {
                cursor.close();
            }
        }
    }

    public void query(boolean distinct, String table, ReadableArray columns, String selection,
                      ReadableArray selectionArgs, String groupBy, String having,
                      String orderBy, String limit, Promise promise) {
        Cursor cursor = null;

        long time = System.currentTimeMillis();

        Map<String, String> columnMap = mTableKeyMap.get(table);

        if (columns == null) {
            String error = "table:" + table + ", has no columns! please check！";
            Log.e(TAG, error);
            promise.reject(error);
            return;
        }

        if (columns != null) {

            int size = columns.size();
            Map<String, String> realKeys = new HashMap<>(size);

            for (int i = 0; i < size; i++) {
                String key = columns.getString(i);
                realKeys.put(key, columnMap.get(key));
            }
            columnMap = realKeys;
        }

        try {
            cursor = mDb.query(distinct,
                    table,
                    DataBindUtil.convertJsArrayToJava(columns),
                    selection,
                    DataBindUtil.convertJsArrayToJava(selectionArgs),
                    groupBy, having, orderBy, limit);

            if (cursor != null) {
                JSONArray all = DataBindUtil.convertCursorToJsonArray(columnMap, cursor);
                Log.i(TAG, "query " + table + " cost:" + (System.currentTimeMillis() - time));
                promise.resolve(all.toString());
            } else {
                promise.reject("");
            }

        } catch (Exception e) {
            promise.reject(e);
        } finally {
            if (cursor != null) {
                cursor.close();
            }
        }
    }


    /**
     * 插入一条数据
     *
     * @param table
     * @param data
     * @param promise
     */
    public void insertOrReplace(String table, String data, Promise promise) {
        if (TextUtils.isEmpty(data)) {
            promise.reject("data is null");
            return;
        }

        Map<String, String> columns = mTableKeyMap.get(table);
        if (columns == null) {
            String error = "table:" + table + ", has no columns! please check！";
            Log.e(TAG, error);
            promise.reject(error);
            return;
        }

        long time = System.currentTimeMillis();

        SQLiteStatement sqLiteStatement = compileInsertStatement(table, columns);

        mDb.beginTransaction();

        try {
            JSONObject object = new JSONObject(data);

            DataBindUtil.bindData(sqLiteStatement, object, columns);

            sqLiteStatement.execute();

            Log.i(TAG, "insertOrReplace execute cost:" + (System.currentTimeMillis() - time));

            promise.resolve("");

            mDb.setTransactionSuccessful();
        } catch (JSONException e) {
            e.printStackTrace();
            promise.reject(e);
        } finally {
            mDb.endTransaction();
            sqLiteStatement.close();
        }
    }

    /**
     * 插入一条数据
     *
     * @param table
     * @param data
     * @param promise
     */
    public void insertOrReplace(String table, ReadableMap data, Promise promise) {
        Map<String, String> columns = mTableKeyMap.get(table);
        if (columns == null) {
            String error = "table:" + table + ", has no columns! please check！";
            Log.e(TAG, error);
            promise.reject(error);
            return;
        }

        long time = System.currentTimeMillis();

        SQLiteStatement sqLiteStatement = compileInsertStatement(table, columns);

        mDb.beginTransaction();

        try {

            DataBindUtil.bindData(sqLiteStatement, data, columns);

            sqLiteStatement.execute();

            Log.i(TAG, "insertOrReplace ReadableMap data  execute cost:" + (System.currentTimeMillis() - time));

            promise.resolve("");

            mDb.setTransactionSuccessful();
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject(e);
        } finally {
            mDb.endTransaction();
            sqLiteStatement.close();
        }
    }


    public void delete(String table, String sql, Promise promise) {
        execSQL(sql, promise);
    }

    /**
     * @param table
     * @param where
     * @param args
     * @param promise
     */
    public void delete(String table, String where, ReadableArray args, Promise promise) {
        Log.i(TAG, "delete " + table + " where:" + where + ", args:" + args);
        try {
            mDb.delete(table, where, DataBindUtil.convertJsArrayToJava(args));
            promise.resolve("");
        } catch (Exception e) {
            promise.reject(e);
        }

    }

    public void update(String table, String jsonValue, String whereClause, ReadableArray whereArgs, Promise promise) {

        if (TextUtils.isEmpty(jsonValue)) {
            promise.reject("update value is null!");
            return;
        }

        Map<String, String> columns = mTableKeyMap.get(table);
        if (columns == null) {
            String error = "table:" + table + ", has no columns! please check！";
            Log.e(TAG, error);
            promise.reject(error);
            return;
        }

        long time = System.currentTimeMillis();

        try {
            JSONObject object = new JSONObject(jsonValue);

            ContentValues values = DataBindUtil.convertJsonToContent(object, columns);

            int num = mDb.update(table, values, whereClause, DataBindUtil.convertJsArrayToJava(whereArgs));

            Log.i(TAG, "update " + table + " with: valueL " + jsonValue + " cost:" + (System.currentTimeMillis() - time));

            promise.resolve(String.valueOf(num));

        } catch (Exception e) {
            promise.reject(e);
        }
    }
}
