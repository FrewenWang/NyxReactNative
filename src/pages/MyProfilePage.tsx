import React from 'react';
import {Text, View, ViewProps} from 'react-native';
import {BaseComponent} from '../aura/base/BaseComponent';
import FileUtils from '../aura/utils/FileUtils';
import Logger from '../aura/utils/Logger';

const TAG = 'MyProfilePage';
export default class MyProfilePage extends BaseComponent<ViewProps, any> {
    constructor(props: ViewProps) {
        super(props);

        let path = '/sdcard/shop.txt';
        FileUtils.readFileByPath('file://' + path).then((result: string) => {
            Logger.info(TAG, 'result ==' + result);
        });
    }

    public render(): React.ReactNode {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>我的!</Text>
            </View>
        );
    }
}
