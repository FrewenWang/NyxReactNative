import React from 'react';
import {Text} from 'react-native';
import {observer} from 'mobx-react';
import {Props} from './DemoMobx';
import {autorun, IReactionDisposer} from 'mobx';
import {TodoListObj} from './TodoList';
import MathUtils from "../../aura/utils/MathUtils";

/**
 * 通常，在和Mobx数据有关联的时候，你需要给你的React组件加上@observer，
 * 你不必太担心性能上的问题，加上这个@observer不会对性能产生太大的影响，
 * 而且@observer还有一个类似于pure render的功能，甚至能起到性能上的一些优化。
 */
@observer
export default class PureRenderItem extends React.Component {
    private dispose: IReactionDisposer | undefined;

    constructor(props: Props) {
        super(props);
    }

    componentDidMount(): void {
        this.dispose = autorun(this.autoRunMethod);
    }

    componentWillUnmount(): void {
        this.dispose && this.dispose();
    }

    render(): React.ReactElement {
        console.log('PureRenderItem的render触发了');
        return (
            <Text style={{color: 'red', fontSize: 18, fontWeight: 'bold'}}>
                {this.renderBottomRenderItem()}
            </Text>
        );
    }

    private renderBottomRenderItem(): string {
        let id = MathUtils.getRandom(0, 100);
        return `PureRenderItem id = ${id}`;
    }

    private autoRunMethod(): void {
        console.log('PureRenderItem', 'autoRunMethod', TodoListObj.todoList.length);
    }
}
