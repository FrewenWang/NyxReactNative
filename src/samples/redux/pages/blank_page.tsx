import React from "react";
import {Text} from "react-native";
import {BaseComponent} from "../../../aura/base/BaseComponent";
import {createDrawerNavigator} from "@react-navigation/drawer";

interface BlankState {
}

interface BlankProps {
    navigation: any
}

export default class BlankPage extends BaseComponent<BlankProps, BlankState> {

    private readonly navigation: any;


    constructor(props: BlankProps) {
        super(props);
        this.navigation = props.navigation;
    }

    render(): React.ReactNode {
        return (
            <>
                <Text>空白页面</Text>
            </>
        );
    }
}
