import JsonURL from "@aidenlx/jsonurl";
import { ObsidianProtocolData } from "obsidian";
import { stringify as toQs } from "query-string";
import URLParse from "url-parse";

import { PREFIX, PREFIX_REGEX, URL_ACTION, VERSION } from "../const";
import { ReturnBody } from "../return";

export const ObjToUrl = (obj: ReturnBody): string => {
  const url = URLParse("obsidian://" + URL_ACTION),
    qsObj: QsObj = {
      version: VERSION,
      body: JsonURL.stringify(obj) as string,
    },
    qs = toQs(qsObj);
  url.set("query", qs);
  return url.toString();
};
type QsObj = {
  version: string;
  body: string;
};
export const UrlToObj = (
  params: ObsidianProtocolData,
): [version: string, body: ReturnBody] | null => {
  if (!isDataFromMN(params)) return null;

  const { version, body } = params as ObsidianProtocolData & QsObj;
  return [
    version,
    JsonURL.parse(body, {
      maxParseChars: 1 << 30, // maximum 1GB
    }) as ReturnBody,
  ];
};

export const ObjToJson = (obj: ReturnBody): string =>
  PREFIX + JSON.stringify(obj);
export const JsonToObj = (
  src: string,
): [version: string, body: ReturnBody] | null => {
  if (!isDataFromMN(src)) return null;

  let match;
  if ((match = src.match(PREFIX_REGEX))) {
    const version = match[1],
      json = src.replace(PREFIX_REGEX, "");
    return [version, JSON.parse(json)];
  } else return null;
};

export const isDataFromMN = (data: ObsidianProtocolData | string): boolean =>
  typeof data === "string"
    ? PREFIX_REGEX.test(data)
    : data.action === URL_ACTION && !!data.version && !!data.body;
