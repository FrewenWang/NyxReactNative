import React, {ReactChild} from 'react';
import {Button, StyleSheet, Text, View, ViewProps} from 'react-native';
import {BaseComponent} from '../../../aura/base/BaseComponent';

export default class BottomTabPage3 extends BaseComponent<ViewProps, any> {
    //TODO 在5.X已经失效
    // 定义页面的导航配置
    static navigationOptions = {
        title: '页面1',
    };

    constructor(props: ViewProps) {
        super(props);
    }

    public render(): ReactChild {
        // 这个地方，我们是从this.props取出navigation对象
        const {navigation}: any = this.props;
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.text}>底部标签栏页面3</Text>
                <Button onPress={() => navigation.navigate('Page2')} title="前往页面2" />
                <Button onPress={() => navigation.goBack()} title="返回上个页面" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: 'red',
    },
});
