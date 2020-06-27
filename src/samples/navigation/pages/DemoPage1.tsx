import React, {ReactChild} from 'react';
import {Button, Text, View, ViewProps} from 'react-native';
import {BaseComponent} from '../../../aura/base/BaseComponent';

export default class DemoPage1 extends BaseComponent<ViewProps, any> {
    //TODO 在5.X已经失效
    // 定义页面的导航配置
    static navigationOptions = {
        title: '页面1',
    };

    constructor(props: ViewProps) {
        super(props);
    }

    public render(): ReactChild {
        const {navigation}: any = this.props;
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>欢迎来到页面1</Text>
                <Button onPress={() => navigation.navigate('Page2')} title="前往页面2" />
            </View>
        );
    }
}
