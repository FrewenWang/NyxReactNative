MobX开源项目引入



### 使用步骤

```
npm insatall mobx --save
npm insatall mobx-react --save
```



安装mobx后，会报装饰器的错误，通过

```
npm install babel-plugin-transform-decorators-legacy --save-dev
npm install @babel/plugin-proposal-decorators --save-dev
```

并在package.json中添加：

```
"babel": {
    "plugins":[
      ["@babel/plugin-proposal-decorators", {"legacy":true}],
      ["@babel/plugin-proposal-class-properties", {"loose":true}]
    ]
  }
```







