import * as React from 'react';
// @ts-ignore
import {NavigationContainer} from "@react-navigation/native";
// @ts-ignore
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomePage from "../../pages/HomePage";
import DiscoveryPage from "../../pages/DiscoveryPage";
import RecommendPage from "../../pages/RecommendPage";
import MyProfile from "../../pages/MyProfilePage";

const Tab = createBottomTabNavigator();

export default function App() {

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'ios-information-circle'
                                : 'ios-information-circle-outline';
                        } else if (route.name === 'Settings') {
                            iconName = focused ? 'ios-list-box' : 'ios-list';
                        }
                        // You can return any component that you like here!
                        return null;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'purple',
                }}
            >
                <Tab.Screen name="首页" component={HomePage}/>
                <Tab.Screen name="推荐" component={RecommendPage}/>
                <Tab.Screen name="发现" component={DiscoveryPage}/>
                <Tab.Screen name="我的" component={MyProfile}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
