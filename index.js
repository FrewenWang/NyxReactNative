/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

// import OriginalApp from './src/samples/basic/OriginalApp';
// import App from './App';
// AppRegistry.registerComponent(appName, () => App);


// Redux的基础测试DemoRedux
import DemoRedux from './src/samples/redux/demo_redux';

AppRegistry.registerComponent(appName, () => DemoRedux);

