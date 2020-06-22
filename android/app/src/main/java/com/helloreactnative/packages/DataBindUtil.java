package com.helloreactnative.packages;

import android.content.ContentValues;
import android.database.Cursor;
import android.database.sqlite.SQLiteStatement;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;
import java.util.Map;

import static android.database.Cursor.FIELD_TYPE_BLOB;
import static android.database.Cursor.FIELD_TYPE_FLOAT;
import static android.database.Cursor.FIELD_TYPE_INTEGER;
import static android.database.Cursor.FIELD_TYPE_NULL;
import static android.database.Cursor.FIELD_TYPE_STRING;

/**
 * @filename: DataBindUtil
 * @introduction:
 * @author: Frewen.Wong
 * @time: 2020/6/18 23:55
 * @copyright Copyright ©2020 Frewen.Wong. All Rights Reserved.
 */
public class DataBindUtil {

    /**
     * 将 cursor 读取完毕，并转换成 JSONArray 对象
     *
     * @param columns
     * @param cursor
     */
    @NotNull
    public static JSONArray convertCursorArray(Map<String, String> columns, Cursor cursor) {
        JSONArray all = new JSONArray();

        JSONObject object;
        while (cursor.moveToNext()) {
            object = convertCursorToObject(columns, cursor);
            all.put(object);
        }
        return all;
    }

    /**
     * 将 cursor 读取完毕，并转换成 JSONArray 对象
     *
     * @param columns
     * @param cursor
     */
    @NotNull
    public static JSONArray convertCursorToJsonArray(Map<String, String> columns, Cursor cursor) {
        JSONArray all = new JSONArray();

        JSONObject object;
        while (cursor.moveToNext()) {
            object = convertCursorToObject(columns, cursor);
            all.put(object);
        }
        return all;
    }

    /**
     * 将 cursor 读取完毕，并转换成 JSONArray 对象
     *
     * @param cursor
     */
    @NotNull
    public static JSONArray convertCursorToJsonArray(Cursor cursor) {
        JSONArray all = new JSONArray();

        JSONObject object;
        while (cursor.moveToNext()) {
            object = convertCursorToObject(cursor);
            all.put(object);
        }
        return all;
    }


    /**
     * 读取一行数据，并将数据转换成 JSONObject
     *
     * @param columns
     * @param cursor
     */
    @NotNull
    public static JSONObject convertCursorToObject(Map<String, String> columns, Cursor cursor) {

        JSONObject object = new JSONObject();
        int columnIndex;
        String key;
        String type;

        for (Map.Entry<String, String> entry : columns.entrySet()) {
            key = entry.getKey();
            type = entry.getValue();
            columnIndex = cursor.getColumnIndex(key);
            if (columnIndex != -1) {
                try {
                    switch (type) {
                        case DBConsts.TYPE_BLOB:
                            object.put(key, cursor.getBlob(columnIndex));
                            break;
                        case DBConsts.TYPE_INTEGER:
                            object.put(key, cursor.getInt(columnIndex));
                            break;
                        case DBConsts.TYPE_BOOLEAN:
                            object.put(key, cursor.getLong(columnIndex) == 1 ? true : false);
                            break;
                        case DBConsts.TYPE_NUMERIC:
                            object.put(key, cursor.getDouble(columnIndex));
                            break;
                        case DBConsts.TYPE_STRING:
                            object.put(key, cursor.getString(columnIndex));
                            break;
                        case DBConsts.TYPE_ARRAY:
                            String array = cursor.getString(columnIndex);
                            object.put(key, new JSONArray(array));
                            break;
                        case DBConsts.TYPE_MAP:
                            String map = cursor.getString(columnIndex);
                            object.put(key, new JSONObject(map));
                            break;
                    }

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

        }
        return object;
    }

    /**
     * 读取一行数据，并将数据转换成 JSONObject
     *
     * @param cursor
     */
    @NotNull
    public static JSONObject convertCursorToObject(Cursor cursor) {

        JSONObject object = new JSONObject();
        String key;
        int type;

        int count = cursor.getColumnCount();
        for (int index = 0; index < count; index++) {
            type = cursor.getType(index);
            key = cursor.getColumnName(index);

            if (index != -1) {
                try {
                    switch (type) {
                        case FIELD_TYPE_NULL:
                            object.put(key, null);
                            break;
                        case FIELD_TYPE_INTEGER:
                            object.put(key, cursor.getInt(index));
                            break;
                        case FIELD_TYPE_FLOAT:
                            object.put(key, cursor.getFloat(index));
                            break;
                        case FIELD_TYPE_STRING:
                            object.put(key, cursor.getString(index));
                            break;
                        case FIELD_TYPE_BLOB:
                            object.put(key, cursor.getBlob(index));
                            break;
                    }

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

        }
        return object;
    }

    /**
     * 将 cursor 读取完毕，并转换成 ReadableArray 对象
     * 缺点:速度慢
     * <p>
     * 建议使用 convertCursorToJsonArray
     *
     * @param columns
     * @param cursor
     */
    @NotNull
    public static WritableArray convertCursorToWritableArray(Map<String, String> columns, Cursor cursor) {
        WritableArray all = Arguments.createArray();

        WritableMap object;
        while (cursor.moveToNext()) {
            object = convertCursorToWritableMap(columns, cursor);
            all.pushMap(object);
        }
        return all;
    }

    /**
     * 读取一行数据，并将数据转换成 WritableMap
     *
     * @param columns
     * @param cursor
     */
    @NotNull
    public static WritableMap convertCursorToWritableMap(Map<String, String> columns, Cursor cursor) {

        WritableMap object = Arguments.createMap();
        int columnIndex;
        String key;
        String type;

        for (Map.Entry<String, String> entry : columns.entrySet()) {
            key = entry.getKey();
            type = entry.getValue();
            columnIndex = cursor.getColumnIndex(key);
            if (columnIndex != -1) {
                switch (type) {
                    case DBConsts.TYPE_BLOB:
                        //TODO opt
                        object.putString(key, cursor.getString(columnIndex));
                        break;
                    case DBConsts.TYPE_INTEGER:
                        object.putInt(key, cursor.getInt(columnIndex));
                        break;
                    case DBConsts.TYPE_BOOLEAN:
                        object.putBoolean(key, cursor.getLong(columnIndex) == 1 ? true : false);
                        break;
                    case DBConsts.TYPE_NUMERIC:
                        object.putDouble(key, cursor.getDouble(columnIndex));
                        break;
                    case DBConsts.TYPE_STRING:
                        object.putString(key, cursor.getString(columnIndex));
                        break;
                    case DBConsts.TYPE_ARRAY:
                        String string = cursor.getString(columnIndex);
                        try {
                            object.putArray(key, ReactNativeJson.convertJsonToArray(new JSONArray(string)));
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        break;
                    case DBConsts.TYPE_MAP:
                        String map = cursor.getString(columnIndex);
                        try {
                            object.putMap(key, ReactNativeJson.convertJsonToMap(new JSONObject(map)));
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        break;
                }
            }

        }
        return object;
    }


    /**
     * 绑定插入的数据
     *
     * @param statement
     * @param object
     * @param columns
     *
     * @throws JSONException
     */
    public static void bindData(SQLiteStatement statement, JSONObject object, Map<String, String> columns) {

        int realIdex = 0;
        String key;
        String type;

        for (Map.Entry<String, String> entry : columns.entrySet()) {
            key = entry.getKey();
            type = entry.getValue();
            realIdex++;
            try {
                switch (type) {
                    case DBConsts.TYPE_STRING:
                    case DBConsts.TYPE_ARRAY:
                    case DBConsts.TYPE_MAP:
                        statement.bindString(realIdex, object.getString(key));
                        break;
                    case DBConsts.TYPE_INTEGER:
                        statement.bindLong(realIdex, object.getInt(key));
                        break;
                    case DBConsts.TYPE_NUMERIC:
                        statement.bindDouble(realIdex, object.getDouble(key));
                        break;
                    case DBConsts.TYPE_BOOLEAN:
                        statement.bindLong(realIdex, object.getBoolean(key) ? 1 : 0);
                        break;
                    case DBConsts.TYPE_BLOB:
                        //TODO
                        statement.bindBlob(realIdex, (byte[]) object.opt(key));
                        break;
                }
            } catch (Exception e) {
                Log.w("Database", e.getMessage());
            }
        }
    }

    /**
     * 绑定插入的数据
     *
     * @param statement
     * @param object
     * @param columns
     *
     * @throws JSONException
     */
    public static void bindData(SQLiteStatement statement, ReadableMap object, Map<String, String> columns) {
        ReadableMapKeySetIterator iterator = object.keySetIterator();

        int realIdex = 0;
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            String type = columns.get(key);
            realIdex++;
            if (type == null) {
                continue;
            }
            try {
                switch (type) {
                    case DBConsts.TYPE_STRING:
                        statement.bindString(realIdex, object.getString(key));
                        break;
                    case DBConsts.TYPE_INTEGER:
                        statement.bindLong(realIdex, object.getInt(key));
                        break;
                    case DBConsts.TYPE_NUMERIC:
                        statement.bindDouble(realIdex, object.getDouble(key));
                        break;
                    case DBConsts.TYPE_BOOLEAN:
                        statement.bindLong(realIdex, object.getBoolean(key) ? 1 : 0);
                        break;
                    case DBConsts.TYPE_BLOB:
                        //TODO
                        statement.bindString(realIdex, object.getString(key));
                        break;
                    case DBConsts.TYPE_ARRAY:
                        ReadableArray array = object.getArray(key);
                        statement.bindString(realIdex, ReactNativeJson.convertArrayToJson(array).toString());
                        break;
                    case DBConsts.TYPE_MAP:
                        ReadableMap map = object.getMap(key);
                        statement.bindString(realIdex, ReactNativeJson.convertMapToJson(map).toString());
                        break;
                }
            } catch (Exception e) {
                Log.w("Database", e.getMessage());
            }
        }
    }

    public static ContentValues convertJsonToContent(JSONObject object, Map<String, String> columns) {
        ContentValues values = new ContentValues();
        Iterator<String> keys = object.keys();
        while (keys.hasNext()) {
            String key = keys.next();
            String type = columns.get(key);
            if (type == null) {
                continue;
            }

            switch (type) {
                case DBConsts.TYPE_STRING:
                case DBConsts.TYPE_ARRAY:
                case DBConsts.TYPE_MAP:
                    values.put(key, object.optString(key));
                    break;
                case DBConsts.TYPE_INTEGER:
                    values.put(key, object.optInt(key));
                    break;
                case DBConsts.TYPE_NUMERIC:
                    values.put(key, object.optDouble(key));
                    break;
                case DBConsts.TYPE_BOOLEAN:
                    values.put(key, object.optBoolean(key));
                    break;
                case DBConsts.TYPE_BLOB:
                    //TODO
                    values.put(key, object.optString(key));
                    break;
            }

        }
        return values;
    }

    public static String[] convertJsArrayToJava(ReadableArray args) {
        if (args == null) {
            return null;
        }

        String[] arrayArgs = null;
        if (args != null) {
            int len = args.size();
            arrayArgs = new String[len];

            for (int i = 0; i < len; i++) {
                arrayArgs[i] = args.getString(i);
            }
        }

        return arrayArgs;

    }
}
