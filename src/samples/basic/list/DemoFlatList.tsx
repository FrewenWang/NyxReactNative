import {FlatList, View, Text, ViewProps, Platform} from "react-native";
import React from "react";
import {BaseComponent} from "../../../aura/base/BaseComponent";

interface FlatListState {

}

/**
 * 关于FlatList的学习：https://reactnative.cn/docs/flatlist
 */
export default class FlatListDemo extends BaseComponent<ViewProps, FlatListState> {
    private data: number[] = [];


    constructor(props: ViewProps) {
        super(props);
        for (let i = 0; i < 1000; i++) {
            this.data.push(i);
        }
    }

    renderItem = (item: { index: number; }) => {
        return (
            <Text
                style={{
                    backgroundColor: item.index % 2 === 0 ? 'orange' : 'white',
                }}>
                {'第 ' + (item.index + 1) + ' 个'}
            </Text>
        );
    }
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
    private _keyExtractor = (item: { index: number; }, index: number) => item.id;


    public render(): React.ReactNode {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={this.data}
                    renderItem={this.renderItem}
                    initialNumToRender={3} // 首批渲染的元素数量
                    windowSize={1} // 渲染区域高度
                    removeClippedSubviews={true} //是否裁剪子视图，或者只在Android平台：Platform.OS === 'android'
                    maxToRenderPerBatch={10} // 增量渲染最大数量
                    updateCellsBatchingPeriod={50} // 增量渲染时间间隔
                    keyExtractor={this._keyExtractor}
                    numColumns={3}  // 多列布局只能在非水平模式下使用，即必须是horizontal={false}
                    debug // 开启 debug 模式
                >
                </FlatList>

            </View>
        );
    }
}
