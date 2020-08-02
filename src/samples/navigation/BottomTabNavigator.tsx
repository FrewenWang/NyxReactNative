import * as React from 'react';
import {PureComponent, ReactElement} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTabBarItem from '../../components/ItemBottomTabBar';
import ImageRes from '../../resources/images/ImageRes';
import navigationHelper from '../../utils/NavigationHelper';
import BottomTabPage1 from './pages/BottomTabPage1';
import BottomTabPage2 from './pages/BottomTabPage2';
import BottomTabPage3 from './pages/BottomTabPage3';
import BottomTabPage4 from './pages/BottomTabPage4';

/**
 * 定义每个页面的配置。
 * bottomTabPage1和pageName保持一致
 */
const tabBottomConfigs = {
    bottomTabPage1: {
        pageName: 'bottomTabPage1',
        screen: BottomTabPage1,
        tintColor: 'purple',
        activeIcon: ImageRes.main.homeSelected,
        inActiveIcon: ImageRes.main.home,
        options: {tabBarLabel: '页面1', headerShown: false},
    },
    bottomTabPage2: {
        pageName: 'bottomTabPage2',
        screen: BottomTabPage2,
        tintColor: 'purple',
        activeIcon: ImageRes.main.recommendSelected,
        inActiveIcon: ImageRes.main.recommend,
        options: {tabBarLabel: '推荐'},
    },
    bottomTabPage3: {
        pageName: 'bottomTabPage3',
        screen: BottomTabPage3,
        tintColor: 'purple',
        activeIcon: ImageRes.main.discoverySelected,
        inActiveIcon: ImageRes.main.discovery,
        options: {tabBarLabel: '发现'},
    },
    bottomTabPage4: {
        pageName: 'bottomTabPage4',
        screen: BottomTabPage4,
        tintColor: 'purple',
        activeIcon: ImageRes.main.myProfileSelected,
        inActiveIcon: ImageRes.main.myProfile,
        options: {tabBarLabel: '我的'},
    },
};

const Tab = createBottomTabNavigator();
/**
 * https://reactnavigation.org/docs/stack-navigator/#options
 *
 */
export default class BottomTabNavigator<ViewProps, State> extends PureComponent<ViewProps, State> {
    public render(): ReactElement {
        return (
            //The Stack.Navigator component accepts following props:
            // 下面我们依次来介绍一下他的属性：
            // initialRouteName:导航器第一次加载时要呈现的路由名称。
            // screenOptions:导航器中用于屏幕的默认选项
            <Tab.Navigator
                initialRouteName={tabBottomConfigs.bottomTabPage1.pageName}
                screenOptions={({route, navigation}) => ({
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
