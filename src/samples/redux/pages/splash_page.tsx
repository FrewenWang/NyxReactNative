import {createDrawerNavigator} from "@react-navigation/drawer";
import React from "react";
import LoginPage from './login_page';
import HomePage from './home_page';
import BlankPage from './blank_page';
import SideBar from "../../../aura/components/sidebar";
import {BaseComponent} from "../../../aura/base/BaseComponent";

interface SplashState {
}

interface SplashProps {
    navigation: any
}

const Drawer = createDrawerNavigator();
/**
 * SplashPage 页面
 */
export default class SplashPage extends BaseComponent<SplashProps, SplashState> {

    private readonly navigation: any;

    constructor(props: SplashProps) {
        super(props);
        this.navigation = props.navigation;
    }

    render(): React.ReactNode {
        return (
            <>
                <Drawer.Navigator
                    // @ts-ignore
                    contentComponent={() => <SideBar navigation={this.navigation}/>}>
                    <Drawer.Screen
                        name="Home"
                        component={HomePage}
                    />
                    <Drawer.Screen
                        name="Blank"
                        component={BlankPage}
                    />
                    <Drawer.Screen
                        name="Login"
                        component={LoginPage}
                    />
                </Drawer.Navigator>
            </>

        );
    }
}
