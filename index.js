/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

// import OriginalApp from './src/samples/basic/OriginalApp';
// import App from './App';
// AppRegistry.registerComponent(appName, () => App);


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


// DemeNavigation
import DemoNavigation from './src/samples/navigation/DemoNavigation';

AppRegistry.registerComponent(appName, () => DemoNavigation);

// import App from './src/samples/navigation/DemoDrawerNavigation';
//
// AppRegistry.registerComponent(appName, () => App);
