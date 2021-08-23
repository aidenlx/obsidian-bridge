import JsonURL from "@jsonurl/jsonurl";
import assertNever from "assert-never";
import { ObsidianProtocolData } from "obsidian";
import { stringify as toQs } from "query-string";
import URLParse from "url-parse";

import { VERSION } from "./const";
import { DataType, ReturnBody } from "./return";
import { copy } from "./tools";

export const ObjToUrl = (obj: ReturnBody) => {
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

