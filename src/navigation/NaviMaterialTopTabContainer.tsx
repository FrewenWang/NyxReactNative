import React from 'react';
// createMaterialTopTabNavigator这个是react-navigation
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {topTabRouter} from './NavigationRouter';

const TopTab = createMaterialTopTabNavigator();
/**
 * 这个页面NaviMaterialTopTabContainer
 * 具体的demo。我们后来学习：
 * 具体的Demo文档：https://reactnavigation.org/docs/material-top-tab-navigator
 * @constructor
 */
export default function NaviMaterialTopTabContainer() {
    return (
        // 这个TopTab.Navigator有很多的属性：
        //  initialRouteName:导航器首次加载时要渲染路由的名称。
        //  screenOptions:导航器中用于屏幕Screen的默认选项
        //  backBehavior:后退按钮处理的行为。
        <TopTab.Navigator initialRouteName={topTabRouter.recommend.name}>
            {/*note 下面，我们的目的是能够达到动态设置底部导航栏的属性和效果*/}
            {/* 遍历我们底部导航栏的配置数据.遍历对象所有的属性*/}
            {Object.keys(topTabRouter).map((key: any, index: number) => {
                // @ts-ignore
                const item = topTabRouter[key];
                return (
                    <TopTab.Screen name={item.name} component={item.screen} options={item.options} key={`${index}`}/>
                );
            })}
        </TopTab.Navigator>
    );
}
