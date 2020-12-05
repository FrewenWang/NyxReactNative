import React from 'react';
import {View, Text, ViewProps} from 'react-native';
import {BasePureComponent} from '../aura/base/BasePureComponent';
import {TimeoutManager} from '../aura/utils/TimeoutManager';
import {SplashStyles} from '../resources/styles';
import {stackRouter} from '../navigation/NavigationRouter';

const TAG = 'SplashPage';
export default class SplashPage extends BasePureComponent<ViewProps, any> {
    private readonly timeoutManager: TimeoutManager;
    private timer?: number;

    constructor(props: ViewProps) {
        super(props);
        this.timeoutManager = new TimeoutManager('SplashPage');
    }

    /**
     * 重点：从闪屏页面跳转到首页使用
     * navigation.navigate(stackRouter.MainPage.name)方法
     */
    public componentDidMount(): void {
        super.componentDidMount();
        // 这个地方，我们是从this.props取出navigation对象
        const {navigation}: any = this.props;
        this.timer = this.timeoutManager.startTimeout(() => {
            // 我们从当前页面的属性中，拿到navigation对象，调用导航navigate方法
            navigation.navigate(stackRouter.MainPage.name);
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
