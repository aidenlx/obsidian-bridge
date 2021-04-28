
export type selection = { sel: string }
export type inHistory = selection | MbBookNote | undefined;
export type item = { data: inHistory, addTime: number|undefined }

export class PopupRecorder {
  private history: Array<inHistory>;
  private addTime: Array<number|undefined>;

  constructor() {
    this.history = new Array(2);
    this.addTime = new Array(2);
  }

  push(obj: Exclude<inHistory,undefined>) {
    this.history.shift(); //去除过期id（第一个）
    this.history.push(obj);
    this.addTime.shift(); //去除过期id（第一个）
    this.addTime.push(Date.now());
  }

  public get last() : item {
    return { data: this.history[1], addTime: this.addTime[1] };
  }
  
  isDuplicate(time:number) {
    return time - (this.addTime[1] ?? 0) < 500;
  }
}
