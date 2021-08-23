import { MbBookNote } from "@alx-plugins/marginnote";
import JsonURL from "@jsonurl/jsonurl";
import { stringify as toQs } from "query-string";
import Url from "url-parse";

import { VERSION } from "./const";
import { getBody_Note, getBody_Sel, getBody_Toc } from "./parser";
import { ReturnBody, Selection } from "./return";
import { showHUD } from "./tools";
import getText from "./translate";

export const SendToc = (src: MbBookNote): void => {
  try {
    toURL(getBody_Toc(src));
    showHUD(getText("hint_toc_success") + src.noteTitle);
  } catch (error) {
    showHUD(error);
  }
};
export const SendSel = (src: Selection): void => toURL(getBody_Sel(src));
export const SendNote = (src: MbBookNote): void => toURL(getBody_Note(src));

const toURL = (obj: ReturnBody) => {
  const url = new Url("obsidian://mncomp"),
    { type, sendTime, last, data } = obj,
    qs = toQs({
      version: VERSION,
      type,
      sendTime,
      last: JsonURL.stringify(last),
      data: JsonURL.stringify(data),
    });
  url.set("query", qs);
  Application.sharedInstance().openURL(NSURL.URLWithString(url.toString()));
};
