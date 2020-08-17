/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {ignoreYellowWarning} from './src/aura/utils/DebugUtils';
// 移除调试模式的警告
ignoreYellowWarning();

// 初始化的APP入口
// import App from './src/samples/basic/OriginalApp';

// Redux的基础测试DemoRedux
// import DemoRedux from './src/samples/redux/demo_redux';
//
// AppRegistry.registerComponent(appName, () => DemoRedux);

// Redux的基础测试DemoRedux
// import DemoMobx from './src/samples/mobx/DemoMobx';
//
// AppRegistry.registerComponent(appName, () => DemoMobx);

// Redux的基础测试DemoRedux
// import DemoFlatList from './src/samples/basic/list/DemoFlatList';
//
// AppRegistry.registerComponent(appName, () => DemoFlatList);

// Redux的基础测试DemoRedux
// import DemoTimeoutManager from './src/samples/basic/DemoTimeoutManager';
//
// AppRegistry.registerComponent(appName, () => DemoTimeoutManager);

//ReactNative的Navigation DemoNavigation
// import App from './src/samples/navigation/DemoNavigation';

// import App from './src/samples/vectorIcons/DemoVectorIcons';

// import App from './src/samples/decorators/DemoDecorators';

import App from './src/samples/basic/DemoModal';

// import App from './App';

console.log('HelloReactNative', 'Enter App');
AppRegistry.registerComponent(appName, () => App);
