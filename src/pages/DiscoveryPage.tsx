import React from "react";
import {FlatList, Image, Text, View, ViewProps} from "react-native";
import {BaseComponent} from "../aura/base/BaseComponent";
import Logger from "../aura/utils/Logger";
import {DiscoveryStyles} from "../resources/styles";
import ColorRes from "../resources/colors/ColorRes";

export interface DiscoveryPageState {
    dataSource: Array<{ id: number, src: string }>;
}

export default class DiscoveryPage extends BaseComponent<ViewProps, DiscoveryPageState> {
    private readonly navigation: any;

    constructor(props: ViewProps) {
        super(props);
        // @ts-ignore
        this.navigation = this.props.navigation;
        Logger.info(this.TAG, `navigation = ${this.navigation}`);
        this.state = {
            dataSource: [],
        }
    }

    public componentDidMount(): void {
        super.componentDidMount();
        const that = this;
        let items = Array.apply(null, Array(60)).map((v, k) => {
            return {
                id: k,
                src: 'http://placehold.it/200x200?text=' + (k + 1)
            }
        });

        that.setState({
            // @ts-ignore
            dataSource: items,
        });
    }

    public render(): React.ReactNode {
        return (
            <View style={DiscoveryStyles.MainContainer}>
                <FlatList
                    ListFooterComponent={this.renderFooter}
                    data={this.state.dataSource}
                    renderItem={this.renderItem}
                    //Setting the number of column
                    numColumns={3}
                    // keyExtractor={(item: { id: number, src: string }, index: number) => item.id}
                >

                </FlatList>
            </View>
        );
    }

    public renderItem = (item: { id: number, src: string }) => {
        Logger.info(this.TAG, `id = ${item.id},src = ${item.src}`);
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                margin: 1,
                backgroundColor: ColorRes.common.chatBrandBgColor
            }}>
                <Image style={DiscoveryStyles.imageThumbnail} source={{uri: item.src}}/>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 13,
                        position: 'absolute',
                        bottom: -6
                    }}
                    numberOfLines={1}
                >{item.id}
                </Text>
            </View>
        );
    }

    private renderFooter = () => {
        return (
            <View key={'sorry'} style={DiscoveryStyles.flowNoMoreBox}>
                <View style={DiscoveryStyles.flowNoMoreBoxEmbed}>
                    <Text style={DiscoveryStyles.flowNoMoreText} numberOfLines={1}>
                        抱歉，没有更多数据啦~
                    </Text>
                </View>
            </View>
        );
    };
}
