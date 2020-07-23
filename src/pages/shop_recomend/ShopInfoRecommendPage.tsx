import React from 'react';
import {BaseComponent} from '../../aura/base/BaseComponent';
import LinearGradient from 'react-native-linear-gradient';
import {Image, TouchableOpacity, Text} from 'react-native';
import ImageRes from '../../resources/images/ImageRes';

export interface ShopInfoRecommendPageState {
    isFullScreen: boolean;
}

export interface ShopInfoRecommendPageProps {
    /**
     * 店铺标签
     */
    label: string;
}

/**
 *
 */
export default class ShopInfoRecommendPage extends BaseComponent<any, any> {
    public render(): React.ReactElement {
        return (
            <LinearGradient colors={['#6328FF', '#5110D8']}>
                {/*TouchableOpacity*/}
                <TouchableOpacity
                    activeOpacity={1}
                    style={{
                        width: 47.14,
                        height: 10.29,
                        marginTop: 16.86,
                        marginLeft: 147.71,
                    }}>
                    {this._getShopRecommendTitle()}
                </TouchableOpacity>
            </LinearGradient>
        );
    }

    /**
     * 返回推荐店铺列表页面的Title布局
     * @private
     */
    private _getShopRecommendTitle(): React.ReactChild {
        return (
            <TouchableOpacity>
                <Image
                    style={{
                        width: 20.22,
                        height: 10.11,
                        marginTop: 6.94,
                    }}
                    source={ImageRes.shopInfo.shopTitleLineImg}
                />
                <Text
                    style={{
                        fontSize: 17.14,
                        color: '#ffffffff',
                    }}>
                    {'你还可以问我'}
                </Text>
                <Image
                    style={{
                        width: 20.22,
                        height: 10.11,
                        marginTop: 6.94,
                        marginLeft: 5.8,
                    }}
                    source={ImageRes.shopInfo.shopTitleLineImg}
                />
            </TouchableOpacity>
        );
    }
}
