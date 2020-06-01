import React from "react";
import {Text, View, ViewProps} from "react-native";
import {BaseComponent} from "../aura/base/BaseComponent";

export interface RecommendPageState {
    demoList: [],  // 常见Demo列表
    componentList: [], //常见Component列表
    uiList: [], // 推荐的UI效果List
    refreshing: boolean
}

/**
 * 推荐页面
 */
export default class RecommendPage extends BaseComponent<ViewProps, RecommendPageState> {

    constructor(props: ViewProps) {
        super(props);
        // 初始化State对象
        this.state = {
            demoList: [],
            componentList: [],
            uiList: [],
            refreshing: false,
        }
    }

    public componentDidMount() {
        super.componentDidMount();
        this.requestPageData();
    }

    public requestPageData = () => {
        this.setState({refreshing: true})


    }


    public render(): React.ReactNode {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>推荐!</Text>
            </View>
        );
    }
}
