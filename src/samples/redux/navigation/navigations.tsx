import React from "react";
import {ViewProps} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashPage from '../pages/splash_page';
import {BaseComponent} from "../../../aura/base/BaseComponent";


/**
 * 实例化Stack
 */
const Stack = createStackNavigator();

export default class AppContainer extends BaseComponent<ViewProps, any> {

    render(): React.ReactNode {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="SplashPage">
                    <Stack.Screen
                        name="SplashPage"
                        component={SplashPage}
                        options={{}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
