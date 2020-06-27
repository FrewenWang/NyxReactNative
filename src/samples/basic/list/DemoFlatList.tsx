import {ActivityIndicator, FlatList, RefreshControl, Text, View, ViewProps} from 'react-native';
import React from 'react';
import {BaseComponent} from '../../../aura/base/BaseComponent';
import ItemDemoFlatList from './ItemDemoFlatList';
import ColorRes from '../../../resources/colors/ColorRes';
import Logger from '../../../aura/utils/Logger';

interface FlatListState {
    isLoading: boolean;
    data: any[];
}

const TAG = 'FlatListDemo';
/**
 *
 * 关于FlatList的学习：https://reactnative.cn/docs/flatlist
 */
export default class FlatListDemo extends BaseComponent<ViewProps, FlatListState> {
    /**
     * FlatList的原始数据
     */
    private originData: any[] = [];

    constructor(props: ViewProps) {
        super(props);
        for (let i = 0; i < 50; i++) {
            this.originData.push(i);
        }
        this.state = {
            isLoading: false,
            data: this.originData,
        };
    }

    /**
     * item的是一个实例对象：所以我们传入给Item布局的数据其实是item.item
     * { item: 15,
     *  index: 15,
     *   separators:
     *   { highlight: [Function: highlight],
     *     unhighlight: [Function: unhighlight],
     *     updateProps: [Function: updateProps] } }
     * @param item
     */
    private renderItem = (item: any) => {
        Logger.info(TAG, 'renderItem', item.item);
        return <ItemDemoFlatList data={item.item} />;
        // return (
        //     <View>
        //         <Text>{item.item}</Text>
        //     </View>
        // );
    };

    private _getItemLayout = (item: any, index: number) => {
        return {length: 200, offset: 200, index};
    };
    /**
     * keyExtractor
     * (item: object, index: number) => string;
     * 此函数用于为给定的 item 生成一个不重复的 key。
     * Key 的作用是使 React 能够区分同类元素的不同个体，
     * 以便在刷新时能够确定其变化的位置，减少重新渲染的开销。
     * 若不指定此函数，则默认抽取item.key作为 key 值。若item.key也不存在，则使用数组下标。
     * @param item  item: object 对应元素
     * @param index index: number 对应索引值
     * @private
     */
    private _keyExtractor = (item: {num: number}, index: number) => {
        return index.toString();
    };

    /**
     * FlatList的属性解析：
     * https://reactnative.cn/docs/flatlist
     * removeClippedSubviews：对于大列表启用本属性可能可以提高性能。在android上此项默认启用。
     *                         注意：有些情况下会有 bug（比如内容无法显示，比如使用LayoutAnimation）。请谨慎使用。
     * initialNumToRender：一开始渲染的元素数量。我们最好将这个数量调整为整个屏幕元素的个数。
     *                     这样能保证在最短的时间内给用户呈现课件的内容。注意这第一批组件渲染的元素不会再滑动过程中被卸载。
     *                     这样能保证用户执行返回顶部操作时候，不会重新渲染
     * keyExtractor：此函数用户为给指定的Item生成一个不重复的Key。Key的作用是使React能够区分同类元素的不同个体
     *               以便在刷新时能够确定其变化的位置，减少重新渲染的开销，如果不指定这个函数，则默认抽取Item.key.
     *               若Item.key也不存在，则使用数组下标
     *ItemSeparatorComponent：行与行之间的分割线，不会出现在第一行之前和左后一行之后
     *columnWrapperStyle:如果设置了多列布局（即numColumns={2} 大于1）则可以额外指定此样式在每行的容器
     *getItemLayout：是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道Item的高度。
     *              如果你的行高是固定的，getItemLayout用起来既高效又简单
     */
    public render(): React.ReactNode {
        Logger.log(TAG, '===========FlatListDemo render================');
        return (
            <View style={{flex: 1}}>
                <FlatList
                    ItemSeparatorComponent={() => (
                        <View
                            style={{
                                height: 1,
                                backgroundColor: ColorRes.common.black,
                            }}
                        />
                    )}
                    data={this.state.data}
                    renderItem={(item) => this.renderItem(item)}
                    // getItemLayout={this._getItemLayout}
                    initialNumToRender={1} // 一开始渲染的元素数量。我们最好将这个数量调整为整个屏幕元素的个数。
                    windowSize={1} // 渲染区域高度
                    removeClippedSubviews={true} //是否裁剪子视图，或者只在Android平台：Platform.OS === 'android'
                    maxToRenderPerBatch={10} // 增量渲染最大数量
                    updateCellsBatchingPeriod={50} // 增量渲染时间间隔
                    keyExtractor={this._keyExtractor}
                    numColumns={2} // 多列布局只能在非水平模式下使用，即必须是horizontal={false}
                    // columnWrapperStyle={{alignContent: true, color: "red"}}
                    // debug // 开启 debug 模式
                    // horizontal={true} // 开始水平布局方法，默认为false
                    ListEmptyComponent={this._emptyPageComponent}
                    ListHeaderComponent={this._headerPageComponent}
                    ListFooterComponent={this._footerPageComponent}
                    onEndReached={this._onEndReached}
                    // refreshing={this.state.isLoading}
                    // onRefresh={this._onRefresh} //如果提供，将为“拉动刷新”功能添加标准的RefreshControl。确保还正确设置了刷新道具
                    // 不使用上面默认的下拉刷新的样式，我们可以自定义一个下拉刷新组件
                    refreshControl={
                        <RefreshControl
                            title={'页面刷新中'} //只在iOS有用
                            progressBackgroundColor={'orange'}
                            colors={['red']}
                            refreshing={this.state.isLoading}
                            titleColor={'red'}
                            onRefresh={this._onRefresh}></RefreshControl>
                    }></FlatList>
            </View>
        );
    }

    /**
     * 列表为空时渲染该组件。可以是 React Component, 也可以是一个 render 函数，或者渲染好的 element。
     * @private
     */
    private _emptyPageComponent = () => {
        return <Text>没有数据哦</Text>;
    };

    /**
     * 头部组件,可以是 React Component, 也可以是一个 render 函数，或者渲染好的 element。
     * @private
     */
    private _headerPageComponent = () => {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 120,
                    backgroundColor: ColorRes.common.chatBrandBgColor,
                }}>
                <Text style={{color: ColorRes.common.white}}>头部组件</Text>
            </View>
        );
    };

    /**
     * 尾部组件。可以是 React Component, 也可以是一个 render 函数，或者渲染好的 element。
     * @private
     */
    private _footerPageComponent = () => {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 120,
                    backgroundColor: ColorRes.common.chatBrandBgColor,
                }}>
                <ActivityIndicator size={'large'} animating={true} color={'red'} />
                <Text style={{color: ColorRes.common.white}}>正在上拉加载中</Text>
            </View>
        );
    };

    private _onRefresh = () => {
        Logger.info(TAG, '_onRefresh Called');
        this.refreshData();
    };

    private _onEndReached = () => {
        Logger.info(TAG, '_onEndReached Called');
        this.loadMoreData();
    };

    private loadMoreData(): void {
        /// 执行一个2秒的延迟任务，模拟异步加载数据
        setTimeout(() => {
            let dataArray = [];
            dataArray = this.state.data.concat(this.originData);
            this.setState({
                isLoading: false,
                data: dataArray,
            });
        }, 2000);
    }

    /**
     * 进行数据的刷新
     */
    private refreshData(): void {
        this.setState({
            isLoading: true,
        });
        /// 执行一个2秒的延迟任务，模拟异步加载数据
        setTimeout(() => {
            let dataArray = [];
            for (let i = this.state.data.length - 1; i >= 0; i--) {
                dataArray.push(this.state.data[i]);
            }
            this.setState({
                isLoading: false,
                data: dataArray,
            });
        }, 2000);
    }
}
