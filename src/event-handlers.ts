import {
  ChangeExcerptRange_Sender,
  DocumentController,
  EventHandler,
  NotifySender,
  PopupMenuOnNote_Sender,
  PopupMenuOnSelection_Sender,
  ProcessNewExcerpt_Sender,
} from "@alx-plugins/marginnote";
import PopupRecorder from "modules/PopupRecorder";
import { showHUD } from "modules/tools";
import { addonOnName } from "togglePlugin";

import { handleNote, handleSel, handleToc } from "./modules/parser";

export const onPopupMenuOnNote = (sender: PopupMenuOnNote_Sender) => {
  if (
    !Application.sharedInstance().checkNotifySenderInWindow(sender, self.window)
  )
    return; //Don't process message from other window

  if (!self[addonOnName]) return;

  if (self.recorder === undefined) {
    self.recorder = new PopupRecorder();
  }

  if (!sender.userInfo.note) {
    showHUD("Error: No note in sender");
    return;
  }

  try {
    if (self.recorder.isDuplicate(Date.now())) return;

    const note = sender.userInfo.note;

    self.tocMode ? handleToc(note) : handleNote(note);
  } catch (error) {
    showHUD(error.toString());
  }
};

export const onPopupMenuOnSelection = (sender: PopupMenuOnSelection_Sender) => {
  if (
    !Application.sharedInstance().checkNotifySenderInWindow(sender, self.window)
  )
    return; //Don't process message from other window

  if (!self[addonOnName] || self.tocMode) return;

  if (self.recorder === undefined) {
    self.recorder = new PopupRecorder();
  }

  try {
    const { selectionText: sel, document: book } =
      sender.userInfo.documentController;
    if (sel && sel.length) {
      handleSel({ sel, book });
    }
  } catch (error) {
    showHUD(error.toString());
  }
};

type HanlderBasic<T extends NotifySender> = {
  handler: EventHandler<T>;
  event: T["name"];
};

type Hanlder =
  | HanlderBasic<PopupMenuOnSelection_Sender>
  | HanlderBasic<ProcessNewExcerpt_Sender>
  | HanlderBasic<ChangeExcerptRange_Sender>
  | HanlderBasic<PopupMenuOnNote_Sender>;

export const bindEventHandlers = (
  handlerList: Hanlder[],
): {
  add: () => void;
  remove: () => void;
  handlers: { [k: string]: (sender: any) => void };
} => {
  const handlers: { [k: string]: (sender: any) => void } = {};
  handlerList.forEach((v) => {
    handlers["on" + v.event] = v.handler;
  });

  const add = () => {
    handlerList.forEach((v) => {
      NSNotificationCenter.defaultCenter().addObserverSelectorName(
        self,
        `on${v.event}:`,
        v.event,
      );
    });
  };

  const remove = () => {
    handlerList.forEach((v) => {
      NSNotificationCenter.defaultCenter().removeObserverName(self, v.event);
    });
  };

  return { add, remove, handlers };
};
