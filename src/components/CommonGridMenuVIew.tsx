import React, {PureComponent, ReactChild} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ScreenDimensions from "../resources/dimensions/ScreenDimensions";

/**
 * GridMenuVIewProps属性共有两个字段：
 */
export interface GridMenuVIewProps {
    menuItems: any[],  // 数据集合
    onItemSelected: Function  // Item选中时间
}

export interface GridMenuVIewState {
    currentPage: number
}


class CommonGridMenuView extends PureComponent<GridMenuVIewProps, GridMenuVIewState> {

    public constructor(props: GridMenuVIewProps) {
        super(props)
        // 初始化State
        this.state = {
            currentPage: 0
        }
    }

    public render(): React.ReactChild {
        let {menuItems, onItemSelected} = this.props;
        let menus = menuItems.map((item: any, index) => {
            <ItemGridMenuView
                key={item.title}
                title={item.title}
                icon={item.icon}
                onPressed={() => {
                    onItemSelected && onItemSelected(index)
                }}
            />
        });

        let menuViews = [];
        let pageCount = Math.ceil(menuItems.length / 10);

        for (let i = 0; i < pageCount; i++) {
            let items = menuItems.slice(i * 10, i * 10 + 10)

            let menuView = (
                <View style={styles.itemsView} key={i}>
                    {items}
                </View>
            )
            menuViews.push(menuView)
        }

        return <Text>你好</Text>;
    }
}

export default CommonGridMenuView;

type ItemProps = {
    onPressed: Function,
    icon: any,
    title: string,
}

/**
 * GridView的Item布局
 */
class ItemGridMenuView extends PureComponent<ItemProps, any> {

    public render(): React.ReactChild {
        return (
            <TouchableOpacity style={styles.itemContainer}
                              onPress={this.props.onPressed}>
                <Image source={this.props.icon} resizeMode='contain' style={styles.icon}/>
                <Text>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    homeContainer: {
        backgroundColor: 'white',
    },
    menuContainer: {
        flexDirection: 'row',
    },
    itemsView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: ScreenDimensions.width,
    },
    pageControl: {
        margin: 10,
    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: ScreenDimensions.width / 5,
        height: ScreenDimensions.width / 5,
    },
    icon: {
        width: ScreenDimensions.width / 9,
        height: ScreenDimensions.width / 9,
        margin: 5,
    }
});
