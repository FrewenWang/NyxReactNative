import React from "react";
import {Text, View, ViewProps} from "react-native";
import {BaseComponent} from "../aura/base/BaseComponent";


export default class MyProfilePage extends BaseComponent<ViewProps, any> {

    constructor(props: ViewProps) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>我的!</Text>
            </View>
        );
    }
}
