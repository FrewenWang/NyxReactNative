import {action, computed, observable} from 'mobx';
import ToDoState from './ToDoState';
import Logger from "../../aura/utils/Logger";

export default class TodoList {
  @observable todoList: ToDoState[] = [];

  /**
   * 计算属性:computed
   */
  @computed get unfinishedTodoCount() {
    let length = this.todoList.filter(todo => !todo.finished).length;
    Logger.log('TodoList', `unfinishedTodoCount ${length}`);
    return length;
  }

  @action
  public addTodo(todo: ToDoState): void {
    Logger.log('TodoList', `AddToDo:${todo.title}`);
    this.todoList.push(todo);
  }

  get toDoList(): ToDoState[] {
    Logger.log('TodoList', `getToDo:${this.todoList.length}`);
    return this.todoList;
  }
}

export const TodoListObj = new TodoList();
