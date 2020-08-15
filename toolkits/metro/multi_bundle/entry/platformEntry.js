/**
 * 因为 metro 的配置可以将依赖进行分离，
 * 所以首先将需要打包到 platform.bundle 中的代码引入到一个文件中：
 */
import 'react';
import 'react-native';
import React, {Component} from 'react';
import {AppRegistry, DeviceEventEmitter, View, Platform} from 'react-native';
