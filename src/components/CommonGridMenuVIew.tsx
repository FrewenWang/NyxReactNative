import React, {PureComponent} from 'react';
import {
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import ScreenDimensions from '../resources/dimensions/ScreenDimensions';
import ColorRes from '../resources/colors/ColorRes';
import PageControl from 'react-native-page-control';
import Logger from '../aura/utils/Logger';

/**
 * GridMenuVIewProps属性共有两个字段：
 */
export interface GridMenuVIewProps {
    menuItems: any[]; // 数据集合
    onItemSelected: Function; // Item选中时间
}

export interface GridMenuVIewState {
    currentPage: number;
}

const TAG = 'CommonGridMenuView';

/**
 * 这个是九宫格样式的GridView的Demo
 */
class CommonGridMenuView extends PureComponent<GridMenuVIewProps, GridMenuVIewState> {
    public constructor(props: GridMenuVIewProps) {
        super(props);
        // 初始化State
        this.state = {
            currentPage: 0,
        };
    }

    public render(): React.ReactChild {
        // 解构传入的属性
        let {menuItems, onItemSelected} = this.props;
        // 针对每个传入的Item进行逐个处理
        let menusView = menuItems.map((item: any, index) => {
            Logger.log(TAG, `${JSON.stringify(item)}`);
            <ItemGridMenuView
                title={item.title}
                icon={item.icon}
                onPressed={() => {
                    onItemSelected && onItemSelected(index);
                }}
            />;
        });

        let menuPageViews = [];
        let pageCount = Math.ceil(menusView.length / 10);

        for (let i = 0; i < pageCount; i++) {
            let items = menusView.slice(i * 10, i * 10 + 10);
            let menuView = (
                <View style={styles.itemsView} key={i}>
                    {items}
                </View>
            );
            menuPageViews.push(menuView);
        }
        return (
            <View style={styles.homeContainer}>
                {/*定义一个横向的ScrollView*/}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onScroll={(event) => this.onScroll(event)}>
                    <View style={styles.menuContainer}>{menuPageViews}</View>
                </ScrollView>

                <PageControl
                    style={styles.pageControl}
                    numberOfPages={pageCount}
                    currentPage={this.state.currentPage}
                    hidesForSinglePage
                    pageIndicatorTintColor="gray"
                    currentPageIndicatorTintColor={ColorRes.common.primary}
                    indicatorSize={{width: 8, height: 8}}
                />
            </View>
        );
    }

    private onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    }
}

export default CommonGridMenuView;

type ItemProps = {
    onPressed: Function;
    icon?: any;
    title?: string;
};

/**
 * GridView的Item布局
 */
class ItemGridMenuView extends PureComponent<ItemProps, any> {
    public render(): React.ReactChild {
        Logger.log(TAG, `ItemGridMenuView：${JSON.stringify(this.props)}`);

        return (
            // @ts-ignore
            <TouchableOpacity style={styles.itemContainer} onPress={this.props.onPressed}>
                {this.props.icon ? <Image source={this.props.icon} resizeMode="contain" style={styles.icon}/> : null}
                {this.props.title ? <Text>{this.props.title}</Text> : null}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    homeContainer: {
        backgroundColor: 'red',
    },
    menuContainer: {
        flexDirection: 'row',
        backgroundColor: 'blue',
        width: ScreenDimensions.width,
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
    },
});
