
export function getWordCount(src: string) {
  return (src.match(/\b/g) || "").length / 2 + (src.match(chs) || "").length;
}
const prefix = "marginnote3app://note/";
const chs = RegExp(/[\u4e00-\u9fa5]/g);
export const mnUrl = (id: string) => prefix + id;

const baseProps = (function () {
  let allProps: any[] = [],
    curr = {};
  do {
    let props = Object.getOwnPropertyNames(curr);
    props.forEach(function (prop) {
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
    props.forEach(function (prop) {
      if (allProps.indexOf(prop) === -1 && baseProps.indexOf(prop) === -1)
        allProps.push(prop);
    });
  } while ((curr = Object.getPrototypeOf(curr)));
  return allProps;
};

function isMbBookNote(obj: any): obj is MbBookNote{
  return (
    obj?.noteId !== undefined &&
    obj?.childNotes !== undefined &&
    Array.isArray(obj.childNotes)
  );
}

export function scanObject(obj: any, depth = 1): any {

  return obj.noteId;
  // function scan(obj: any, dive?: boolean, accu: number = 0): any {
  //   let out: any = {};
  //   if (typeof obj !=="object")
  //     for (const k of getAllProperties(obj)) {
  //       let value;
  //       if (accu < depth) {
  //         if (
  //           k === "parentNote" &&
  //           (dive === undefined || !dive) &&
  //           isMbBookNote(obj[k])
  //         )
  //           value = scan(obj[k], false, accu + 1);
  //         else if (
  //           k === "childNotes" &&
  //           (dive === undefined || dive) &&
  //           Array.isArray(obj[k])
  //         ) {
  //           value = (obj[k] as any[]).map((v) => scan(v, true, accu + 1));
  //         } 
  //         else if (k==="excerptPic") {
  //           value = scan(obj[k], false, accu + 1);
  //         } else value = obj[k];
  //       } else value = obj[k];
  //       Object.defineProperty(out, k, {
  //         value,
  //         writable: true,
  //         enumerable: true,
  //         configurable: true,
  //       });
  //     }
  //   return out;
  // }

  // return scan(obj);
}

export { showHUD, alert, copy, debug };

function showHUD(message: string, duration: number = 2) {
  Application.sharedInstance().showHUD(message, self.window, duration);
}

function alert(message: string) {
  Application.sharedInstance().alert(message);
}

/**
 * Copy to Clipboard
 */
function copy(content: string) {
  // @ts-ignore
  let pasteBoard = UIPasteboard.generalPasteboard();
  pasteBoard.string = content;
}

function debug(obj:any) {
  const replacer = (k:string, value:any) => {
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
}