import * as React from 'react';
import {Text} from 'react-native';
import {PureComponent, ReactElement} from 'react';
import HomePage from '../../pages/HomePage';
import RecommendPage from '../../pages/RecommendPage';
import DiscoveryPage from '../../pages/DiscoveryPage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTabBarItem from '../../components/ItemBottomTabBar';
import ImageRes from '../../resources/images/ImageRes';
import MyProfilePage from '../../pages/MyProfilePage';
import navigationHelper from '../../utils/NavigationHelper';

const tabBottomConfigs = {
    home: {
        tabName: 'home',
        screen: HomePage,
        tintColor: 'purple',
        activeIcon: ImageRes.main.homeSelected,
        inActiveIcon: ImageRes.main.home,
        options: {tabBarLabel: '首页', headerShown: false},
    },
    recommend: {
        screen: RecommendPage,
        tabName: 'recommend',
        tintColor: 'purple',
        activeIcon: ImageRes.main.recommendSelected,
        inActiveIcon: ImageRes.main.recommend,
        options: {tabBarLabel: '推荐'},
    },
    discovery: {
        screen: DiscoveryPage,
        tabName: 'recommend',
        tintColor: 'purple',
        activeIcon: ImageRes.main.discoverySelected,
        inActiveIcon: ImageRes.main.discovery,
        options: {tabBarLabel: '发现'},
    },
    profile: {
        tabName: 'myProfile',
        screen: MyProfilePage,
        tintColor: 'purple',
        activeIcon: ImageRes.main.myProfileSelected,
        inActiveIcon: ImageRes.main.myProfile,
        options: {tabBarLabel: '我的'},
    },
};

const Tab = createBottomTabNavigator();
export default class BottomTabNavigator<ViewProps, State> extends PureComponent<ViewProps, State> {
    public render(): ReactElement {
        return (
            <Tab.Navigator
                initialRouteName={'home'}
                screenOptions={({route, navigation}) => ({
                    tabBarLabel: ({focused, color}) => {
                        switch (route.name) {
                            case 'HomePage':
                                return <Text>首页</Text>;
                            case 'RecommendPage':
                                return <Text>推荐</Text>;
                            case 'DiscoveryPage':
                                return <Text>发现</Text>;
                            case 'MyProfilePage':
                                return <Text>我的</Text>;
                        }
                        return <Text>首页</Text>;
                    },
                    tabBarIcon: ({focused, color, size}) => {
                        return (
                            <BottomTabBarItem
                                size={size}
                                tintColor={'purple'}
                                focused={focused}
                                // @ts-ignore
                                normalImage={tabBottomConfigs[route.name].inActiveIcon}
                                // @ts-ignore
                                selectedImage={tabBottomConfigs[route.name].activeIcon}
                            />
                        );
                    },
                })}>
                {/* 遍历我们底部导航栏的配置数据*/}
                {Object.keys(tabBottomConfigs).map((key: any, index: number) => {
                    // @ts-ignore
                    const item = tabBottomConfigs[key];
                    return (
                        <Tab.Screen
                            name={key}
                            component={item.screen}
                            options={item.options}
                            key={`${index}`}
                            listeners={({navigation, route}) => ({
                                tabPress: (e) => {
                                    e.preventDefault();
                                    if (route.name === 'social') {
                                        navigationHelper.push('login');
                                    } else {
                                        navigation.jumpTo(route.name);
                                    }
                                },
                            })}
                        />
                    );
                })}
            </Tab.Navigator>
        );
    }
}
