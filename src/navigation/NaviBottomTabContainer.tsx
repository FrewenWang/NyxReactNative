import * as React from 'react';
import {BottomTabBarOptions, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {PureComponent, ReactElement} from 'react';
import ItemBottomTabBar from './bottom/ItemBottomTabBar';
import IconBottomTabBar from './bottom/IconBottomTabBar';
import navigationHelper from '../utils/NavigationHelper';
import Logger from '../aura/utils/Logger';
import {StackHeaderOptions} from '@react-navigation/stack/lib/typescript/src/types';
import {bottomTabRouter} from './NavigationRouter';
import NaviPageProps from './NaviPageProps';
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';

const BottomTab = createBottomTabNavigator();
const TAG = 'NaviBottomTabContainer';
export default class NaviBottomTabContainer extends PureComponent<NaviPageProps> {
    public constructor(props: NaviPageProps) {
        super(props);
        // 关闭黄色警告框
        console.disableYellowBox = true;
        let navigation = props.navigation;
        let route = props.route;
        Logger.log(TAG, `navigation:${navigation},route:${route}`);
        // React.useLayoutEffect(() => {
        //     navigation.setOptions(_getHeaderOptions(route));
        // }, [navigation, route]);
    }

    public render(): ReactElement {
        return (
            <BottomTab.Navigator
                initialRouteName={bottomTabRouter.home.pageName}
                screenOptions={({route, navigation}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        return (
                            <IconBottomTabBar
                                size={size}
                                tintColor={'purple'}
                                focused={focused}
                                // TODO 后续我们会考虑换成VectorIcons,暂时先搭框架
                                // @ts-ignore
                                normalImage={bottomTabRouter[route.name].inActiveIcon}
                                // @ts-ignore
                                selectedImage={bottomTabRouter[route.name].activeIcon}
                            />
                        );
                    },
                    // delay 暂时未完成此功能，后续完成
                    // tabBarButton: (props: BottomTabBarButtonProps) => {
                    //     // @ts-ignore
                    //     return <ItemBottomTabBar theme={this.props.theme} {...props} />;
                    // },
                })}>
                {/*backBehavior={'none'}*/}
                {/* 下面是TabBar的配置选项的配置参数 可以配置很多个性配置*/}
                {/*tabBarOptions={_tabBarOptions}  */}

                {/*TODO 下面，我们的目的是能够达到动态设置底部导航栏的属性和效果*/}
                {/* 遍历我们底部导航栏的配置数据.遍历对象所有的属性*/}
                {Object.keys(bottomTabRouter).map((key: any, index: number) => {
                    // @ts-ignore
                    const item = bottomTabRouter[key];
                    return (
                        <BottomTab.Screen
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
            </BottomTab.Navigator>
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
