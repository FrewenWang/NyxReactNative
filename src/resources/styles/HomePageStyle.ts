import {StyleSheet} from 'react-native';
import ScreenDimensions from '../dimensions/ScreenDimensions';
import ColorRes from '../colors/ColorRes';

export const HomeStyles = StyleSheet.create({
    topSearch: {
        width: ScreenDimensions.width * 0.7,
        height: 30,
        borderRadius: 19,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: ColorRes.common.white,
    },
    flowNoMoreBox: {
        flexDirection: 'row',
        height: 60,
        marginTop: 10,
        marginBottom: 80,
        padding: 10,
        backgroundColor: 'rgba(39,62,136,1)',
        borderRadius: 9,
    },
    flowNoMoreBoxEmbed: {
        flexDirection: 'column',
        flex: 1,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flowNoMoreText: {
        fontSize: 13,
        color: 'white',
        fontWeight: 'bold',
    },
});
