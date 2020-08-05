export function reportTable(tableName: string) {
    return function (target: any, propertyName: string, propertyDescriptor: PropertyDescriptor) {
        propertyDescriptor.value = function (...args: any[]) {
            let params: any;
            // 上报参数
            params = {
                tableName,
                ctime: Date.now(),
            };

            // TODO Reflect.get需要好好学习
            let keys = Reflect.get(new Object(), propertyName) || [];

            if (args) {
                for (let index = 0; index < args.length; index++) {
                    params[keys[index]] = args[index];
                }
            }

            _reportToTableInner(params);
        };

        return propertyDescriptor;
    };
}

/**
 * 数据上报到数据库的具体逻辑实现
 * @param params
 * @private
 */
function _reportToTableInner(params: any) {
    if (!params || !params.tableName) {
        console.log('_reportToTableInner', 'param or table is undefined !!!', params);
        return;
    }

    console.log('数据上报：', params.tableName, params);
}

export function reportKey(key: string) {
    return function (target: any, propertyName: string, index: number) {
        let key = Reflect.get(new Object(), propertyName) || [];
    };
}
