import { ClsMembers, InstMembers } from "@alx-plugins/marginnote";
import { getObjCClassDeclar as getDeclar } from "modules/tools";
import {
  addonOnName,
  pluginName,
  toggleHandlerName,
  togglePlugin,
} from "togglePlugin";

import {
  bindEventHandlers,
  onPopupMenuOnNote,
  onPopupMenuOnSelection,
} from "./eventHandlers";

const bindEvt = bindEventHandlers([
  { event: "PopupMenuOnSelection", handler: onPopupMenuOnSelection },
  { event: "PopupMenuOnNote", handler: onPopupMenuOnNote },
]);

const inst: InstMembers = {
  ...bindEvt.handlers,
  notebookWillOpen: (notebookid) => {
    bindEvt.add();
    self[addonOnName] = NSUserDefaults.standardUserDefaults().objectForKey(
      `marginnote_${pluginName}`,
    );
  },
  notebookWillClose: (notebookid) => {
    bindEvt.remove();
  },
  queryAddonCommandStatus: () => {
    if (Application.sharedInstance().studyController(self.window).studyMode < 3)
      return {
        image: "title.png",
        object: self,
        selector: toggleHandlerName + ":",
        checked: self[addonOnName] ? true : false,
      };
    return null;
  },
  [toggleHandlerName]: togglePlugin,
};

const cls: ClsMembers = {};

JSB.newAddon = (mainPath) =>
  JSB.defineClass(getDeclar(pluginName, "JSExtension"), inst, cls);
