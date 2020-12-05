import React, {PureComponent} from 'react';
import {BottomTabBar} from '@react-navigation/bottom-tabs';

type BottomTabBarItemProps = {
    activeTintColor: any;
    theme: any;
};
/**
 * 这个是只针对底部的Tab标签栏的Icon属性
 */
export default class ItemBottomTabBar extends PureComponent<BottomTabBarItemProps, any> {
    private theme: {tintColor: string; updateTime: number};

    /**
     * 我们定一个自己的Theme的主题对象
     * @param props
     */
    constructor(props: BottomTabBarItemProps) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime(),
        };
    }

    render() {
        // @ts-ignore
        const {routers, index} = this.props.navigation.state;
        // @ts-ignore
        return <BottomTabBar {...this.props} activeTintColor={this.theme.tintColor} />;
    }
}
