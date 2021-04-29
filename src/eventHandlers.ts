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

  const srcNote = sender.userInfo.note;
  let currentBook;
  
  if (!srcNote) {
    showHUD("no note in sender");
    return;
  }

  if (srcNote.docMd5)   
    currentBook= Database.sharedInstance().getDocumentById(srcNote.docMd5);

  try {
    copy(stringify(srcNote,self.recorder,currentBook));
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

  const { selectionText: selection, document: currentBook } = sender.userInfo
    .documentController as DocumentController;
  
  try {
    if (selection && selection.length) {
      copy(stringify({ sel: selection }, self.recorder, currentBook));
    }
  } catch (error) {
    showHUD(error.toString());
  }
}
