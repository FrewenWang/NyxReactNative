import React from 'react';
import {FlatList, Image, ToastAndroid, TouchableOpacity, View, ViewProps, Text, StatusBar} from 'react-native';
import {BaseComponent} from '../aura/base/BaseComponent';
import ImageRes from '../resources/images/ImageRes';
import {Paragraph} from '../aura/widgets/AuraText';
import TopNavigationItem from '../widgets/TopNavigationItem';
import {HomeStyles} from '../resources/styles/HomePageStyle';
import {CommonStyles} from '../resources/styles/CommonStyles';
import ColorRes from '../resources/colors/ColorRes';
import Logger from '../aura/utils/Logger';
import CommonGridMenuView from '../components/CommonGridMenuVIew';
import {menuInfos} from '../network/api/HomeGridMenuInfos';
import FetchHelper from '../aura/network/FetchHelper';
import {Method} from '../aura/network/lib/Options';
import {recommend} from '../network/api/HomeFlatListData';
import HomeFlatList from '../components/HomeFlatList';
import {stackRouter} from '../navigation/NavigationRouter';

/**
 * 定义首页的State
 */
export interface HomeState {
    discounts: Array<Object>;
    recommendList: Array<Object>;
    refreshing: boolean;
}

const TAG = 'HomePage';
export default class HomePage extends BaseComponent<ViewProps, HomeState> {
    private navigation: any;

    static navigationOptions = ({navigation}: any) => ({
        headerTitle: () => (
            <TouchableOpacity style={CommonStyles.searchBar}>
                <Image source={ImageRes.main.search} style={CommonStyles.searchIcon}/>
                <Paragraph style={{color: 'red'}}>搜索</Paragraph>
            </TouchableOpacity>
        ),
        headerRight: () => <TopNavigationItem icon={ImageRes.home.message} onPress={() => {
        }}/>,
        headerLeft: () => <TopNavigationItem title="福州" titleStyle={{color: 'white'}} onPress={() => {
        }}/>,
        headerStyle: {backgroundColor: ColorRes.common.primary},
    });

    constructor(props: ViewProps) {
        super(props);
        // @ts-ignore
        this.navigation = this.props.navigation;

        this.state = {
            discounts: [],
            recommendList: [],
            refreshing: false,
        };
    }

    public componentDidMount() {
        super.componentDidMount();
        this.requestData();
        this.requestFlatListData();
    }

    public render(): React.ReactNode {
        return (
            <View style={HomeStyles.container}>
                <FlatList
                    data={this.state.recommendList}
                    renderItem={this.renderItem}
                    keyExtractor={this._keyExtractor}
                    onRefresh={this.requestData}
                    refreshing={this.state.refreshing}
                    ListHeaderComponent={this._headerPageComponent}
                />
            </View>
        );
    }

    private requestData(): void {
        // this.setState({refreshing: true});
        // this.requestMiddleRecommend();
    }

    /**
     * 中间的推荐位的请求
     */
    private requestMiddleRecommend(): void {
        FetchHelper.request(
            'https://raw.githubusercontent.com/FrewenWong/HelloReactNative/dev/src/resources/json/home_middle_recommend.json',
            {
                method: Method.GET,
            },
        )
            .then((response: any) => {
                Logger.log(TAG, `response = ${JSON.stringify(response)}`);

                this.setState({
                    recommendList: response.data,
                    refreshing: false,
                });
            })
            .catch((error: any) => {
                Logger.log(TAG, `error = ${error}`);
                this.setState({
                    refreshing: false,
                });
            });
    }

    /**
     * item的是一个实例对象：所以我们传入给Item布局的数据其实是item.item
     * { item: data(item的对象),
     *  index: 15,
     *   separators:
     *   { highlight: [Function: highlight],
     *     unhighlight: [Function: unhighlight],
     *     updateProps: [Function: updateProps] } }
     * @param item
     */
    private renderItem = (item: any) => {
        Logger.info(TAG, 'renderItem===', item.item);
        /**
         * ItemDemoFlatList最好使用React.PureComponent
         * 否则每次渲染的时候，都会将上面的Item进行重复渲染
         */
        return <HomeFlatList info={item.item} onPress={this.onCellSelected}/>;
        // return (
        //     <View>
        //         <Text>{2}</Text>
        //     </View>
        // );
    };

    /**
     * keyExtractor
     * (item: object, index: number) => string;
     * 此函数用于为给定的item生成一个不重复的key。
     * Key 的作用是使 React 能够区分同类元素的不同个体，
     * 以便在刷新时能够确定其变化的位置，减少重新渲染的开销。
     * 若不指定此函数，则默认抽取item.key作为 key 值。若item.key也不存在，则使用数组下标。
     * @param item  item: object 对应元素
     * @param index index: number 对应索引值
     * @private
     */
    private _keyExtractor = (item: any, index: number) => {
        Logger.info(TAG, '_keyExtractor===', item.toString());
        return item.toString();
    };

    /**
     * 头部组件,可以是ReactComponent,也可以是一个 render 函数，或者渲染好的 element。
     * @private
     */
    private _headerPageComponent = () => {
        return <CommonGridMenuView menuItems={menuInfos} onItemSelected={this.onGridMenuSelected}/>;
    };

    private onGridMenuSelected(index: number): void {
        ToastAndroid.show(String(index), 1000);
    }

    private requestFlatListData(): void {
        let dataList = recommend.data.map((info, index) => {
            return {
                id: info.id,
                imageUrl: info.squareimgurl,
                title: info.mname,
                subtitle: `[${info.range}]${info.title}`,
                price: info.price,
            };
        });
        Logger.log(TAG, `${JSON.stringify(dataList)}`);
        this.setState({
            recommendList: dataList,
            refreshing: false,
        });
    }

    onCellSelected = (info: Object) => {
        StatusBar.setBarStyle('default', false);
        this.props.navigation.navigate(stackRouter.SwipeRecommendShopPage.name, {info: info});
    };
}
