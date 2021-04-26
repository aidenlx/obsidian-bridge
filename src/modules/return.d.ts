import { MbBookNote } from "@alx-plugins/marginnote";
import { selection, item } from "./PopupRecorder";

export type node = selection | MbBookNote;

export type ReturnBody<T extends node> = {
  type: "sel" | "note";
  sendTime: ReturnType<typeof Date.now>;
  last: item;
  data: T;
};

export { selection, item } from "./PopupRecorder";