import React from "react";
import {Text, View, ViewProps} from "react-native";
import {BaseComponent} from "../aura/base/BaseComponent";

export default class HomePage extends BaseComponent<ViewProps, any> {

    private navigation: any

    constructor(props: ViewProps) {
        super(props);
        // @ts-ignore
        this.navigation = this.props.navigation;
    }

    public render(): React.ReactNode {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>首页!</Text>
            </View>
        );
    }
}
