import Logger from './Logger';

const TAG = 'TimeoutManager';

interface TimeoutMsg {
  timer: number;
  name: string | undefined;
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

  private static timerManagerId = 0;

  private hasRelease: boolean = false;

  public constructor() {
    this.name = `TimerManager${++TimeoutManager.timerManagerId}`;
    Logger.log(TAG, `${this.name}  created`);
    this.timeoutMap = new Map<number, TimeoutMsg>();
  }

  /**
   * 启动一个Timeout
   * @param callback timer的回调
   * @param delay  timer回调的时长
   * @return timerId 回调出去的ID
   */
  public startTimeout(
    callback: () => void,
    delay: number,
    name?: string,
  ): number {
    if (this.hasRelease) {
      Logger.log(TAG, 'TimerManager has Released !!');
    }
    ++this.timerId;
    let timer = this.doStartTimeout(this.timerId, name, callback, delay);

    this.notifyTimerStart(this.timerId, name, timer, callback, delay);

    return this.timerId;
  }

  private doStartTimeout(
    timerId: number,
    timerName: string | undefined,
    callback: () => void,
    delay: number,
  ): number {
    let timer = setTimeout((): void => {
      if (callback) {
        console.log(
          TAG,
          `Timer: ${this.getTimerName(timerId, timerName)} has processed`,
        );
        callback();
      }
      this.clearTimer(timer);
    }, delay);
    return timer;
  }

  /**
   * 重置管理中的一个timer
   * @param startTimeout返回给调用方的TimerId
   */
  public resetTimeout(timerId: number | undefined): void {
    if (timerId == undefined || timerId == null) {
      return;
    }
    if (this.hasRelease) {
      Logger.log(TAG, `TimerManager has Released !! timerId = ${timerId}`);
    }
    let timerMsg;
    if (this.timeoutMap.has(timerId)) {
      timerMsg = this.timeoutMap.get(timerId);
      timerMsg && this.clearTimer(timerId);
    } else {
      Logger.log(TAG, `could not find Timer:${this.getTimerName(timerId)}`);
    }
    if (timerMsg) {
      let timer = this.doStartTimeout(
        timerId,
        timerMsg.name,
        timerMsg.callBack,
        timerMsg.delay,
      );
      this.notifyTimerStart(
        timerId,
        timerMsg.name,
        timer,
        timerMsg.callBack,
        timerMsg.delay,
      );
    } else {
      Logger.log(TAG, `could not find Timer:${this.getTimerName(timerId)}`);
    }
  }

  /**
   * 释放管理中的一个timer
   * @param timerHandle
   */
  public clearTimer(timerId: number | undefined): boolean {
    if (timerId == undefined || timerId == null) {
      return false;
    }
    if (this.timeoutMap.has(timerId)) {
      let timerMsg = this.timeoutMap.get(timerId);
      if (timerMsg?.timer) {
        clearTimeout(timerMsg.timer);
        this.timeoutMap.delete(timerId);
        console.log(
          TAG,
          `Timer: ${this.getTimerName(timerId, timerMsg.name)} has canceled`,
        );
        return true;
      }
    }
    Logger.log(TAG, `clear Timer:${this.getTimerName(timerId)}  failed!!!`);
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
    this.hasRelease = true;
  }

  public getTimerName(
    keyTimerID: number | undefined,
    timerName?: string,
  ): string {
    if (timerName) {
      return this.name + '-' + timerName;
    }
    return this.name + '-' + keyTimerID;
  }

  private notifyTimerStart(
    keyTimerID: number,
    timerName: string | undefined,
    timer: number,
    callback: () => void,
    delay: number,
  ): void {
    console.log(
      TAG,
      `startTimer : ${this.getTimerName(
        keyTimerID,
        timerName,
      )}, time out delay: ${delay}`,
    );
    this.timeoutMap.set(keyTimerID, {
      name: timerName,
      timer: timer,
      callBack: callback,
      delay: delay,
    });
  }
}
