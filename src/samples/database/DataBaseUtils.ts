import {NativeModules} from 'react-native';
import JsonUtils from '../../aura/utils/JsonUtils';

const dataBase = NativeModules.DataBase;

const TAG = 'DataBaseUtils';
export default class DataBaseUtils {
    public static rawSqlExec(sqlArray: string[]): void {
        return dataBase.rawQuery(sqlArray).then(
            (result: string) => {
                return JsonUtils.strToJson(result);
            },
            (error: any) => {
                console.log(TAG, 'rawQuery error', error);
            },
        );
    }
}
