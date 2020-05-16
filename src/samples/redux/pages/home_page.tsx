import React from "react";
import {Text} from "react-native";
import {BaseComponent} from "../../../aura/base/BaseComponent";
import {createDrawerNavigator} from "@react-navigation/drawer";


const Drawer = createDrawerNavigator();

interface HomeState {
}

interface HomeProps {
    navigation: any
}

export default class HomePage extends BaseComponent<HomeProps, HomeState> {

    private readonly navigation: any;


    constructor(props: HomeProps) {
        super(props);
        this.navigation = props.navigation;
    }

    render(): React.ReactNode {
        return (
            <>
                <Text>首页页面</Text>
            </>
        );
    }
}
