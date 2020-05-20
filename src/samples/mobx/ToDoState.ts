import {action, observable} from 'mobx';

export default class ToDoState {
  id = Math.random();
  @observable title = '';
  @observable finished = false;

  @action
  public setTitle(title: string) {
    this.title = `${title}`;
  }

  @action
  public setFinished(finished: boolean) {
    this.finished = finished;
  }
}
