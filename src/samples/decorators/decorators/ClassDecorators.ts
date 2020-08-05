/**
 * 类装饰器3种类型:
 * 1、普通装饰器（无法传参）
 * 2、装饰器工厂（可传参）
 * 3、重载构造函数
 *
 */
export function classCommonDecorator(target: any) {
    console.log('普通的类装饰器，无法进行传参！！！');
}

/**
 * 装饰器工厂（可传参）
 * 增加了一个静态变量
 * @param params
 */
export function classDecoratorFactory(params: string) {
    return function (target: any) {
        // 给target类对象添加静态变量
        target.decoratorParam = params;
    };
}

/**
 * 重载构造函数的装饰器,
 * @param params
 */
export function classDecoratorOverrideConstructor(target: any) {
    return class extends target {
        decoratorMethod() {
            console.log('classDecoratorOverrideConstructor', '这个是重载构造函数的装饰器方法');
        }
    };
}
