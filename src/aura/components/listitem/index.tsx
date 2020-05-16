import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps
} from "react-native";
import {BaseComponent} from "../../base/BaseComponent";
import {ListItemStyles, SplashStyles} from "../../../resources/styles";

/**
 * ListItem的属性传入
 */
interface ListItemProps extends TouchableOpacityProps {
    title: string;
}

/**
 * ListView的Item控件
 */
export class ListItem extends BaseComponent<ListItemProps, {}> {
    private title: string;

    constructor(props: ListItemProps) {
        super(props);
        this.title = this.props.title;
    }

    render() {
        const {title} = this.props;
        return (
            <TouchableOpacity
                {...this.props}
                style={ListItemStyles.itemContainer}>
                <Text style={ListItemStyles.titleStyle}>{title}</Text>
            </TouchableOpacity>
        );
    }
}
