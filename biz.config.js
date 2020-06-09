// 路径分割线
const pathSep = require('path').sep;
const fs = require('fs');
// Module模块拆分映射文件
const platformModuleMapFile =
  './toolkits/metro/multi_bundle/platformNameMap.json';
// 获取ModuleID的方法
const getModuleId = require('./toolkits/metro/multi_bundle/getModulelId')
  .getModuleId;
// 使用递增Index来进行分包打包
const useIndex = require('./toolkits/metro/multi_bundle/getModulelId').useIndex;

//打包的入口，保证UI打包和命令行打包使用同一个入口名称
let entry;

/**
 * 创建ModuleID
 * @returns {function(*=): *}
 */
function createModuleIdFactory() {
  //获取当前目录，__dirname是nodejs提供的变量
  const projectRootPath = __dirname;
  return (path) => {
    let name = getModuleId(projectRootPath, path, entry, true);
    return name;
  };
}

function postProcessModulesFilter(module) {
  //console.log('postProcessModulesFilter', module);
  const projectRootPath = __dirname;
  if (platformModuleMapFile == null || platformModuleMapFile.length == 0) {
    console.log('请先打基础包');
    process.exit(1);
    return false;
  }
  const path = module['path'];
  //业务包的打包配置和platform.bundle
  // 非常类似，有一点不同在于，打包到platform.bundle中的依赖需要在业务包打包的时候进行过滤，
  // 否则在进行业务包下发的时候会导致业务包体积过大。
  if (
    path.indexOf('__prelude__') >= 0 ||
    path.indexOf('/node_modules/react-native/Libraries/polyfills') >= 0 ||
    path.indexOf('source-map') >= 0 ||
    path.indexOf('/node_modules/metro/src/lib/polyfills/') >= 0
  ) {
    return false;
  }
  //
  if (module['path'].indexOf(pathSep + 'node_modules' + pathSep) > 0) {
    if (
      'js' + pathSep + 'script' + pathSep + 'virtual' ==
      module['output'][0]['type']
    ) {
      return true;
    }
    const name = getModuleId(projectRootPath, path);
    if (useIndex && name < 100000) {
      //这个模块在基础包已打好，过滤
      return false;
    } else if (useIndex !== true && platformModuleMapFile.includes(name)) {
      //使用模块名作为模块id的逻辑
      return false;
    }
  }
  return true;
}

function getModulesRunBeforeMainModule(entryFilePath) {
  console.log('entryFilePath', entryFilePath);
  entry = entryFilePath;
  return [];
}

module.exports = {
  serializer: {
    createModuleIdFactory: createModuleIdFactory,
    processModuleFilter: postProcessModulesFilter,
    getModulesRunBeforeMainModule: getModulesRunBeforeMainModule,
    /* serializer options */
  },
};
