import { inHistory, item, time } from "./return";

export default class PopupRecorder {
  private history: Array<inHistory>;
  private addTime: Array<time>;

  constructor() {
    this.history = new Array(null, null);
    this.addTime = new Array(null, null);
  }

  push(obj: Exclude<inHistory, null>) {
    this.history.shift(); //去除过期id（第一个）
    this.history.push(obj);
    this.addTime.shift(); //去除过期id（第一个）
    this.addTime.push(Date.now());
  }

  public get last(): item {
    const data = this.history[1];
    const addTime = this.addTime[1];
    if (data && addTime) return { data, addTime };
    else return null;
  }

  isDuplicate(time: number) {
    return time - (this.addTime[1] ?? 0) < 500;
  }
}
