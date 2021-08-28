import {
  excerptPic_video,
  linkComment,
  MbBookNote,
} from "@alx-plugins/marginnote";

import {
  Book,
  Data,
  Note,
  ReturnBody,
  ReturnBody_Note,
  ReturnBody_Sel,
  ReturnBody_Toc,
  Selection,
} from "../return";
import PopupRecorder from "./recorder";
import { scanNote, scanObject, scanToc } from "./scan";

const getBook = (docMd5: string | undefined): Book | null => {
  const bookObj =
    docMd5 && typeof docMd5 === "string"
      ? Database.sharedInstance().getDocumentById(docMd5)
      : null;
  return bookObj ? (scanObject(bookObj) as Book) : null;
};

const getLastAndSendTime = (
  data: Data,
): { sendTime: ReturnBody["sendTime"]; last: ReturnBody["last"] } => {
  const rec = self.recorder as PopupRecorder,
    last = rec.last;
  return { last, sendTime: rec.push(data) };
};

export const getBody_Sel = (sel: Selection): ReturnBody_Sel => {
  const { last, sendTime } = getLastAndSendTime(sel);
  if (sel.book) sel.book = scanObject(sel.book);
  return {
    type: "sel",
    sendTime,
    data: sel,
    last,
  };
};

const arrToObj = <V>(
  cvt: (id: string) => V | null,
  ...arrs: string[][]
): Record<string, V> => {
  let obj = {} as any;
  for (const id of new Set(arrs.flat())) {
    const val = cvt(id);
    if (val) obj[id] = val;
  }
  return obj;
};

const getLinkedNotes = (
  note: MbBookNote,
): [map: Record<string, Note>, bookMd5s: string[], mediaIds: string[]] => {
  const { linkedNotes, comments } = note,
    linkedIds1 =
      linkedNotes?.map((v) => v.noteid).filter((v) => Boolean(v)) ?? [],
    linkedIds2 =
      comments
        .filter<linkComment>((c): c is linkComment => c.type === "LinkNote")
        .map((v) => v.noteid) ?? [];
  if (linkedIds1.length === 0 && linkedIds2.length === 0) return [{}, [], []];

  let book: string[][] = [],
    media: string[][] = [],
    map = arrToObj(
      (id) => {
        const note = Database.sharedInstance().getNoteById(id);
        if (!note) return null;
        const [data, bookMd5s] = scanNote(note, 1);
        book.push(bookMd5s);
        media.push(getMediaIds(note));
        return data;
      },
      linkedIds1,
      linkedIds2,
    );
  return [map, book.flat(), media.flat()];
};

const getMediaIds = (note: MbBookNote) => {
  const videoId = (note.excerptPic as excerptPic_video)?.video,
    mediaIds = note.mediaList?.split("-").filter((id) => id !== videoId);
  return mediaIds ?? [];
};
export const getBody_Note = (note: MbBookNote): ReturnBody_Note => {
  const [data, bookMd5s] = scanNote(note, 1),
    { last, sendTime } = getLastAndSendTime(data),
    [linkedNotes, bookL, mediaL] = getLinkedNotes(note),
    bookMap = arrToObj((id) => getBook(id), bookMd5s, bookL),
    mediaMap = arrToObj(
      (id) => {
        const mediaData = Database.sharedInstance()
          .getMediaByHash(id)
          ?.base64Encoding();
        return mediaData && mediaData.startsWith("iVBORw0K") ? mediaData : null;
      },
      getMediaIds(note),
      mediaL,
    );

  return {
    type: "note",
    sendTime,
    bookMap,
    mediaMap,
    linkedNotes,
    data,
    last,
  };
};

export const getBody_Toc = (note: MbBookNote): ReturnBody_Toc => {
  // if (note.parentNote) return;
  const result = scanToc(note);
  const [data, bookMd5s] = result,
    { last, sendTime } = getLastAndSendTime(data),
    bookMap = arrToObj((id) => getBook(id), bookMd5s);
  return {
    type: "toc",
    sendTime,
    bookMap,
    data,
    last,
  };
};
