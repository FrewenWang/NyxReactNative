import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import navigationHelper from '../utils/NavigationHelper';
import {NavigationContainer} from '@react-navigation/native';
import AuraStackNavigator from './AuraStackNavigator';

/**
 * App的Navigation容器
 * @constructor
 */
const AppNavigator = () => {
    useEffect(() => {
        // 安卓物理返回键处理
        BackHandler.addEventListener('hardwareBackPress', navigationHelper.backAction);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', navigationHelper.backAction);
        };
    }, []);

    return (
        <NavigationContainer>
            <AuraStackNavigator></AuraStackNavigator>
        </NavigationContainer>
    );
};

// @ts-ignore
export default AppNavigator;
