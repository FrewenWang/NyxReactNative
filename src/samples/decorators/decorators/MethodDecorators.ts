/**
 * 方法装饰器
 * 给类中的方法添加装饰器。如果不理解属性描述符，先
 *
 * 方法装饰器接受三个参数：
 * 1、target:对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
 * 2、propertyKey：属性的名称。
 * 3、descriptor：方法的属性描述符。
 */

/**
 * 我们可以传递参数进来
 */
export function methodCommonDecorator(value: string) {
    return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
        console.log('methodCommonDecorator', value, target, propertyName, descriptor);
        /// 被装饰的函数
        const method = descriptor.value;
        descriptor.value = function (...args: any[]) {
            let start = new Date().valueOf();

            args = args.map((arg) => String(arg));

            console.log('参数args == ' + args);

            try {
                return method.apply(this, args);
            } catch (e) {
            } finally {
                let end = new Date().valueOf();
                console.log(`start: ${start} end: ${end} consume: ${end - start}`);
            }
        };

        return descriptor;
    };
}
