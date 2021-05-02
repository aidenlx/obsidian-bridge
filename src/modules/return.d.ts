import { MbBook, MbBookNote } from "@alx-plugins/marginnote";

export type selection = { sel: string }
export type inHistory = selection | MbBookNote | null;
export type time = number | null;
export type item = {
  data: Exclude<inHistory, null>;
  addTime: Exclude<time, null>;
} | null;

export type node = selection | MbBookNote;

export type MNMark = "<!--MN-->\n";

type ReturnBody_Basic = {
  type: "sel" | "note";
  sendTime: ReturnType<typeof Date.now>;
  currentBook?: MbBook;
  data: node;
  last: item | null;
};

export type ReturnBody = ReturnBody_Note | ReturnBody_Sel;

export interface ReturnBody_Sel extends ReturnBody_Basic {
  type: "sel";
  data: selection;
}

export interface ReturnBody_Note extends ReturnBody_Basic {
  type: "note"
  data: MbBookNote;
}