import { excerptPic_video, MbBook, MbBookNote } from "@alx-plugins/marginnote";

import PopupRecorder from "./PopupRecorder";
import {
  Book,
  Data,
  ReturnBody,
  ReturnBody_Note,
  ReturnBody_Sel,
  ReturnBody_Toc,
  Selection,
} from "./return";
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
  arr: string[],
  cvt: (id: string) => V | null,
): Record<string, V> =>
  arr.reduce((obj, id) => {
    const val = cvt(id);
    if (val) obj[id] = val;
    return obj;
  }, {} as any) as Record<string, V>;

export const getBody_Note = (note: MbBookNote): ReturnBody_Note => {
  const [data, bookMd5s] = scanNote(note, 2),
    { last, sendTime } = getLastAndSendTime(data),
    bookMap = arrToObj(bookMd5s, (id) => getBook(id));

  const videoId = (data.excerptPic as excerptPic_video)?.video,
    mediaIds = note.mediaList?.split("-").filter((id) => id !== videoId),
    mediaMap =
      mediaIds && mediaIds.length > 0
        ? arrToObj(mediaIds, (id) => {
            const mediaData = Database.sharedInstance()
              .getMediaByHash(id)
              ?.base64Encoding();
            return mediaData && mediaData.startsWith("iVBORw0K")
              ? mediaData
              : null;
          })
        : {};

  return {
    type: "note",
    sendTime,
    bookMap,
    mediaMap,
    data,
    last,
  };
};

export const getBody_Toc = (note: MbBookNote): ReturnBody_Toc => {
  // if (note.parentNote) return;
  const result = scanToc(note);
  const [data, bookMd5s] = result,
    { last, sendTime } = getLastAndSendTime(data),
    bookMap = arrToObj(bookMd5s, (id) => getBook(id));
  return {
    type: "toc",
    sendTime,
    bookMap,
    data,
    last,
  };
};
