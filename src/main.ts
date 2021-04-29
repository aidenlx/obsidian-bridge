/// <reference types="@alx-plugins/marginnote" />

import { getObjCClassDeclar as getDeclar, showHUD } from "modules/tools";
import { onPopupMenuOnNote, onPopupMenuOnSelection } from "./eventHandlers";

const pluginName = "obsidian-bridge";

const inst: InstMembers = {
  notebookWillOpen(notebookid) {
    NSNotificationCenter.defaultCenter().addObserverSelectorName(
      self,
      "onPopupMenuOnNote:",
      "PopupMenuOnNote"
    );
    NSNotificationCenter.defaultCenter().addObserverSelectorName(
      self,
      "onPopupMenuOnSelection:",
      "PopupMenuOnSelection"
    );
    self.plugin_on = NSUserDefaults.standardUserDefaults().objectForKey(
      `marginnote_${pluginName}`
    );
  },
  notebookWillClose(notebookid) {
    NSNotificationCenter.defaultCenter().removeObserverName(
      self,
      "PopupMenuOnNote"
    );
    NSNotificationCenter.defaultCenter().removeObserverName(
      self,
      "PopupMenuOnSelection"
    );
  },
  queryAddonCommandStatus() {
    if (Application.sharedInstance().studyController(self.window).studyMode < 3)
      return {
        image: "title.png",
        object: self,
        selector: "togglePlugin:",
        // @ts-ignore
        checked: self.plugin_on ? true : false,
      };
    return null;
  },
  togglePlugin: function (sender: NotifySender) {
    // @ts-ignore
    var lan = NSLocale.preferredLanguages().length
      ? // @ts-ignore
        NSLocale.preferredLanguages()[0].substring(0, 2)
      : "en";
    let cnTips, enTips;
    // @ts-ignore
    if (self.plugin_on) {
      // @ts-ignore
      self.plugin_on = false;
      cnTips = `${pluginName}已关闭`;
      enTips = `${pluginName}disabled`;
    } else {
      // @ts-ignore
      self.plugin_on = true;
      cnTips = "启动";
      enTips = "enabled";
    }
    showHUD(lan === "zh" ? cnTips : enTips);
    // @ts-ignore
    NSUserDefaults.standardUserDefaults().setObjectForKey(
      // @ts-ignore
      self.plugin_on,
      `marginnote_${pluginName}`
    );
    Application.sharedInstance()
      .studyController(self.window)
      // @ts-ignore
      .refreshAddonCommands();
  },
  onPopupMenuOnNote,
  onPopupMenuOnSelection
};

const cls: ClsMembers = {};

JSB.newAddon = function (mainPath) {
  return JSB.defineClass(getDeclar(pluginName,"JSExtension"), inst, cls);
};


