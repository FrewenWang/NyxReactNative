// 路径分割线
const pathSep = require('path').sep;
const fs = require('fs');
// Module模块拆分映射文件。这个文件的内容是怎么生成的？？
const moduleMapFile = './toolkits/metro/multi_bundle/platformNameMap.json';
// 获取ModuleID的方法
const getModuleId = require('./toolkits/metro/multi_bundle/getModulelId').getModuleId;
// 使用递增Index来进行分包打包
const useIndex = require('./toolkits/metro/multi_bundle/getModulelId').useIndex;
let entry = 'platformEntry.js'; //打包的入口，保证UI打包和命令行打包使用同一个入口名称
const TAG = 'metro.platform.config.js';

function createModuleIdFactory() {
    //获取当前目录，__dirname是nodejs提供的变量
    const projectRootPath = __dirname;
    return (path) => {
        console.log(TAG, '文件路径：' + path);
        let name = getModuleId(projectRootPath, path, entry, false);
        if (useIndex !== true) {
            //  存储基础包的js模块名，这个我们只在使用模块名打包时有用，我们存储platform的映射表Json
            //  使用递增序列时直接判断数字是否小于100000来判断是否时基础包
            const platformNameArray = require(moduleMapFile);
            /// 判断platformNameJson里面如果这个Name为空的话，则写入到platformNameJson文件中
            if (!platformNameArray.includes(name)) {
                platformNameArray.push(name);
                fs.writeFileSync(moduleMapFile, JSON.stringify(platformNameArray));
            }
        }
        console.log(TAG, '文件ModuleId：' + name);
        return name;
    };
}

/**
 * createModuleIdFactory: 这个函数传入的是你要打包的module文件的绝对路径返回的是这个module的id
 * processModuleFilter：  这个函数传入的是module信息，返回是boolean值，如果是false就过滤不打包
 *
 * 其实作用很明显：
 * 配置createModuleIdFactory让其每次打包都module们使用固定的id(路径相关)，
 * 配置processModuleFilter过滤基础包打出业务包
 * @type {{serializer: {createModuleIdFactory: (function(): function(*=): *)}}}
 */
module.exports = {
    serializer: {
        createModuleIdFactory: createModuleIdFactory,
        /* serializer options */
    },
};
