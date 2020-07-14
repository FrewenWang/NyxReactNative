import {Dimensions, PixelRatio, StatusBar} from 'react-native';
import {isIOS, isIPhoneX, isIPhoneXR, overAndroid5} from '../../aura/utils/DeviceUtils';

const window = Dimensions.get('window');

export default {
    /**
     * TODO 目前的计算不准，我的548，计算为500
     */
    width: window.width,
    height: window.height,
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
