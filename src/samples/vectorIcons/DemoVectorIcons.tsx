import React, {ReactChildren, ReactElement} from 'react';
import {Text, Button, ViewProps, View, StyleSheet, ToastAndroid} from 'react-native';
import {BaseComponent} from '../../aura/base/BaseComponent';
import Icon from 'react-native-vector-icons/FontAwesome';

const TAG = 'DemoFlexbox';
/**
 * React Native的可自定义图标，支持NavBar / TabBar / ToolbarAndroid，图像源和完整样式。
 *
 * 官网地址：https://github.com/oblador/react-native-vector-icons
 * 非常适合按钮，徽标和导航/标签栏。易于扩展，样式化和集成到您的项目中。
 * 具体有哪些图标，我们可以看看：https://oblador.github.io/react-native-vector-icons/
 *
 */
export default class DemoVectorIcons extends BaseComponent<ViewProps, {}> {
    constructor(props: ViewProps) {
        super(props);
    }

    public render(): ReactChildren | ReactElement {
        return (
            <View style={styles.mainContainer}>
                <Icon.Button name="facebook" backgroundColor="#3b5998">
                    <Text style={{fontFamily: 'Arial', fontSize: 15}}>登录Facebook</Text>
                </Icon.Button>
            </View>
        );
    }

    private loginWithFacebook = () => {
        ToastAndroid.show('登录', 1000);
    };
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
});
