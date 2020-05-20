import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet, FlatList} from 'react-native';
import {TodoListObj} from './TodoList';
import ToDoState from './ToDoState';
import {observer} from 'mobx-react';
import PureRenderItem from './PureRenderItem';

export interface Props {
}

/**
 * 通常，在和Mobx数据有关联的时候，你需要给你的React组件加上@observer.
 * 你不必太担心性能上的问题，加上这个@observer不会对性能产生太大的影响，
 * 而且@observer还有一个类似于pure render的功能，甚至能起到性能上的一些优化。
 */
@observer
export default class DemoMobx extends React.Component<Props> {
    private singleToDo: ToDoState;
    private index: number = 0;
    private finished: boolean = false;

    constructor(props: Props) {
        super(props);

        this.singleToDo = new ToDoState();
        this.singleToDo.setTitle('ToDo' + this.index);
        this.singleToDo.setFinished(!this.finished);
    }

    render(): React.ReactElement {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <View>
                    <Text style={{color: 'red', fontSize: 15, fontWeight: 'bold'}}>
                        {this.getId()}
                    </Text>
                    <Text style={{color: 'red', fontSize: 15, fontWeight: 'bold'}}>
                        {this.getTitle()}
                    </Text>
                    <Text style={{color: 'red', fontSize: 15, fontWeight: 'bold'}}>
                        {this.getFinishStatus()}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => {
                        this.addToDoList();
                    }}>
                    <Text style={{color: '#ffffff', fontSize: 14}}>增加</Text>
                </TouchableOpacity>
                <FlatList
                    data={TodoListObj.toDoList}
                    renderItem={({item}) => (
                        <Text style={styles.item}>
                            {'待办列表:' + item.title + ',完成状态：' + item.finished}
                        </Text>
                    )}
                />
                <Text style={{color: 'red', fontSize: 18, fontWeight: 'bold'}}>
                    {this.getUnfinishedCount()}
                </Text>
                <PureRenderItem/>
            </View>
        );
    }

    private addToDoList() {
        this.singleToDo = new ToDoState();
        this.singleToDo.setTitle('ToDo' + ++this.index);
        this.finished = !this.finished;
        this.singleToDo.setFinished(this.finished);

        TodoListObj.addTodo(this.singleToDo);
    }

    private getUnfinishedCount(): string {
        return `待办事项:${TodoListObj.unfinishedTodoCount}`;
    }

    private getFinishStatus(): string {
        return `完成状态:${this.singleToDo && this.singleToDo.finished}`;
    }

    private getTitle(): string {
        return `待办名称:${this.singleToDo && this.singleToDo.title}`;
    }

    private getId() {
        return `待办ID:${this.singleToDo && this.singleToDo.id}`;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        borderRadius: 8,
        height: 30,
        marginBottom: 25,
        backgroundColor: '#fc704e',
    },
});
