import { NotifySender } from "@alx-plugins/marginnote";
import { showHUD } from "modules/tools";

export const pluginName = "obsidian-bridge";

export const toggleHandlerName = `toggle${pluginName}`;

export const addonOnName = `${pluginName}_on`;

export const togglePlugin = (sender: NotifySender) => {
  let lan = NSLocale.preferredLanguages().length
    ? NSLocale.preferredLanguages()[0].substring(0, 2)
    : "en";
  let cnTips, enTips;
  if (self[addonOnName]) {
    self[addonOnName] = false;
    cnTips = `${pluginName}已关闭`;
    enTips = `${pluginName}disabled`;
  } else {
    self[addonOnName] = true;
    cnTips = "启动";
    enTips = "enabled";
  }
  showHUD(lan === "zh" ? cnTips : enTips);
  NSUserDefaults.standardUserDefaults().setObjectForKey(
    self[addonOnName],
    `marginnote_${pluginName}`,
  );
  Application.sharedInstance()
    .studyController(self.window)
    .refreshAddonCommands();
};
