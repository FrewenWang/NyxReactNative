/**
 * 方法参数有装饰器
 * 给类中的方法添加装饰器。如果不理解属性描述符，先
 *
 * 方法参数装饰器会接收三个参数：
 *
 * 1、target:对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
 * 2、propertyKey：属性的名称。
 * 3、parameterIndex：参数数组中的位置。
 */

/**
 * 我们可以传递参数进来
 */
export function methodParamDecorator(target: any, propertyName: string, index: number) {
    console.log('methodParamDecorator', target, propertyName, index);
    // 为相应方法生成元数据键，以储存被装饰的参数的位置
    const metadataKey = `log_${propertyName}_parameters`;
    if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(index);
    } else {
        target[metadataKey] = [index];
    }
};
