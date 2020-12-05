import React from 'react';
import {FlatList, Image, Text, View, ViewProps} from 'react-native';
import {BaseComponent} from '../aura/base/BaseComponent';
import Logger from '../aura/utils/Logger';
import {DiscoveryStyles} from '../resources/styles';
import ColorRes from '../resources/colors/ColorRes';
import {BasePureComponent} from '../aura/base/BasePureComponent';

export interface DiscoveryPageState {}

/**
 * 这个页面区别于正常的推荐页面
 * 我们要在这个页面里面实例化我们的布局参数
 */
export default class RecommendPageContainer extends BasePureComponent<ViewProps, DiscoveryPageState> {
    private readonly navigation: any;
    private tabNames: string[];

    constructor(props: ViewProps) {
        super(props);
        // @ts-ignore
        this.navigation = this.props.navigation;
        Logger.info(this.TAG, `navigation = ${this.navigation}`);
        this.tabNames = ['Java', 'Android', 'Kotlin', 'ReactNative', 'Flutter', 'Node.js'];
    }

    public componentDidMount(): void {
        super.componentDidMount();
        const that = this;
        let items = Array.apply(null, Array(60)).map((v, k) => {
            return {
                id: k,
                src: 'http://placehold.it/200x200?text=' + (k + 1),
            };
        });

        that.setState({
            // @ts-ignore
            dataSource: items,
        });
    }

    public render(): React.ReactNode {
        return <View style={DiscoveryStyles.MainContainer}></View>;
    }

    private _genTopItem() {
        // @ts-ignore
        const {tabNames, theme} = this.props;
        // @ts-ignore
        tabNames.forEach((item, index) => {
            screen: (props) => <RecommendTopTab {...props} tabLabel={item.name} theme={theme} />;
        });
    }
}

class RecommendTopTab extends BasePureComponent<ViewProps, any> {
    constructor(props: ViewProps) {
        super(props);
    }
}
