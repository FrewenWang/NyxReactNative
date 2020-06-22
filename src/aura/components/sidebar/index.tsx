import React from "react";
import {View} from "react-native";
import {BaseComponent} from '../../base/BaseComponent';
import {ListItem} from '../listitem';
import {SplashStyles} from "../../../resources/styles";
import StringsResCH from "../../../resources/strings/StringsResCH";
import StringsResEN from "../../../resources/strings/StringsResEN";

export interface SideBarProps {
    navigation: any
}


export default class SideBar extends BaseComponent<SideBarProps, any> {
    private navigation: any;

    constructor(props: SideBarProps) {
        super(props);
        this.navigation = this.props.navigation;
    }

    render(): React.ReactNode {
        return (
            <View style={SplashStyles.container}>
                <ListItem
                    title={StringsResCH.common.home}
                    onPress={() => {
                        this.navigation.navigate(StringsResEN.common.home);
                    }}
                />
                <ListItem
                    title="空白页面"
                    onPress={() => this.navigation.navigate('Blank')}
                />
            </View>
        );
    }
}
