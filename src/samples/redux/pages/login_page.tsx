import React from "react";
import {Text} from "react-native";
import {BaseComponent} from "../../../aura/base/BaseComponent";

interface LoginState {
}

interface LoginProps {
    navigation: any
}

export default class LoginPage extends BaseComponent<LoginProps, LoginState> {

    private readonly navigation: any;


    constructor(props: LoginProps) {
        super(props);
        this.navigation = props.navigation;
    }

    render(): React.ReactNode {
        return (
            <>
                <Text>登录页面</Text>
            </>
        );
    }
}
