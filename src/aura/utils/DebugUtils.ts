/**
 * 忽略黄色警告条
 * 将这两句话加在index.js文件中，放在AppRegistry.registerComponent()方法前面
 * @constructor
 */
import {ToastAndroid} from 'react-native';
import Logger from './Logger';

const TAG = 'DebugUtils';

export function ignoreYellowWarning() {
  Logger.log(TAG, `Remove Warnings for DEBUG mode.`);
  ToastAndroid.show('调试模式中~~~~', 2000);
  // 关闭其中某些yellow警告
  console.ignoredYellowBox = [
    'Warning: BackAndroid is deprecated. Please use BackHandler instead.',
    'source.uri should not be an empty string',
    'Invalid props.style key',
  ];
  // 关闭全部yellow警告
  console.disableYellowBox = true;
}
