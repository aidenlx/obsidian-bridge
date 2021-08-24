import compareVersions from "compare-versions";

const version = "2.2.1";
export const VERSION: string = version;
export const PREFIX = `<!--MN^${version}-->\n`;
export const PREFIX_REGEX = /^<!--MN\^([\d.]+)-->\n/;

/**
 * @returns null if invaild, 1 if given higher version, -1 if given lower version
 */
export const checkVersion = (
  verStr: string,
  toCompare?: string,
): number | null => {
  if (toCompare && !compareVersions.validate(toCompare)) {
    console.error("invaild version given to compare: " + toCompare);
    return null;
  }
  let ver: string, match;
  if ((match = verStr.match(PREFIX_REGEX))) {
    ver = match[1];
  } else ver = verStr;
  if (compareVersions.validate(ver)) {
    return compareVersions(ver, toCompare ?? version);
  } else {
    console.error("invaild version %s extracted from %s", ver, verStr);
    return null;
  }
};
