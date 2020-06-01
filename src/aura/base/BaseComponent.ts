import {Component} from 'react';
import Logger from '../utils/Logger';

export abstract class BaseComponent<ViewProps, State>
    extends Component<ViewProps, State> {
    // 不能用这个作为TAG，打印是这个类的构造函数，内容会比较多
    // public TAG = this.constructor.toString();
    public TAG = this.getClassName(this);
    protected isDidMounted = false;

    protected constructor(props: ViewProps) {
        super(props);
        Logger.info(this.TAG, 'constructor called');
    }

    // /**
    //  * @deprecated
    //  * deprecated in 16.3, use componentDidMount or the constructor instead;
    //  * will stop working in React 17
    //  * 这个方法从React16.3就已经过时了。
    //  */
    // public componentWillMount(): void {
    //   Logger.info(this.TAG, 'componentWillMount called');
    // }

    /**
     * 当组件被挂载后这个方法会被立即调用。
     * 如果在这个方法中设置State将触发重新渲染。
     * 另外，我们一般网络请求都会在这个方法里面进行实现，
     * 可以保证数据回来之后的State变化一定是组件被挂载之后触发
     */
    public componentDidMount(): void {
        this.isDidMounted = true;
        Logger.info(this.TAG, 'componentDidMount called');
    }

    public componentWillUnmount(): void {
        this.isDidMounted = false;
        Logger.info(this.TAG, 'componentWillUnmount called');
    }

    public didMounted(): boolean {
        return this.isDidMounted;
    }

    /**
     * 获取类的名称
     * @param obj
     */
    public getClassName(obj: any) {
        if (obj && obj.constructor && obj.constructor.toString()) {
            if (obj.constructor.name) {
                return obj.constructor.name;
            }
            let str = obj.constructor.toString();
            let arr;
            if (str.charAt(0) == '[') {
                arr = str.match(/\[\w+\s*(\w+)\]/);
            } else {
                arr = str.match(/function\s*(\w+)/);
            }
            if (arr && arr.length == 2) {
                return arr[1];
            }
        }
        return undefined;
    }

}
