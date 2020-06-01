import {StyleSheet} from 'react-native';
import ColorRes from '../colors/ColorRes';
import ScreenDimensions from "../dimensions/ScreenDimensions";

export const RecommendStyles = StyleSheet.create({
    uiDemosHeader: {
        height: 35,
        justifyContent: 'center',
        borderWidth: ScreenDimensions.onePixel,
        borderColor: ColorRes.common.borderColor,
        paddingVertical: 8,
        paddingLeft: 20,
        backgroundColor: 'white'
    },
});
