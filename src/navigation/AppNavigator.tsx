import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import navigationHelper from '../utils/NavigationHelper';
import {NavigationContainer} from '@react-navigation/native';
import NaviStackContainer from './NaviStackContainer';

/**
 * App的Navigation容器
 * 这个路由导航里面由一个NavigationContainer的路由导航的容器
 * 目前路由导航的容器里面存放的是AuraStackNavigator（Aura栈路由）
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
            <NaviStackContainer></NaviStackContainer>
        </NavigationContainer>
    );
};

// @ts-ignore
export default AppNavigator;
