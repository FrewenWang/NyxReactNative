import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomePage from './src/pages/HomePage';
import RecommendPage from './src/pages/RecommendPage';
import DiscoveryPage from './src/pages/DiscoveryPage';
import MyProfilePage from './src/pages/MyProfilePage';
import {Text} from 'react-native';
import BottomTabBarItem from './src/components/ItemBottomTabBar';
import ImageRes from './src/resources/images/ImageRes';

/**
 * 关于项目工程的Demo:
 * https://github.com/FrewenWong/HelloReactNative
 * @constructor
 */
export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
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
                        switch (route.name) {
                            case 'HomePage':
                                return (
                                    <BottomTabBarItem
                                        tintColor={'purple'}
                                        focused={focused}
                                        normalImage={ImageRes.main.home}
                                        selectedImage={ImageRes.main.homeSelected}
                                    />
                                );
                            case 'RecommendPage':
                                return (
                                    <BottomTabBarItem
                                        tintColor={'purple'}
                                        focused={focused}
                                        normalImage={ImageRes.main.recommend}
                                        selectedImage={ImageRes.main.recommendSelected}
                                    />
                                );
                            case 'DiscoveryPage':
                                return (
                                    <BottomTabBarItem
                                        tintColor={'purple'}
                                        focused={focused}
                                        normalImage={ImageRes.main.discovery}
                                        selectedImage={ImageRes.main.discoverySelected}
                                    />
                                );
                            case 'MyProfilePage':
                                return (
                                    <BottomTabBarItem
                                        tintColor={'purple'}
                                        focused={focused}
                                        normalImage={ImageRes.main.myProfile}
                                        selectedImage={ImageRes.main.myProfileSelected}
                                    />
                                );
                        }
                        return (
                            <BottomTabBarItem
                                tintColor={'purple'}
                                focused={focused}
                                normalImage={ImageRes.main.home}
                                selectedImage={ImageRes.main.homeSelected}
                            />
                        );
                    },
                })}>
                <Tab.Screen name="HomePage" component={HomePage} />
                <Tab.Screen name="RecommendPage" component={RecommendPage} />
                <Tab.Screen name="DiscoveryPage" component={DiscoveryPage} />
                <Tab.Screen name="MyProfilePage" component={MyProfilePage} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

/**
 * 创建BottomTabNavigator的对象
 */
const Tab = createBottomTabNavigator();
