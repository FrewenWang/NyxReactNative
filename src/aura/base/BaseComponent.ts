import {Component} from 'react';
import Logger from '../utils/Logger';

export abstract class BaseComponent<ViewProps, State> extends Component<ViewProps,
    State> {
    public TAG = this.constructor.toString();
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
}
