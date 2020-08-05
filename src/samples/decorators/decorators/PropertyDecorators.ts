/**
 * 属性装饰器
 * 属性装饰器表达式会在运行时当作函数被调用，由定义知道，传入2个参数：
 * target：对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
 * propertyKey：属性的名称。没有返回值。
 */

/**
 * 我们可以传递参数进来
 *
 * TODO 好像没有生效
 * @param param  传入默认的参数
 */
export function propertyCommonDecorator(value: string) {
    return function (target: any, propertyName: string) {
        console.log('propertyCommonDecorator', value, target, propertyName);
        target[propertyName] = value;
    };
}

/**
 * TODO 好像也没有生效
 * @param value
 */
export function propertyDecoratorByDescriptor(value: string) {
    return function (target: any, propertyName: string) {
        let descriptor = Object.getOwnPropertyDescriptor(target, propertyName);

        Object.defineProperty(target, propertyName, {
            ...descriptor,
            value,
        });
    };
}
