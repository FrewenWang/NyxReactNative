import MathUtils from './MathUtils';
import Logger from './Logger';

const TAG = 'TimeoutManager';


interface TimeoutMsg {
  timer: number;
  callBack: any;
  delay: number;
}

/**
 * TimeoutManager管理器
 */
export class TimeoutManager {
  private readonly name: string = 'TimerManager';
  /**
   * TimeoutManager内部管理器的KeyTimerID
   */
  private timerId: number = 0;
  /**
   * 存放Timeout的map对象
   */
  private timeoutMap: Map<number, TimeoutMsg>;

  public constructor() {
    this.name = 'TimerManager' + MathUtils.getRandom(0, 1000);
    this.timeoutMap = new Map<number, TimeoutMsg>();
  }

  /**
   * 启动一个Timeout
   * @param callback timer的回调
   * @param delay  timer回调的时长
   * @return timerId 回调出去的ID
   */
  public startTimeout(callback: () => void, delay: number): number {
    ++this.timerId;
    let timer = this.doStartTimeout(this.timerId, callback, delay);

    this.notifyTimerStart(this.timerId, timer, callback, delay);

    return this.timerId;
  }

  private doStartTimeout(timerId: number, callback: () => void, delay: number): number {
    let timer = setTimeout((): void => {
      console.log(TAG, `Timer: ${this.getTimerName(timerId)} has processed`);
      if (callback) {
        callback();
      }
      this.clearTimer(timer);
      this.timeoutMap.delete(timerId);
    }, delay);
    return timer;
  }

  /**
   * 重置管理中的一个timer
   * @param startTimeout返回给调用方的TimerId
   */
  public resetTimeout(timerId: number): void {
    let timerMsg;
    if (this.timeoutMap.has(timerId)) {
      timerMsg = this.timeoutMap.get(timerId);
      timerMsg && this.clearTimer(timerId);
    } else {
      Logger.log(TAG, 'could not find Timer:' + this.getTimerName(timerId));
    }
    if (timerMsg) {
      let timer = this.doStartTimeout(timerId, timerMsg.callBack, timerMsg.delay);
      this.notifyTimerStart(timerId, timer, timerMsg.callBack, timerMsg.delay);
    } else {
      Logger.log(TAG, 'could not find Timer:' + this.getTimerName(timerId));
    }
  }

  /**
   * 释放管理中的一个timer
   * @param timerHandle
   */
  public clearTimer(timerId: number): boolean {
    if (this.timeoutMap.has(timerId)) {
      let timerMsg = this.timeoutMap.get(timerId);
      if (timerMsg?.timer) {
        clearTimeout(timerMsg.timer);
        this.timeoutMap.delete(timerId);
        console.log(
          TAG,
          `Timer: ${this.getTimerName(timerId)} has canceled`,
        );
        return true;
      }
    }
    return false;
  }

  /**
   * 退出管理并清除管理的所有timer
   */
  public release(): void {
    this.timeoutMap.forEach((value, key) => {
      this.clearTimer(key);
    });
    this.timeoutMap.clear();
  }

  private getTimerName(keyTimerID: number): string {
    return this.name + '-' + keyTimerID;
  }

  private notifyTimerStart(keyTimerID: number, timer: number, callback: () => void, delay: number): void {
    console.log(
      TAG, `startTimer : ${this.getTimerName(keyTimerID)}, time out delay: ${delay}`,
    );
    if (this.timeoutMap.get(keyTimerID)) {
      this.timeoutMap.delete(keyTimerID);
    }
    this.timeoutMap.set(keyTimerID, {
      timer: timer,
      callBack: callback,
      delay: delay,

    });
  }
}
