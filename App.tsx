import React from 'react';
import {StatusBar, View} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import ScreenDimensions from './src/resources/dimensions/ScreenDimensions';

/**
 * 关于项目工程的Demo:
 * 这个我们项目里面的入口App
 * 这个入口的App加载了我们的页面的路由导航
 * https://github.com/FrewenWong/HelloReactNative
 * @constructor
 */
export default function App() {
    return (
        <View style={{flex: 1, width: ScreenDimensions.width}}>
            <StatusBar
                translucent
                backgroundColor={'transparent'}
                showHideTransition={'fade'}
                barStyle={'light-content'}
            />
            <AppNavigator />
        </View>
    );
}
