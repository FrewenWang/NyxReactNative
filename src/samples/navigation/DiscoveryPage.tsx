import React from "react";
import {Text, View} from "react-native";
import {BaseComponent} from "../../aura/base/BaseComponent";


export default class DiscoveryPage extends BaseComponent<any, any> {
    public render(): React.ReactNode {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>发现页面!</Text>
            </View>
        );
    }
}
