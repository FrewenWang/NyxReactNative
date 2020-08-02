import React from 'react';
import {View, Text, ViewProps, StyleSheet} from 'react-native';
import {BasePureComponent} from '../aura/base/BasePureComponent';
import {TimeoutManager} from '../aura/utils/TimeoutManager';
import {SplashStyles} from '../resources/styles';

const TAG = 'SplashPage';
export default class SplashPage extends BasePureComponent<ViewProps, any> {
    private readonly timeoutManager: TimeoutManager;
    private timer?: number;

    constructor(props: ViewProps) {
        super(props);
        this.timeoutManager = new TimeoutManager('SplashPage');
    }

    public componentDidMount(): void {
        super.componentDidMount();
        // 这个地方，我们是从this.props取出navigation对象
        const {navigation}: any = this.props;
        this.timer = this.timeoutManager.startTimeout(() => {
            navigation.navigation();
        }, 2000);
    }

    public componentWillUnmount(): void {
        super.componentWillUnmount();
        this.timeoutManager?.clearTimer(this.timer);
    }

    public render(): React.ReactNode {
        return (
            <View style={SplashStyles.container}>
                <Text>欢迎来到ReactNative世界</Text>
            </View>
        );
    }
}
