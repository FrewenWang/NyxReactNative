import React, {ReactChild} from 'react';
import {Button, Text, View, ViewProps} from 'react-native';
import {BaseComponent} from '../../../aura/base/BaseComponent';

export default class DemoPage3 extends BaseComponent<ViewProps, any> {
    constructor(props: ViewProps) {
        super(props);
    }

    public render(): ReactChild {
        const {navigation}: any = this.props;
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>欢迎来到页面3</Text>
                <Button onPress={() => navigation.goBack()} title="返回上一个页面" />
                <Button onPress={() => navigation.navigate('Page4')} title="前往页面4" />
            </View>
        );
    }
}
