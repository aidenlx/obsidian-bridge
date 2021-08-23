import { osType } from "@alx-plugins/marginnote";

import { scanObject } from "./scan";

export const getWordCount = (src: string) => {
  return (src.match(/\b/g) || "").length / 2 + (src.match(chs) || "").length;
};
const prefix = "marginnote3app://note/";
const chs = RegExp(/[\u4e00-\u9fa5]/g);
export const mnUrl = (id: string) => prefix + id;

export { alert, copy, debug, showHUD };

const showHUD = (message: string, duration: number = 2) => {
  Application.sharedInstance().showHUD(message, self.window, duration);
};

const alert = (message: string) => {
  Application.sharedInstance().alert(message);
};

/**
 * Copy to Clipboard
 */
const copy = (content: string) => {
  // @ts-ignore
  let pasteBoard = UIPasteboard.generalPasteboard();
  pasteBoard.string = content;
};

const debug = (obj: any) => {
  const replacer = (k: string, value: any) => {
    if (value === undefined) {
      return "UNDEFINED";
    } else if (typeof value === "function") {
      return value.toString();
    } else return value;
  };

  try {
    return JSON.stringify(scanObject(obj), replacer, 2);
  } catch (error) {
    showHUD(error.toString());
    return null;
  }
};

/**
 * Get Objective-C class declaration
 */
export const getObjCClassDeclar = (name: string, type: string) =>
  `${name} : ${type}`;

export const isMac = () => Application.sharedInstance().osType === osType.macOS;
