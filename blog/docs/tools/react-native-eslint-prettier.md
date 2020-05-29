使用ESLint+Prettier来统一前端代码风格

文章参考：https://juejin.im/post/5b27a326e51d45588a7dac57

文章参考：https://github.com/syanbo/blog/issues/3

文章参考：https://www.cnblogs.com/qiqi715/p/10247598.html


ESLint 可以对你代码进行检查
Prettier 代码格式化工具，能够统一你或者团队的代码风格（酷爱）
Pre-commit Hook 在代码进行Git提交的时候进行格式化，如果有错误并终止push

安装依赖插件
```shell script
yarn add -D babel-eslint
yarn add -D eslint
yarn add -D eslint-config-prettier
yarn add -D eslint-config-react-app
yarn add -D eslint-plugin-import
yarn add -D eslint-plugin-jsx-a11y
yarn add -D eslint-plugin-flowtype
yarn add -D eslint-plugin-prettier
yarn add -D eslint-plugin-react
yarn add -D husky
yarn add -D lint-staged
yarn add -D pretty-quick
yarn add -D prettier
```

#### 添加.eslintrc文件
```javascript
module.exports = {
    root: true,
    extends: '@react-native-community',
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', "prettier"],
    rules: {
        "prettier/prettier": "error",
        "no-undef": 0,
        "no-useless-constructor": 0
    },
    extends: [
        'standard', //使用standard做代码规范
        "prettier",
        "react-app",
        "plugin:prettier/recommended"
    ],
};
```

#### 添加scripts配置命令



#### 添加Prettier配置

添加prettier.js。根据自己的喜好，配置prettier的格式化配置
```javascript
module.exports = {
    "printWidth": 80, //一行的字符数，如果超过会进行换行，默认为80
    "tabWidth": 2, //一个tab代表几个空格数，默认为80
    "useTabs": false, //是否使用tab进行缩进，默认为false，表示用空格进行缩减
    "singleQuote": true, //字符串是否使用单引号，默认为false，使用双引号
    "semi": true, //行位是否使用分号，默认为true
    "trailingComma": "none", //是否使用尾逗号，有三个可选值"<none|es5|all>"
    "bracketSpacing": true, //对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
    "parser": "babylon" //代码的解析引擎，默认为babylon，与babel相同。
}
```


