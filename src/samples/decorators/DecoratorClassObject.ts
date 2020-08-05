import {propertyCommonDecorator, propertyDecoratorByDescriptor} from './decorators/PropertyDecorators';

export class DecoratorClassObject {
    constructor() {
        console.log('我是构造函数');
    }

    // @propertyCommonDecorator('Frewen.Wang')
    @propertyDecoratorByDescriptor('Frewen.Wang ByDescriptor 11111')
    name: string | undefined;

    // @propertyCommonDecorator('Frewenn.Wang')
    @propertyDecoratorByDescriptor('Frewen.Wang ByDescriptor 222222')
    static staticName: string | undefined;
}
