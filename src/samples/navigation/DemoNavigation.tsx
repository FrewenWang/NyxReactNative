import * as React from 'react';
import {NavigationContainer, NavigationContainerRef} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useEffect} from 'react';
import {BackHandler} from 'react-native';
import navigationHelper from '../../utils/NavigationHelper';
import AuraStackNavigator from './StackNavigator';

const Tab = createBottomTabNavigator();
/**
 *
 * 这里我们来学习React Navigation
 * 1、createStackNavigator 类似于普通的navigator，屏幕上方的导航栏
 * 2、createBottomTabNavigator  下方的导航栏
 * 3、createDrawerNavigator
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
        // 这个我们需要使用ReactNavigation的容器组件.
        // 我们在里面可以放
        // 1、底部Tab导航容器
        // 2、堆栈导航容器
        // 3、Drawerable抽屉导航容器
        <NavigationContainer>
            {/*<NaviBottomTabContainer />*/}

            {/*下面是测试堆栈导航容器，父组件是AuraStackNavigator容器组件*/}
            {/*下面，我们来看AuraStackNavigator的*/}
            <AuraStackNavigator></AuraStackNavigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
