import React from "react";
import {FlatList, Image, Text, TouchableOpacity, View, ViewProps} from "react-native";
import {BaseComponent} from "../aura/base/BaseComponent";
import AuraHttp from "../aura/network";
import RequestUrl from "../network/RequestUrl";
import ImageRes from "../resources/images/ImageRes";
import {CommonStyles} from "../resources/styles/CommonStyles";
import ColorRes from "../resources/colors/ColorRes";
import {RecommendStyles} from "../resources/styles/RecommendStyles";
import CommonGridMenuView from "../components/CommonGridMenuVIew";

export interface RecommendPageState {
    demoList: any[],  // 常见Demo列表
    componentList: any[], //常见Component列表
    uiList: any[], // 推荐的UI效果List
    refreshing: boolean
}

/**
 * 推荐页面
 */
const TAG = "RecommendPage";
export default class RecommendPage extends BaseComponent<ViewProps, RecommendPageState> {

    static navigationOptions = ({navigation}: any) => ({
        headerTitle: () => (
            <TouchableOpacity style={CommonStyles.searchBar}>
                <Image source={ImageRes.main.search} style={CommonStyles.searchIcon}/>
                <Text>搜索</Text>
            </TouchableOpacity>
        ),
        headerStyle: {backgroundColor: ColorRes.common.primary},
    })

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

    public requestPageData = async () => {
        this.setState({refreshing: true})

        let response = await new AuraHttp()
            .get(RequestUrl.homePageReqUrl)
            .then((data: any) => {
                //Logger.info(TAG, `response:${JSON.stringify(data)}`)
                return data;
            })
            .catch((error: any) => {

            });

        let dataList = response.data.items.map(
            (info: any) => {
                //Logger.info(this.TAG, `dataList:${JSON.stringify(info)}`)
                return {
                    id: info.id,
                    imageUrl: info.squareimgurl,
                    title: info.mname,
                    subtitle: `[${info.range}]${info.title}`,
                    price: info.price
                }
            }
        )
        this.setState({
            demoList: dataList,
            refreshing: false,
        });
    }

    /**
     * Render布局里面的设置
     */
    public render(): React.ReactNode {
        return (
            <View style={CommonStyles.container}>
                <FlatList
                    data={this.state.demoList}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    onRefresh={this.requestPageData}
                    refreshing={this.state.refreshing}
                    ListHeaderComponent={this.renderHeader}
                />
            </View>
        );
    }

    /**
     * 头部组件的
     */
    public renderHeader = () => {
        return (
            <View>
                {/*<CommonGridMenuView menuItems={}/>*/}
                <View style={RecommendStyles.uiDemosHeader}>
                    <Text>猜你喜欢</Text>
                </View>
            </View>
        );
    }


    /**
     *  渲染页面的布局的Item
     */
    private _renderItem = (item: any, index: number): React.ReactNode => {
        console.log(TAG, `_renderItem type: ${item.item.title}`);
        return <Text>{item.item.title}</Text>
    }

    private _keyExtractor = (item: any, index: number) => {
        return item.id.toString()
    }
}
