import { MbBook, MbBookNote } from "@alx-plugins/marginnote";

import { DateCvt, NonTypeProps, TypePropNames } from "./modules/type-tools";

export type Book = DateCvt<MbBook>;
type note_valOnly = NonTypeProps<MbBookNote, Function>;
type note_dateCvt = DateCvt<note_valOnly>;
export type Note = NonTypeProps<
  note_dateCvt,
  MbBookNote | MbBookNote[] | undefined
> &
  {
    [P in TypePropNames<note_dateCvt, MbBookNote | undefined>]?: Note;
  } &
  { [P in TypePropNames<note_dateCvt, MbBookNote[]>]: Note[] };

export type Selection = { sel: string; book?: MbBook };
export type inHistory = Data | null;
export type time = number | null;
export type item = {
  data: Exclude<inHistory, null>;
  addTime: Exclude<time, null>;
} | null;

export type Data = Selection | Note | Toc;
export type DataType = "sel" | "note" | "toc";

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
}

export interface ReturnBody_Note extends ReturnBody_Basic {
  type: "note";
  data: Note;
  linkedNotes: Record<string, Note>;
  /** id - base64(png) pair */
  mediaMap: Record<string, string>;
  bookMap: Record<string, Book>;
}

export interface ReturnBody_Toc extends ReturnBody_Basic {
  type: "toc";
  data: Toc;
  bookMap: Record<string, Book>;
}
export interface Toc {
  noteTitle: string;
  noteId: string;
  docMd5?: string;
  startPage?: number;
  endPage?: number;

  childNotes: Toc[];
}
