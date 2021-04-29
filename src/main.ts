
import { InstMembers, NotifySender, ClsMembers } from "@alx-plugins/marginnote";
import { getObjCClassDeclar as getDeclar, showHUD } from "modules/tools";
import { bindEventHandlers, onPopupMenuOnNote, onPopupMenuOnSelection } from "./eventHandlers";

const pluginName = "obsidian-bridge";

const bindEvt = bindEventHandlers([
  { event: "PopupMenuOnSelection", handler: onPopupMenuOnSelection },
  { event: "PopupMenuOnNote", handler: onPopupMenuOnNote },
]);

const inst: InstMembers = {
  ...bindEvt.handlers,
  notebookWillOpen(notebookid) {
    bindEvt.add();
    self.plugin_on = NSUserDefaults.standardUserDefaults().objectForKey(
      `marginnote_${pluginName}`
    );
  },
  notebookWillClose(notebookid) {
    bindEvt.remove();
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
    var lan = NSLocale.preferredLanguages().length
      ? NSLocale.preferredLanguages()[0].substring(0, 2)
      : "en";
    let cnTips, enTips;
    if (self.plugin_on) {
      self.plugin_on = false;
      cnTips = `${pluginName}已关闭`;
      enTips = `${pluginName}disabled`;
    } else {
      self.plugin_on = true;
      cnTips = "启动";
      enTips = "enabled";
    }
    showHUD(lan === "zh" ? cnTips : enTips);
    NSUserDefaults.standardUserDefaults().setObjectForKey(
      self.plugin_on,
      `marginnote_${pluginName}`
    );
    Application.sharedInstance()
      .studyController(self.window)
      .refreshAddonCommands();
  }
};

const cls: ClsMembers = {};

JSB.newAddon = function (mainPath) {
  return JSB.defineClass(getDeclar(pluginName,"JSExtension"), inst, cls);
};


