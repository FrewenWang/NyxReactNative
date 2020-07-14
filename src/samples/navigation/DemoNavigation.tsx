import * as React from 'react';
import {NavigationContainer, NavigationContainerRef} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// 添加react-native-vector-icons的相关依赖
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomePage from '../../pages/HomePage';
import DiscoveryPage from '../../pages/DiscoveryPage';
import RecommendPage from '../../pages/RecommendPage';
import MyProfile from '../../pages/MyProfilePage';
import {useEffect} from 'react';
import {BackHandler} from 'react-native';
import navigationHelper from '../../utils/NavigationHelper';
import AuraStackNavigator from './StackNavigator';

const Tab = createBottomTabNavigator();
/**
 * 1、createStackNavigator 类似于普通的navigator，屏幕上方的导航栏
 * 2、createBottomTabNavigator  下方的导航栏
 * 3、createDrawerNavigator
 * @constructor
 */
const AuraBottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarLabel: ({focused, color}) => {
                    switch (route.name) {
                        case 'Home':
                            return '首页';
                        case 'Recommend':
                            return '推荐';
                        case 'Discovery':
                            return '发现';
                        case 'MyProfile':
                            return '我的';
                    }
                    return '';
                },
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    switch (route.name) {
                        case 'Home':
                            return '首页';
                    }

                    return null;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'purple',
            }}>
            <Tab.Screen name="Home" component={HomePage}/>
            <Tab.Screen name="Recommend" component={RecommendPage}/>
            <Tab.Screen name="Discovery" component={DiscoveryPage}/>
            <Tab.Screen name="MyProfile" component={MyProfile}/>
        </Tab.Navigator>
    );
};

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
            {/*<AuraBottomTabNavigator />*/}
            <AuraStackNavigator></AuraStackNavigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
