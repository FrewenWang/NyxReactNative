/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {ignoreYellowWarning} from './src/aura/utils/DebugUtils';
// 移除调试模式的警告
ignoreYellowWarning();

import App from './App';
AppRegistry.registerComponent(appName, () => App);


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


// DemoNavigation
// import DemeNavigation from './src/samples/navigation/DemoNavigation';
//
// AppRegistry.registerComponent(appName, () => DemeNavigation);

// import App from './src/samples/navigation/DemoDrawerNavigation';
//
// AppRegistry.registerComponent(appName, () => App);
