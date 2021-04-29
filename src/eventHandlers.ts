import { PopupRecorder } from "modules/PopupRecorder";
import { copy, showHUD } from "modules/tools";
import { stringify } from "./modules/parser";

export function onPopupMenuOnNote(sender: NotifySender) {
  if (!Application.sharedInstance().checkNotifySenderInWindow(sender, self.window))
    return; //Don't process message from other window

  if (!self.plugin_on)
    return;

  if (self.recorder === undefined) {
    self.recorder = new PopupRecorder();
  }

  if (self.recorder.isDuplicate(Date.now()))
    return;

  const src = sender.userInfo.note;
  try {
    copy(stringify(src, self.recorder));
  } catch (error) {
    showHUD(error.toString());
  }
}

export function onPopupMenuOnSelection(sender: NotifySender) {
  if (!Application.sharedInstance().checkNotifySenderInWindow(sender, self.window))
    return; //Don't process message from other window

  // @ts-ignore
  if (!self.plugin_on)
    return;

  if (self.recorder === undefined) {
    self.recorder = new PopupRecorder();
  }

  const selection = sender.userInfo.documentController.selectionText;
  try {
    if (selection && selection.length) {
      copy(stringify({ sel: selection }, self.recorder));
    }
  } catch (error) {
    showHUD(error.toString());
  }
}
