import React from 'react';
// createMaterialTopTabNavigator这个是react-navigation
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {topTabRouter} from './NavigationRouter';

const TopTab = createMaterialTopTabNavigator();
/**
 * 这个页面AuraStackNavigator
 * 具体的demo。我们后来学习：
 * @constructor
 */
export default function NaviMaterialTopTabContainer() {
    return (
        <TopTab.Navigator>
            <TopTab.Screen name={topTabRouter.home.name} component={topTabRouter.home.screen}/>
            <TopTab.Screen name={topTabRouter.recommend.name} component={topTabRouter.recommend.screen}/>
        </TopTab.Navigator>
    );
}
