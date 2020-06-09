const pathSep = require('path').sep;
//是否使用递增的数字作为模块的id，如果为false则使用模块相对的路径名作为模块id
const useIndex = true;
let curPlatformModuleId = -100; //基础包ModuleId
let curBizModuleId = -100; //业务包ModuleId
let baseModuleIdMap = [];
let bizModuleIdMap = [];
const fs = require('fs');
let baseMappingPath;
let bizMappingPath;

/**
 * 通过自增长的index来确定moduleID，优点是能使用RamBundle且减小了bundle包的大小，隐藏了模块路径，提升安全性，
 * 缺点是需要保存和依赖已经打包进去的模块的路径和id的对应信息，需要注意打包顺序和重复依赖的打包模块
 * projectRootPath:工程目录
 * path:js模块路径
 * entry:打包的入口
 * isBiz:是否是业务包
 * */
function getModuleIdByIndex(projectRootPath, path, entry, isBiz) {
  // 获取根据ID来进行分包的ID配置Json
  const moduleIdConfig = require('./moduleIdConfig.json');
  if (curPlatformModuleId == -100) {
    curPlatformModuleId = -1; //基础包的Module都是从0开始的
  }

  // 根据ID进行多Bundle分包的映射地址
  if (baseMappingPath == null) {
    baseMappingPath = __dirname + pathSep + 'platformIDMap.json';
  }
  if (baseModuleIdMap.length == 0) {
    if (fs.existsSync(baseMappingPath)) {
      baseModuleIdMap = require(baseMappingPath);
      if (baseModuleIdMap.length != 0) {
        // 如果映射文件里面的映射数据不为空，那么按照已经存在的ID开始计算后续ID
        curPlatformModuleId = baseModuleIdMap[baseModuleIdMap.length - 1].id;
      }
    }
  }

  // 业务模块的的映射文件计算
  if (isBiz) {
    if (bizMappingPath == null) {
      bizMappingPath =
        __dirname + pathSep + entry.replace('.js', '') + 'IDMap.json';
    }
    if (bizModuleIdMap.length == 0) {
      if (fs.existsSync(bizMappingPath)) {
        bizModuleIdMap = require(bizMappingPath);
        // 设置当前的ModuleID为映射表的最后一个ID
        curBizModuleId = bizModuleIdMap[bizModuleIdMap.length - 1].id;
      } else if (curBizModuleId == -100) {
        //根据业务包moduleID的配置取初始moduleId。如果从来没有生成果映射文件
        // 则使用我们配置的开始ID
        curBizModuleId = moduleIdConfig[entry] - 1;
      }
    }
  }
  // 相对路径
  let pathRelative = null;
  if (path.indexOf(projectRootPath) == 0) {
    pathRelative = path.substr(projectRootPath.length + 1);
  }
  const findPlatformItem = baseModuleIdMap.find((value) => {
    return value.path == pathRelative;
  });
  const findBizItem = bizModuleIdMap.find((value) => {
    return value.path == pathRelative;
  });
  if (findPlatformItem) {
    return findPlatformItem.id;
  } else if (findBizItem) {
    return findBizItem.id;
  } else {
    if (!isBiz) {
      //创建平台基础包的映射文件
      curPlatformModuleId = ++curPlatformModuleId;
      baseModuleIdMap.push({id: curPlatformModuleId, path: pathRelative});
      fs.writeFileSync(baseMappingPath, JSON.stringify(baseModuleIdMap));
      return curPlatformModuleId;
    } else {
      //创建业务包业务包
      curBizModuleId = ++curBizModuleId;
      bizModuleIdMap.push({id: curBizModuleId, path: pathRelative});
      fs.writeFileSync(bizMappingPath, JSON.stringify(bizModuleIdMap));
      return bizModuleIdMap;
    }
  }
}

/**
 * 根据模块路径返回moduleId，
 * 优点是简单且确保唯一，缺点是无法使用RamBundle打包方式
 **/
function getModuleIdByName(projectRootPath, path) {
  console.log('getModuleIdByName', `projectRootPath ： ${projectRootPath}`);
  console.log('getModuleIdByName', `path ： ${path}`);
  let name = '';
  if (
    path.indexOf(
      'node_modules' +
        pathSep +
        'react-native' +
        pathSep +
        'Libraries' +
        pathSep,
    ) > 0
  ) {
    name = path.substr(path.lastIndexOf(pathSep) + 1);
  } else if (path.indexOf(projectRootPath) == 0) {
    name = path.substr(projectRootPath.length + 1);
  }
  name = name.replace('.js', '');
  name = name.replace('.png', '');
  let regExp =
    pathSep == '\\' ? new RegExp('\\\\', 'gm') : new RegExp(pathSep, 'gm');
  name = name.replace(regExp, '_'); //把path中的/换成下划线
  return name;
}

/**
 *获取ModuleID
 * @param projectRootPath  工程目录
 * @param path             分包路径
 * @param entry            入口文件
 * @param isBiz            是否是业务代码
 * @returns {string|number}
 */
function getModuleId(projectRootPath, path, entry, isBiz) {
  if (useIndex) {
    return getModuleIdByIndex(projectRootPath, path, entry, isBiz);
  }
  return getModuleIdByName(projectRootPath, path);
}

/**
 * 导出getModuleId方法，和useIndex的标志变量
 * @type {{getModuleId: getModuleId, useIndex: boolean}}
 */
module.exports = {getModuleId, useIndex};
