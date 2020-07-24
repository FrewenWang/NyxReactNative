import React from 'react';
import {
    ImageBackground,
    LayoutChangeEvent,
    LayoutRectangle,
    Text,
    View,
    Animated,
    PanResponder,
    PanResponderInstance,
} from 'react-native';
import {BaseComponent} from '../../aura/base/BaseComponent';
/**
 * 只有路由导航的根页面需要调用这个NavigationPageProps
 */
import NavigationPageProps from '../../navigation/NavigationPageProps';
import ScreenDimensions from '../../resources/dimensions/ScreenDimensions';
import ImageRes from '../../resources/images/ImageRes';
import Logger from '../../aura/utils/Logger';
import ShopInfoRecommendPage from './ShopInfoRecommendPage';

/**
 * 可以滑动的下方带有推荐列表的店铺页面
 * 具体效果：
 */
const TAG = 'SwipeRecommendShopPage';
export default class SwipeRecommendShopPage extends BaseComponent<NavigationPageProps, any> {
    private floatAnimTop: Animated.Value;
    private _panResponder?: PanResponderInstance;

    constructor(props: NavigationPageProps) {
        super(props);

        // 底部的悬浮窗的距离顶部的布局
        this.floatAnimTop = new Animated.Value(ScreenDimensions.height);

        this._initPanResponder();
    }

    private _initPanResponder() {
        /**
         * https://reactnative.dev/docs/panresponder
         */
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return true;
            },
            onPanResponderGrant: () => {},
            onPanResponderMove: () => {},
            onPanResponderRelease: () => {},
        });
    }

    public render(): React.ReactElement {
        // @ts-ignore
        return (
            <ImageBackground
                style={{
                    width: ScreenDimensions.width,
                    opacity: 1.0,
                    height: '100%',
                }}
                source={ImageRes.main.bgImage}>
                {this._getMainContent()}
            </ImageBackground>
        );
    }

    /**
     * 获取获取主布局
     * @private
     */
    private _getMainContent(): React.ReactChild {
        return (
            <View
                onLayout={(event: LayoutChangeEvent) => {
                    this.calculateLayout(event.nativeEvent);
                }}>
                {this._getQuestionView()}
                {this._getMainChopInfoAnimView()}
            </View>
        );
    }

    /**
     * calculateLayout进行Layout布局
     * @param nativeEvent
     */
    private calculateLayout(nativeEvent: {layout: LayoutRectangle}) {
        if (nativeEvent) {
            Logger.log(TAG, `calculateLayout Layout height: ${nativeEvent.layout.height} , Y: ${nativeEvent.layout.y}`);
        }
    }

    /**
     * 获取下方店铺详情页的主体布局
     * @private
     */
    private _getMainChopInfoAnimView(): React.ReactElement {
        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    width: '100%',
                    top: this.floatAnimTop,
                    bottom: 0,
                }}
                {...this._panResponder?.panHandlers}>
                <ShopInfoRecommendPage></ShopInfoRecommendPage>
            </Animated.View>
        );
    }

    /**
     * 问题布局
     * @private
     *
     * alignSelf:
     * alignSelf决定了元素在父元素的次轴方向的排列方式（此样式设置在子元素上），
     * 其值会覆盖父元素的alignItems的值。其表现和 CSS 上的align-self一致（默认值为 auto）。
     * 其值：enum('auto(自动)', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline')
     */
    private _getQuestionView(): React.ReactElement {
        return (
            <View>
                <Text
                    style={{
                        alignSelf: 'flex-end',
                        fontSize: 13.1,
                        textAlign: 'right',
                        color: 'white',
                        marginRight: 20,
                        marginTop: 50.8,
                    }}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}>
                    你好，你想吃什么？
                </Text>
            </View>
        );
    }
}
