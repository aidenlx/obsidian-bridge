import type { MbBookNote } from "marginnote";
import { PopupRecorder, selection, item } from "./PopupRecorder";
import { scanObject } from "./tools";

type node = selection | MbBookNote;

function process<T extends node>(node: T, rec: PopupRecorder): ReturnBody<T> {
  let data = isSel(node) ? node : scanObject(node, 2);
  const last = rec.last;
  rec.push(data);
  const sendTime = rec.last.addTime as number;
  return {
    type: isSel(node) ? "sel" : "note",
    sendTime,
    data,
    last,
  };
}

export function stringify<T extends node>(node: T, rec: PopupRecorder): string {
  return "<!--MN-->\n" + JSON.stringify(process(node, rec));
}

function isSel(node: node): node is selection {
  return typeof (node as selection).sel === "string";
}

type ReturnBody<T extends node> = {
  type: "sel" | "note";
  sendTime: ReturnType<typeof Date.now>;
  last: item;
  data: T;
};
