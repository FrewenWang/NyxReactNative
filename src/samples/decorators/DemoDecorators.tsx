import {BasePureComponent} from '../../aura/base/BasePureComponent';
import {Text, View} from 'react-native';
import React, {ReactChild, ReactChildren, ReactElement} from 'react';
import {logMethod} from './LoggerDecorators';
import {
    classCommonDecorator,
    classDecoratorFactory,
    classDecoratorOverrideConstructor
} from './decorators/ClassDecorators';
import {propertyCommonDecorator} from './decorators/PropertyDecorators';
import {DecoratorClassObject} from './DecoratorClassObject';
import {methodCommonDecorator} from './decorators/MethodDecorators';
import {methodParamDecorator} from "./decorators/MethodParamDecorators";

@logMethod
@classCommonDecorator
@classDecoratorFactory('装饰器工厂参数')
export default class DemoDecorators extends BasePureComponent<any, any> {
    /**
     * 属性装饰器
     */
    @propertyCommonDecorator('你好，装饰器')
    private mName: string | undefined;

    public constructor(props: any) {
        super(props);
        console.log(this.TAG, '这是构造函数！！！！！');
        this.callMethodFromConstructor('from constructor');
    }

    public componentDidMount(): void {
        super.componentDidMount();

        // @ts-ignore
        console.log(this.TAG, 'DemoDecorators.decoratorParam == ' + DemoDecorators.decoratorParam);

        console.log(this.TAG, 'this.mName === ' + this.mName);

        console.log(this.TAG, '==================属性装饰器================== ');
        let decoratorClassObject = new DecoratorClassObject();
        console.log(this.TAG, 'new DecoratorClassObject().name === ' + decoratorClassObject.name);

        console.log(this.TAG, '装饰静态属性Name === ' + DecoratorClassObject.staticName);


        this.callMethodFromComponentDidMount('from componentDidMount');
    }

    public render(): ReactElement {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <Text>你好，装饰器</Text>
                <Text>mName:{this.mName}</Text>
            </View>
        );
    }

    @methodCommonDecorator('Hello')
    private callMethodFromConstructor(param: string) {
        console.log(this.TAG, 'callMethodFromConstructor: 构造函数调用');
    }

    private callMethodFromComponentDidMount(fromComponentDidMount: string) {
        console.log(this.TAG, 'callMethodFromConstructor: ComponentDidMount调用');
    }
}
