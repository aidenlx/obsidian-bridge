import { PopupRecorder, selection } from "./PopupRecorder";
import { node, ReturnBody } from "./return";
import { scanObject } from "./tools";


function process(node: node, rec: PopupRecorder, currentBook?: MbBook): ReturnBody {
  let data = isSel(node) ? node : scanObject(node, 2);
  const last = rec.last;
  rec.push(data);
  const sendTime = rec.last.addTime as number;
  return {
    type: isSel(node) ? "sel" : "note",
    sendTime,
    currentBook: currentBook ? scanObject(currentBook) : undefined,
    data,
    last,
  };
}

export function stringify<T extends node>(node: T, rec: PopupRecorder, currentBook?: MbBook): string {
  return "<!--MN-->\n" + JSON.stringify(process(node, rec, currentBook));
}

function isSel(node: node): node is selection {
  return typeof (node as selection).sel === "string";
}

