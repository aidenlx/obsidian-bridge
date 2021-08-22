import { MbBookNote } from "@alx-plugins/marginnote";

import { RequiredKeys } from "./optional";
import { Toc } from "./return";

/**
 * @returns when note missing params, return error message
 */
export const scanToc = (
  note: MbBookNote,
): [note: Toc, bookMd5s: string[]] | string => {
  const depth = 99;
  let invaild: string[] = [],
    bookMd5s: Set<string> = new Set();
  const scan = (obj: MbBookNote, accu: number = 0): Toc | null => {
    const requiredKeys: RequiredKeys<Toc>[] = [
        "noteTitle",
        "noteId",
        "childNotes",
      ],
      keys = (requiredKeys as (keyof Toc)[]).concat(
        "docMd5",
        "startPage",
        "endPage",
      );
    if (
      requiredKeys.some((k) => {
        const result = obj[k] === null || obj[k] === undefined;
        if (result) invaild.push(`${obj.noteTitle} missing prop ${k}`);
        return result;
      })
    )
      return null;
    let out = {};
    for (const key of keys) {
      let value;
      if (accu < depth) {
        if (key === "docMd5" && obj.docMd5) {
          bookMd5s.add(obj.docMd5);
          value = obj.docMd5;
        } else if (key === "childNotes" && Array.isArray(obj[key])) {
          try {
            value = obj.childNotes
              .map((n) => scan(n, accu + 1))
              .filter((n) => n !== null);
          } catch (error) {
            value = `Error scaning: ${key} accu: ${accu}`;
          }
        }
      }
      value = obj[key];
      Object.defineProperty(out, key, {
        value,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }
    return out as Toc;
  };

  const result = scan(note);
  if (!result) {
    JSB.log("🌈🌈🌈 MNLOG toc: invaild param\n" + invaild.join("\n"));
  }
  return result ? [result, [...bookMd5s]] : invaild.join("\n");
};
export const scanNote = (
  note: MbBookNote,
  depth = 1,
): [note: MbBookNote, bookMd5s: string[]] => {
  let bookMd5s: Set<string> = new Set();

  const generalScan = getScanFunc(depth),
    scan = (obj: MbBookNote, dive?: boolean, accu: number = 0): MbBookNote => {
      let out: any = {};
      for (const k of getAllProperties(obj)) {
        const key = k as keyof MbBookNote;
        let value;
        if (accu < depth) {
          if (key === "docMd5" && obj.docMd5) {
            bookMd5s.add(obj.docMd5);
            value = obj.docMd5;
          } else if (
            key === "parentNote" &&
            obj.parentNote &&
            (dive === undefined || !dive)
          ) {
            try {
              value = scan(obj.parentNote, false, accu + 1);
            } catch (error) {
              value = `Error scaning: ${key} accu: ${accu}`;
            }
          } else if (
            key === "childNotes" &&
            (dive === undefined || dive) &&
            Array.isArray(obj[key])
          ) {
            try {
              value = obj.childNotes.map((v) => scan(v, true, accu + 1));
            } catch (error) {
              value = `Error scaning: ${key} accu: ${accu}`;
            }
          } else if (key === "excerptPic") {
            try {
              value = generalScan(obj.excerptPic, false, accu + 1);
            } catch (error) {
              value = `Error scaning: ${key} accu: ${accu}`;
            }
          }
        }
        value = obj[key];
        Object.defineProperty(out, key, {
          value,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      }
      return out;
    };

  return [scan(note), [...bookMd5s]];
};
const getScanFunc = (depth: number) => {
  const scan = (obj: any, dive?: boolean, accu: number = 0): any => {
    if (typeof obj !== "undefined" && obj !== null) {
      let out: any = {};
      for (const k of getAllProperties(obj)) {
        let value;
        if (accu < depth) {
          if (
            k === "parentNote" &&
            (dive === undefined || !dive) &&
            isMbBookNote(obj[k])
          ) {
            try {
              value = scan(obj[k], false, accu + 1);
            } catch (error) {
              value = `Error scaning: ${k} accu: ${accu}`;
            }
          } else if (
            k === "childNotes" &&
            (dive === undefined || dive) &&
            Array.isArray(obj[k])
          ) {
            try {
              value = (obj[k] as any[]).map((v) => scan(v, true, accu + 1));
            } catch (error) {
              value = `Error scaning: ${k} accu: ${accu}`;
            }
          } else if (k === "excerptPic") {
            try {
              value = scan(obj[k], false, accu + 1);
            } catch (error) {
              value = `Error scaning: ${k} accu: ${accu}`;
            }
          } else value = obj[k];
        } else value = obj[k];
        Object.defineProperty(out, k, {
          value,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      }
      return out;
    } else {
      return undefined;
    }
  };
  return scan;
};
export const scanObject = <T>(obj: T, depth = 1): T => {
  const scan = getScanFunc(depth);
  return scan(obj);
};

const baseProps = (() => {
  let allProps: any[] = [],
    curr = {};
  do {
    let props = Object.getOwnPropertyNames(curr);
    props.forEach((prop) => {
      if (allProps.indexOf(prop) === -1) allProps.push(prop);
    });
  } while ((curr = Object.getPrototypeOf(curr)));
  return allProps;
})();

export const getAllProperties = (obj: object) => {
  let allProps: any[] = [],
    curr = obj;
  do {
    let props = Object.getOwnPropertyNames(curr);
    props.forEach((prop) => {
      if (allProps.indexOf(prop) === -1 && baseProps.indexOf(prop) === -1)
        allProps.push(prop);
    });
  } while ((curr = Object.getPrototypeOf(curr)));
  return allProps;
};

const isMbBookNote = (obj: any): obj is MbBookNote => {
  return (
    obj?.noteId !== undefined &&
    obj?.childNotes !== undefined &&
    Array.isArray(obj.childNotes)
  );
};
