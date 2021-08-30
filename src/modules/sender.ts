import { MbBookNote } from "@alx-plugins/marginnote";

import { ReturnBody, Selection } from "../return";
import { getBody_Note, getBody_Sel, getBody_Toc } from "./parser";
import { copy, isMac, showHUD } from "./tools";
import getText from "./translate";
import { ObjToJson, ObjToUrl } from "./url-obj";

export const SendToc = (src: MbBookNote): void => {
  try {
    send(getBody_Toc(src));
    showHUD(getText("hint_toc_success") + src.noteTitle);
  } catch (error) {
    showHUD(error);
  }
};
export const SendSel = (src: Selection): void => send(getBody_Sel(src));
export const SendNote = (src: MbBookNote): void => send(getBody_Note(src));

const send = (body: ReturnBody) =>
  isMac()
    ? copy(ObjToJson(body))
    : Application.sharedInstance().openURL(NSURL.URLWithString(ObjToUrl(body)));
