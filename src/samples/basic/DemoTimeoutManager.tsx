import React, {ReactChildren, ReactElement} from 'react';
import {Button, ViewProps} from 'react-native';
import {BaseComponent} from '../../aura/base/BaseComponent';
import {TimeoutManager} from '../../aura/utils/TimeoutManager';

const TAG = 'DemoTimeoutManager';
export default class DemoTimeoutManager extends BaseComponent<ViewProps, {}> {
  private timerManager?: TimeoutManager;

  constructor(props: ViewProps) {
    super(props);
  }

  public render(): ReactChildren | ReactElement {
    return (
      <>
        <Button title={'开始Timer'} onPress={this.startTimer.bind(this)} />

        <Button title={'释放Timer'} onPress={this.releaseTimer.bind(this)} />
      </>
    );
  }

  private startTimer() {
    this.timerManager = new TimeoutManager();
    this.timerManager.startTimeout(
      () => {
        console.log(TAG, 'timer1 processed');
      },
      1000 * 10,
      'timer1',
    );

    this.timerManager.startTimeout(
      () => {
        console.log(TAG, 'timer2 processed');
      },
      1000 * 15,
      'timer2',
    );

    this.timerManager.startTimeout(
      () => {
        console.log(TAG, 'timer3 processed');
      },
      1000 * 20,
      'timer3',
    );
  }

  private releaseTimer() {
    this.timerManager?.release();
    console.log(TAG, 'timerManager released');
  }
}


