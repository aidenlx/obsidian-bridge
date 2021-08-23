import { MbBook, MbBookNote } from "@alx-plugins/marginnote";

export type Selection = { sel: string; book?: MbBook };
export type inHistory = Data | null;
export type time = number | null;
export type item = {
  data: Exclude<inHistory, null>;
  addTime: Exclude<time, null>;
} | null;

export type Data = Selection | MbBookNote | Toc;
export type DataType = "sel" | "note" | "toc";

export type MNMark = "<!--MN-->\n";

type ReturnBody_Basic = {
  type: DataType;
  sendTime: ReturnType<typeof Date.now>;
  data: Data;
  last: item | null;
};

export type ReturnBody = ReturnBody_Note | ReturnBody_Sel | ReturnBody_Toc;

export interface ReturnBody_Sel extends ReturnBody_Basic {
  type: "sel";
  data: Selection;
  book?: MbBook;
}

export interface ReturnBody_Note extends ReturnBody_Basic {
  type: "note";
  data: MbBookNote;
  /** id - base64(png) pair */
  mediaMap: Record<string, string>;
  bookMap: Record<string, MbBook>;
}

export interface ReturnBody_Toc extends ReturnBody_Basic {
  type: "toc";
  data: Toc;
  bookMap: Record<string, MbBook>;
}
export interface Toc {
  noteTitle: string;
  noteId: string;
  docMd5?: string;
  startPage?: number;
  endPage?: number;

  childNotes: Toc[];
}
