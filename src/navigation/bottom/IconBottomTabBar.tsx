import React, {PureComponent} from 'react';
import {Image} from 'react-native';

type BottomTabBarItemProps = {
    size: number;
    tintColor: any;
    normalImage: any;
    selectedImage: any;
    focused: boolean;
};
/**
 * 这个是只针对底部的Tab标签栏的Icon属性
 */
export default class IconBottomTabBar extends PureComponent<BottomTabBarItemProps, any> {
    private theme: {tintColor: String; updateTime: number};

    constructor(props: BottomTabBarItemProps) {
        super(props);
        this.theme = {
            tintColor: this.props.tintColor,
            updateTime: new Date().getTime(),
        };
    }

    public render(): React.ReactNode {

        let selectedImage = this.props.selectedImage ? this.props.selectedImage : this.props.normalImage;
        return (
            <Image
                source={this.props.focused ? selectedImage : this.props.normalImage}
                style={{tintColor: this.props.tintColor, width: this.props.size, height: this.props.size}}
            />
        );
    }
}
