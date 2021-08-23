import { NotifySender } from "@alx-plugins/marginnote";
import { showHUD } from "modules/tools";
import gt from "modules/translate";

export const pluginName = "obsidian-bridge";

export const toggleHandlerName = `toggle${pluginName}`;

export const addonOnName = `${pluginName}_on`;

export const togglePlugin = (sender: NotifySender) => {
  // let app = Application.sharedInstance();
  // app.studyController(self.window).refreshAddonCommands();
  // if (
  //   app.queryCommandWithKeyFlagsInWindow("p", 0x100000, self.window).disabled
  // ) {
  //   return;
  // }
  const toggleAddon = () => {
    self[addonOnName] = !self[addonOnName];
    NSUserDefaults.standardUserDefaults().setObjectForKey(
      self[addonOnName],
      `marginnote_${pluginName}`,
    );
    Application.sharedInstance()
      .studyController(self.window)
      .refreshAddonCommands();
  };

  if (!self[addonOnName]) {
    toggleAddon();
    showHUD(gt("hint_addon_enabled"));
  } else
    UIAlertView.showWithTitleMessageStyleCancelButtonTitleOtherButtonTitlesTapBlock(
      gt("toggle_title"),
      "",
      UIAlertViewStyle.Default,
      gt("cancel"),
      [
        (self.tocMode ? gt("off") : gt("on")) + gt("toc"),
        (self[addonOnName] ? gt("off") : gt("on")) + gt("addon"),
      ],
      (alert, buttonIndex) => {
        switch (buttonIndex) {
          case 1:
            self.tocMode = !self.tocMode;
            if (self.tocMode) showHUD(gt("toggle_desc_toc_on"));
            break;
          case 2:
            toggleAddon();
            showHUD(gt("addon") + gt("disabled"));
            break;
          case 0:
            break;
          default:
            JSB.log(
              "🌈🌈🌈 MNLOG tapBlock: Unexpected button pressed %o",
              alert.buttonTitleAtIndex(buttonIndex),
            );
            break;
        }
      },
    );
};
