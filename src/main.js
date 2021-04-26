// @ts-check
import { stringify } from "./modules/parser";
import { PopupRecorder } from "./modules/PopupRecorder";
import { scanObject } from "./modules/tools";


/**
 *
 * @param {string} message
 * @param {number} duration
 */
function showHUD(message, duration = 2) {
  // @ts-ignore
  Application.sharedInstance().showHUD(message, self.window, duration);
}

/**
 *
 * @param {string} message
 */
function alert(message) {
  // @ts-ignore
  Application.sharedInstance().alert(message);
}

/**
 * Copy to Clipboard
 * @param {string} content
 */
function copy(content) {
  // @ts-ignore
  let pasteBoard = UIPasteboard.generalPasteboard();
  pasteBoard.string = content;
}

function debug(obj) {
  const replacer = (k, value) => {
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

const pluginName = "obsidian-bridge";

JSB.newAddon = function (mainPath) {
  // @ts-ignore
  let newAddonClass = JSB.defineClass(
    `${pluginName} : JSExtension`,
    /*Instance members*/ {
      //Window initialize
      sceneWillConnect: function () {
        // @ts-ignore
        self.webController = WebViewController.new();
      },
      //Window disconnect
      sceneDidDisconnect: function () {},
      //Window resign active
      sceneWillResignActive: function () {},
      //Window become active
      sceneDidBecomeActive: function () {},
      notebookWillOpen: function (notebookid) {
        // @ts-ignore
        NSNotificationCenter.defaultCenter().addObserverSelectorName(
          self,
          "onPopupMenuOnNote:",
          "PopupMenuOnNote"
        );
        // @ts-ignore
        NSNotificationCenter.defaultCenter().addObserverSelectorName(
          self,
          "onPopupMenuOnSelection:",
          "PopupMenuOnSelection"
        );
        // @ts-ignore
        self.plugin_on = NSUserDefaults.standardUserDefaults().objectForKey(
          `marginnote_${pluginName}`
        );
      },
      notebookWillClose: function (notebookid) {
        // @ts-ignore
        NSNotificationCenter.defaultCenter().removeObserverName(
          self,
          "PopupMenuOnNote"
        );
        // @ts-ignore
        NSNotificationCenter.defaultCenter().removeObserverName(
          self,
          "PopupMenuOnSelection"
        );
      },
      documentDidOpen: function (docmd5) {},
      documentWillClose: function (docmd5) {},
      controllerWillLayoutSubviews: function (controller) {},
      queryAddonCommandStatus: function () {
        // @ts-ignore
        if (Application.sharedInstance().studyController(self.window).studyMode < 3 )
          return {
            image: "title.png",
            object: self,
            selector: "togglePlugin:",
            // @ts-ignore
            checked: self.plugin_on ? true : false,
          };
        return null;
      },
      onPopupMenuOnNote: function (sender) {
        // @ts-ignore
        if (!Application.sharedInstance().checkNotifySenderInWindow(sender,self.window))
          return; //Don't process message from other window
        // @ts-ignore
        if (!self.plugin_on) return;

        if (this.recorder === undefined) {
          this.recorder = new PopupRecorder();
        }

        if (this.recorder.isDuplicate(Date.now())) return;

        /** @type {import("marginnote").MbBookNote} */
        const src = sender.userInfo.note;
        try {
          copy(stringify(src,this.recorder));
        } catch (error) {
          showHUD(error.toString());
        }

      },
      onPopupMenuOnSelection: function (sender) {
        // @ts-ignore
        if (!Application.sharedInstance().checkNotifySenderInWindow(sender,self.window))
          return; //Don't process message from other window
        // @ts-ignore
        if (!self.plugin_on) return;

        if (this.recorder === undefined) {
          this.recorder = new PopupRecorder();
        }

        let selection = sender.userInfo.documentController.selectionText;
        try {
          if (selection && selection.length) {
            copy(stringify(selection,this.recorder));
          }
        } catch (error) {
          showHUD(error.toString());
        }

      },
      togglePlugin: function (sender) {
        // @ts-ignore
        var lan = NSLocale.preferredLanguages().length
        // @ts-ignore
          ? NSLocale.preferredLanguages()[0].substring(0, 2)
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
        // @ts-ignore
        Application.sharedInstance()
          .studyController(self.window)
          .refreshAddonCommands();
      },
    },
    /*Class members*/ {
      addonDidConnect: function () {},
      addonWillDisconnect: function () {},
      applicationWillEnterForeground: function () {},
      applicationDidEnterBackground: function () {},
      applicationDidReceiveLocalNotification: function (notify) {},
    }
  );
  return newAddonClass;
};
