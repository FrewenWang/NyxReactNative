import React, {ReactChildren, ReactElement} from 'react';
import {BasePureComponent} from '../base/BasePureComponent';
import {Image, TouchableOpacity, View, ViewProps} from 'react-native';
import ImageRes from '../../resources/images/ImageRes';

interface RadiusButtonProps extends ViewProps {
    onPress: Function;
}

export default class RadiusButton extends BasePureComponent<RadiusButtonProps, any> {
    public render(): ReactElement {
        return (
            <TouchableOpacity>
                <View>
                    <Image style={[{width: 11.43, height: 12}]} source={ImageRes.main.iconExclamationMark} />
                </View>
            </TouchableOpacity>
        );
    }
}
