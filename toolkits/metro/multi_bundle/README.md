构建基础包：

```js
react-native bundle --platform android --dev false --entry-file ./toolkits/metro/multi_bundle/entry/platformEntry.js --bundle-output ./build/output/platform.android.bundle --assets-dest ./build/output/res/  --config ./metro.platform.config.js
```



构建业务包

```
react-native bundle --platform android --dev false --entry-file index.js --bundle-output ./build/output/index.android.bundle --assets-dest ./build/output/res/ --config ./metro.biz.config.js
```

