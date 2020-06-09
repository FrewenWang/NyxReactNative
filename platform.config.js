// 路径分割线
const pathSep = require('path').sep;
const fs = require('fs');
// Module模块拆分映射文件
const moduleMapFile = './toolkits/metro/multi_bundle/platformNameMap.json';
// 获取ModuleID的方法
const getModuleId = require('./toolkits/metro/multi_bundle/getModulelId')
  .getModuleId;
// 使用递增Index来进行分包打包
const useIndex = require('./toolkits/metro/multi_bundle/getModulelId').useIndex;
let entry = 'platformEntry.js'; //打包的入口，保证UI打包和命令行打包使用同一个入口名称

function createModuleIdFactory() {
  //获取当前目录，__dirname是nodejs提供的变量
  const projectRootPath = __dirname;
  return (path) => {
    let name = getModuleId(projectRootPath, path, entry, false);
    if (useIndex !== true) {
      //存储基础包的js模块名，这个我们只在使用模块名打包时有用，我们存储platform的映射表Json
      // 使用递增序列时直接判断数字是否小于100000来判断是否时基础包
      const platformNameArray = require(moduleMapFile);
      if (!platformNameArray.includes(name)) {
        platformNameArray.push(name);
        fs.writeFileSync(moduleMapFile, JSON.stringify(platformNameArray));
      }
    }
    return name;
  };
}

module.exports = {
  serializer: {
    createModuleIdFactory: createModuleIdFactory,
    /* serializer options */
  },
};
