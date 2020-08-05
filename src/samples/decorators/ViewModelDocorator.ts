/**
 * ViewModel是一个方法装饰器，给类中的方法添加装饰器。
 *
 * 方法装饰器接收三个参数：
 * target ：对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
 * propertyKey ： 属性的名称。
 * @param pageName
 * @constructor
 */
export function ViewModel(pageName: string) {
    return function (target: any, propertyName: any, descriptor: PropertyDecorator) {};
}
