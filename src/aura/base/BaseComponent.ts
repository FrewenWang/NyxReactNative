import {Component} from 'react';
import Logger from "../utils/Logger";

export abstract class BaseComponent<ViewProps, State> extends Component<ViewProps, State> {
    private TAG = this.constructor.toString();
    protected isDidMounted = false;

    protected constructor(props: ViewProps) {
        super(props);
        Logger.info(this.TAG, 'constructor called');
    }

    /**
     * @deprecated
     * deprecated in 16.3, use componentDidMount or the constructor instead;
     * will stop working in React 17
     * 这个方法从React16.3就已经过时了。
     */
    public componentWillMount(): void {
        Logger.info(this.TAG, 'componentWillMount called');
    }

    public componentDidMount(): void {
        this.isDidMounted = true
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
