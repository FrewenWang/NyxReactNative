/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */

import React, {PureComponent} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Heading2, Paragraph} from '../aura/widgets/AuraText';
import ColorRes from '../resources/colors/ColorRes';
import ScreenDimensions from '../resources/dimensions/ScreenDimensions';

export interface HomeFlatListData {
    imageUrl: string;
    title: string;
    subtitle: string;
    price: string;
}

let count = 0;
type Props = {
    info: HomeFlatListData;
    onPress: Function;
};

export default class HomeFlatList extends PureComponent<Props> {
    render() {
        let {info} = this.props;
        let imageUrl = info.imageUrl.replace('w.h', '160.0');
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.onPress(info)}>
                <Image source={{uri: imageUrl}} style={styles.icon} />
                <View style={styles.rightContainer}>
                    <Heading2>{info.title}</Heading2>
                    <Paragraph numberOfLines={0} style={{marginTop: 8}}>
                        {info.subtitle}
                    </Paragraph>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <Heading2 style={styles.price}>{info.price}元</Heading2>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: ScreenDimensions.onePixel,
        borderColor: ColorRes.common.borderColor,
        backgroundColor: 'white',
    },
    icon: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    rightContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 10,
    },
    price: {
        color: ColorRes.common.primary,
    },
});
