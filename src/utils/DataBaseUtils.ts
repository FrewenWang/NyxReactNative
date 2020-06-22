import {NativeModules} from 'react-native';
// 下一句中的ToastExample即对应上文
// public String getName()中返回的字符串
const auraRNDataBase = NativeModules.AuraRNDataBase;

export default class DataBaseUtils {
    public static execSQList(tableName: string, sqlArray: string[]): Promise<any> {
        return auraRNDataBase.execSQList(tableName, sqlArray);
    }

    public static transformString(sqlString: string): Promise<any> {
        return auraRNDataBase.transformString(sqlString);
    }

    public static transformArray(sqlArray: string[]): Promise<any> {
        return auraRNDataBase.transformArray(sqlArray);
    }
}
