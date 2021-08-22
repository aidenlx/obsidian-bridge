import { excerptPic_video, MbBook, MbBookNote } from "@alx-plugins/marginnote";

import { PREFIX, VERSION } from "./const";
import PopupRecorder from "./PopupRecorder";
import {
  Data,
  ReturnBody,
  ReturnBody_Note,
  ReturnBody_Sel,
  ReturnBody_Toc,
  Selection,
} from "./return";
import { scanNote, scanObject, scanToc } from "./scan";
import { copy, showHUD } from "./tools";
import getText from "./translate";

const getBook = (docMd5: string | undefined): MbBook | null => {
  const bookObj =
    docMd5 && typeof docMd5 === "string"
      ? Database.sharedInstance().getDocumentById(docMd5)
      : null;
  return bookObj ? scanObject(bookObj) : null;
};

const stringify = (obj: any): string => {
  return PREFIX + JSON.stringify(obj);
};

const getLastAndSendTime = (
  data: Data,
): { sendTime: ReturnBody["sendTime"]; last: ReturnBody["last"] } => {
  const rec = self.recorder as PopupRecorder,
    last = rec.last;
  return { last, sendTime: rec.push(data) };
};

export const handleSel = (sel: Selection): void => {
  const { last, sendTime } = getLastAndSendTime(sel);
  const returns: ReturnBody_Sel = {
    version: VERSION,
    type: "sel",
    sendTime,
    data: sel,
    last,
  };
  copy(stringify(returns));
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

export const handleNote = (note: MbBookNote): void => {
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

  const returns: ReturnBody_Note = {
    version: VERSION,
    type: "note",
    sendTime,
    bookMap,
    mediaMap,
    data,
    last,
  };
  copy(stringify(returns));
};

export const handleToc = (note: MbBookNote): void => {
  // if (note.parentNote) return;
  const result = scanToc(note);
  if (typeof result !== "string") {
    const [data, bookMd5s] = result,
      { last, sendTime } = getLastAndSendTime(data),
      bookMap = arrToObj(bookMd5s, (id) => getBook(id));
    const returns: ReturnBody_Toc = {
      version: VERSION,
      type: "toc",
      sendTime,
      bookMap,
      data,
      last,
    };
    copy(stringify(returns));
    showHUD(getText("hint_toc_success") + note.noteTitle);
  } else showHUD(result);
};

const isSel = (node: Data): node is Selection =>
  typeof (node as Selection).sel === "string";
