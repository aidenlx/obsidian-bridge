import JsonURL from "@jsonurl/jsonurl";
import assertNever from "assert-never";
import { ObsidianProtocolData } from "obsidian";
import { stringify as toQs } from "query-string";
import URLParse from "url-parse";

import { PREFIX, PREFIX_REGEX, VERSION } from "../const";
import { DataType, ReturnBody } from "../return";
import { copy } from "./tools";

export const ObjToUrl = (obj: ReturnBody): string => {
  // copy(JSON.stringify(obj));
  const url = URLParse("obsidian://mncomp"),
    { type, sendTime, last, data } = obj,
    qsObj: QsObj = {
      version: VERSION,
      type,
      sendTime,
      last: JsonURL.stringify(last) as string,
      data: JsonURL.stringify(data) as string,
    },
    qs = toQs(qsObj);
  url.set("query", qs);
  return url.toString();
};
export const ObjToJson = (obj: ReturnBody): string =>
  PREFIX + JSON.stringify(obj);

type QsObj = {
  version: string;
  type: DataType;
  sendTime: number;
  last: string;
  data: string;
};
const dts = ["sel", "note", "toc"];
const keys: (keyof QsObj)[] = ["version", "type", "sendTime", "last", "data"];
const isDataType = (str: string): str is DataType => dts.includes(str);

export const UrlToObj = (
  params: ObsidianProtocolData,
): [version: string, body: ReturnBody] | null => {
  let obj = {} as any,
    version: string = "";
  for (const key of keys) {
    if (!params[key]) {
      console.error("param empty, key: " + key);
      return null;
    } else {
      switch (key) {
        case "version":
          version = params[key];
          continue;
        case "type": {
          let type = params[key];
          if (isDataType(type)) obj[key] = type;
          else {
            console.error("invaild type: " + type);
            return null;
          }
          continue;
        }
        case "sendTime":
          obj[key] = +params[key];
          continue;
        case "last":
        case "data":
          obj[key] = JsonURL.parse(params[key]);
          continue;
        default:
          assertNever(key);
      }
    }
  }
  if (version === "") {
    console.error("version empty");
    return null;
  }
  return [version, obj as ReturnBody];
};
export const JsonToObj = (
  src: string,
): [version: string, body: ReturnBody] | null => {
  let match;
  if ((match = src.match(PREFIX_REGEX))) {
    const version = match[1];
    const json = src.replace(PREFIX_REGEX, "");
    return [version, JSON.parse(json)];
  } else return null;
};
