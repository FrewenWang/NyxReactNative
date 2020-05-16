/**
 * 忽略黄色警告条
 * 将这两句话加在index.js文件中，放在AppRegistry.registerComponent()方法前面
 * @constructor
 */
export default function IgnoreYellowWarning() {
    return function () {
        console.ignoredYellowBox = [
            'Warning: BackAndroid is deprecated. Please use BackHandler instead.',
            'source.uri should not be an empty string',
            'Invalid props.style key',
        ];
        // 关闭全部黄色警告
        console.disableYellowBox = true;
    }
}
