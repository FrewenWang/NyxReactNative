import {FlatList, View, Text, ViewProps, Platform} from "react-native";
import React from "react";
import {BaseComponent} from "../../../aura/base/BaseComponent";

interface FlatListState {

}

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
                    debug // 开启 debug 模式
                >
                </FlatList>

            </View>
        );
    }
}
