import * as React from 'react';
import {Text} from 'react-native';
import HomePage from '../pages/HomePage';
import ImageRes from '../resources/images/ImageRes';
import RecommendPage from '../pages/RecommendPage';
import DiscoveryPage from '../pages/DiscoveryPage';
import MyProfilePage from '../pages/MyProfilePage';
import {BottomTabBarOptions, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {PureComponent, ReactElement} from 'react';
import BottomTabBarItem from '../components/ItemBottomTabBar';
import navigationHelper from '../utils/NavigationHelper';
import Logger from '../aura/utils/Logger';
import {StackHeaderOptions} from '@react-navigation/stack/lib/typescript/src/types';

const Tab = createBottomTabNavigator();
const TAG = 'AuraBottomTabNavigator';
export default class AuraBottomTabNavigator<ViewProps, State> extends PureComponent<ViewProps, State> {
    public constructor(props: ViewProps) {
        super(props);
        // @ts-ignore
        let navigation = props.navigation;
        // @ts-ignore
        let route = props.route;
        Logger.log(TAG, `navigation:${navigation},route:${route}`);
        // React.useLayoutEffect(() => {
        //     navigation.setOptions(_getHeaderOptions(route));
        // }, [navigation, route]);
    }

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
                {/*backBehavior={'none'}*/}
                {/* 下面是TabBar的配置选项的配置参数 可以配置很多个性配置*/}
                {/*tabBarOptions={_tabBarOptions}  */}
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

const _getHeaderOptions = (route: any): StackHeaderOptions => {
    if (!route.state) return {};

    const routeName = route.state.routes[route.state.index].name;
    const {routes = [], index = 0} = route.state;
    if (!routes || routes.length === 0) return {};

    const params = routes[index].params || {};
    if (params.title) {
        params['headerTitle'] = params.title;
    }
    params['headerShown'] = routeName !== 'home';
    return params;
};

const _tabBarOptions: BottomTabBarOptions = {
    activeTintColor: '#800080',
    inactiveTintColor: '#999999',
};

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
