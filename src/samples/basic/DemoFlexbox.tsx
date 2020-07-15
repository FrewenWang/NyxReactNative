import React, {ReactChildren, ReactElement} from 'react';
import {Button, ViewProps} from 'react-native';
import {BaseComponent} from '../../aura/base/BaseComponent';
import {TimeoutManager} from '../../aura/utils/TimeoutManager';

const TAG = 'DemoFlexbox';
/**
 * 我们在React Native中使用flexbox规则来指定某个组件的子元素的布局。
 * Flexbox可以在不同屏幕尺寸上提供一致的布局结构。
 * 一般来说，使用flexDirection、alignItems和 justifyContent三个样式属性就已经能满足大多数布局需求。
 * 译注：这里有一份简易布局图解，可以给你一个大概的印象。
 */
export default class DemoFlexbox extends BaseComponent<ViewProps, {}> {
    constructor(props: ViewProps) {
        super(props);
    }

    public render(): ReactChildren | ReactElement {
        return <></>;
    }
}
