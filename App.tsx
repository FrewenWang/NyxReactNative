import React from 'react';
import {StatusBar, View} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import ScreenDimensions from './src/resources/dimensions/ScreenDimensions';

/**
 * 关于项目工程的Demo:
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
