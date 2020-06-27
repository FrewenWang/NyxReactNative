import {Dimensions, PixelRatio, StatusBar} from 'react-native';
import {isIOS, isIPhoneX, isIPhoneXR, overAndroid5} from '../../aura/utils/DeviceUtils';

export default {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    onePixel: 1 / PixelRatio.get(),
    /**
     * StatusBar高度
     */
    statusBarHeight: isIOS ? (isIPhoneX || isIPhoneXR ? 44 : 20) : overAndroid5 ? StatusBar.currentHeight : 0,
    /**
     * 导航栏高度
     */
    navBarHeight: isIOS ? 44 : px2dp(88),
};
