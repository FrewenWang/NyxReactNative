import * as React from 'react';
import {BottomTabBarOptions, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {PureComponent, ReactElement} from 'react';
import BottomTabBarItem from '../components/ItemBottomTabBar';
import navigationHelper from '../utils/NavigationHelper';
import Logger from '../aura/utils/Logger';
import {StackHeaderOptions} from '@react-navigation/stack/lib/typescript/src/types';
import {bottomTabNavigationRouter} from './NavigationRouter';

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
                    tabBarIcon: ({focused, color, size}) => {
                        return (
                            <BottomTabBarItem
                                size={size}
                                tintColor={'purple'}
                                focused={focused}
                                // @ts-ignore
                                normalImage={bottomTabNavigationRouter[route.name].inActiveIcon}
                                // @ts-ignore
                                selectedImage={bottomTabNavigationRouter[route.name].activeIcon}
                            />
                        );
                    },
                })}>
                {/*backBehavior={'none'}*/}
                {/* 下面是TabBar的配置选项的配置参数 可以配置很多个性配置*/}
                {/*tabBarOptions={_tabBarOptions}  */}

                {/* 遍历我们底部导航栏的配置数据.遍历对象所有的属性*/}
                {Object.keys(bottomTabNavigationRouter).map((key: any, index: number) => {
                    // @ts-ignore
                    const item = bottomTabNavigationRouter[key];
                    return (
                        <Tab.Screen
                            name={item.pageName}
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
