import React from 'react';
import {Text, View, ViewProps} from 'react-native';
import {BaseComponent} from '../../aura/base/BaseComponent';
import Logger from '../../aura/utils/Logger';
import DataBaseUtils from '../../utils/DataBaseUtils';

const TAG = 'MyProfilePage';
export default class MyDataBasePage extends BaseComponent<ViewProps, any> {
    constructor(props: ViewProps) {
        super(props);
    }

    public componentDidMount() {
        super.componentDidMount();

        this.testTransformTime();
    }

    public render(): React.ReactNode {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>我的!</Text>
            </View>
        );
    }

    /**
     * 测试1000条数据在RN传递到Native之间的传递耗时
     */
    private testTransformTime(): void {
        let path = '/sdcard/shop.txt';
        // FileUtils.readFileByPath('file://' + path).then((result: string) => {
        //     Logger.info(TAG, 'result ==' + result.length);
        //     Logger.debug(TAG, 'transformString Begin');
        //     DataBaseUtils.transformString(result).then((response: any) => {
        //         Logger.debug(TAG, 'transformString success', response);
        //     });
        //
        //     let resultArray: string[] = result.split(';');
        //
        //     setTimeout(() => {
        //         Logger.debug(TAG, 'transformArray Begin');
        //         DataBaseUtils.transformArray(resultArray).then((response: any) => {
        //             Logger.debug(TAG, 'transformArray success', response);
        //         });
        //     }, 3000);
        //
        // });

        /**
         * 100条数据：      字符串：4   数组：2
         * 1000条数据：     字符串：6   数组：8
         * 10000条数据：    字符串：45   数组：110
         * 100000条数据：   字符串：270   数组：900
         * 500000条数据：   字符串：内存溢出   数组： 内存溢出
         * 1000000条数据：  字符串：内存溢出   数组： 内存溢出
         * 差距并不大
         */
        let content = '你好你好你好你好你好你好你好你好你好';
        for (let i = 0; i <= 500000; i++) {
            let addStr = '你好你好你好你好你好你好你好你好你好' + i + ';';
            content += addStr;
        }
        Logger.info(TAG, 'result ==' + content);
        Logger.debug(TAG, 'transformString Begin');
        DataBaseUtils.transformString(content).then((response: any) => {
            Logger.debug(TAG, 'transformString success', response);
        });

        let resultArray: string[] = content.split(';');

        setTimeout(() => {
            Logger.debug(TAG, 'transformArray Begin');
            DataBaseUtils.transformArray(resultArray).then((response: any) => {
                Logger.debug(TAG, 'transformArray success', response);
            });
        }, 3000);
    }
}
