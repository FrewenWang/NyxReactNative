package com.helloreactnative.packages;

import android.content.ContentValues;

import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteStatement;
import android.util.Log;

/**
 * @filename: DataBaseProxy
 * @introduction:
 * @author: Frewen.Wong
 * @time: 2020/6/18 23:52
 * @copyright Copyright ©2020 Frewen.Wong. All Rights Reserved.
 */
public class DataBaseProxy {

    private SQLiteDatabase mDatabase;

    public DataBaseProxy(String path, byte[] psw) {
        Log.i("DataBase", "create database:" + path);
        mDatabase = SQLiteDatabase.openOrCreateDatabase(path, null);
    }

    public long insert(String table, String nullColumnHack, ContentValues values) {
        return mDatabase.insert(table, nullColumnHack, values);
    }

    public long insertOrThrow(String table, String nullColumnHack, ContentValues values) throws SQLException {
        return mDatabase.insertOrThrow(table, nullColumnHack, values);
    }

    public long replace(String table, String nullColumnHack, ContentValues initialValues) {
        return mDatabase.replace(table, nullColumnHack, initialValues);
    }

    public long replaceOrThrow(String table, String nullColumnHack,
                               ContentValues initialValues) throws SQLException {
        return mDatabase.replaceOrThrow(table, nullColumnHack, initialValues);
    }

    public int delete(String table, String whereClause, String[] whereArgs) {
        return mDatabase.delete(table, whereClause, whereArgs);
    }

    public int update(String table, ContentValues values, String whereClause, String[] whereArgs) {
        return mDatabase.update(table, values, whereClause, whereArgs);
    }

    public Cursor query(boolean distinct, String table, String[] columns, String selection,
                        String[] selectionArgs, String groupBy, String having, String orderBy, String limit) {
        return mDatabase.query(distinct, table, columns, selection, selectionArgs, groupBy, having, orderBy, limit);
    }

    public Cursor rawQuery(String sql, String[] selectionArgs) {
        return mDatabase.rawQuery(sql, selectionArgs);
    }

    public void beginTransaction() {
        mDatabase.beginTransaction();
    }

    public void endTransaction() {
        mDatabase.endTransaction();
    }

    public void execSQL(String sql) {
        mDatabase.execSQL(sql);
    }

    public void execSQL(String sql, String[] bindArgs) throws SQLException {
        mDatabase.execSQL(sql, bindArgs);
    }

    public boolean isReadOnly() {
        return mDatabase.isReadOnly();
    }

    public boolean isOpen() {
        return mDatabase.isOpen();
    }

    public boolean needUpgrade(int newVersion) {
        return mDatabase.needUpgrade(newVersion);
    }

    public void beginTransactionNonExclusive() {
        mDatabase.beginTransactionNonExclusive();
    }

    public void setTransactionSuccessful() {
        mDatabase.setTransactionSuccessful();
    }

    public boolean inTransaction() {
        return mDatabase.inTransaction();
    }

    public SQLiteStatement compileStatement(String sql) throws SQLException {
        return mDatabase.compileStatement(sql);
    }

//
//    public boolean isDbLockedByCurrentThread() {
//        return mDatabase.isDbLockedByCurrentThread();
//    }
//
//    public boolean yieldIfContendedSafely() {
//        return mDatabase.yieldIfContendedSafely();
//    }
//
//    public boolean yieldIfContendedSafely(long sleepAfterYieldDelay) {
//        return mDatabase.yieldIfContendedSafely(sleepAfterYieldDelay);
//    }

    public int getVersion() {
        return mDatabase.getVersion();
    }

    public boolean hasTable(String tableName) {
        Cursor cursor = mDatabase.rawQuery("SELECT count(*) FROM sqlite_master WHERE type=\"table\" AND name = ? ", new String[]{tableName});
        boolean exist = cursor != null && cursor.getCount() > 0;
        cursor.close();
        return exist;
    }

    public void acquireReference() {
        mDatabase.acquireReference();
    }

    public void releaseReference() {
        mDatabase.releaseReference();
    }


}
