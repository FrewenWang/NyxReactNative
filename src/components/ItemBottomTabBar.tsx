import React, {PureComponent} from "react";
import {Image, ViewProps} from "react-native";

type BottomTabBarItemProps = {
    tintColor: any,
    normalImage: any,
    selectedImage: any,
    focused: boolean,
}

export default class BottomTabBarItem extends PureComponent<BottomTabBarItemProps, any> {
    public render(): React.ReactNode {
        let selectedImage = this.props.selectedImage ? this.props.selectedImage : this.props.normalImage
        return (
            <Image
                source={this.props.focused
                    ? selectedImage
                    : this.props.normalImage}
                style={{tintColor: this.props.tintColor, width: 25, height: 25}}
            />
        )
    }
}
