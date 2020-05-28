import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from "./HomePage";
import DiscoveryPage from "./DiscoveryPage";
import RecommendPage from "./RecommendPage";
import MyProfile from "./MyProfilePage";

const Tab = createBottomTabNavigator();

export default function App() {

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="HomePage" component={HomePage}/>
                <Tab.Screen name="RecommendPage" component={RecommendPage}/>
                <Tab.Screen name="DiscoveryPage" component={DiscoveryPage}/>
                <Tab.Screen name="MyProfile" component={MyProfile}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
