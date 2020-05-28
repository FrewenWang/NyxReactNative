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
            >
                <Tab.Screen name="HomePage" component={HomePage}/>
                <Tab.Screen name="RecommendPage" component={RecommendPage}/>
                <Tab.Screen name="DiscoveryPage" component={DiscoveryPage}/>
                <Tab.Screen name="MyProfile" component={MyProfile}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
