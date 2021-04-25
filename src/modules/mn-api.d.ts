export class MbBookNote {
  excerptText?: string;
  noteTitle?: string;
  /**int */
  colorIndex: number;
  /**int */
  fillIndex: number;
  /**CGPoint */
  mindmapPosition: unknown;

  readonly noteId?: string;
  readonly docMd5?: string;
  readonly notebookId?: string;
  readonly startPage?: number;
  readonly endPage?: number;
  readonly startPos?: string;
  readonly endPos?: string;
  readonly excerptPic?: excerptPic;
  readonly createDate?: Date;
  readonly modifiedDate?: Date;
  readonly mediaList?: string;
  readonly originNoteId?: string;
  readonly mindmapBranchClose?: number;
  readonly notesText?: string;
  readonly groupNoteId?: string;

  readonly comments: noteComment[];

  readonly parentNote?: MbBookNote;
  readonly linkedNotes: LinkedNote[];
  readonly childNotes: MbBookNote[];
  /**
   * Array of summarized note-id
   */
  readonly summaryLinks: string[];

  readonly zLevel?: number;
  readonly hidden?: number;
  readonly toc?: number;
  readonly annotation?: number;
  readonly textFirst?: number;
  readonly groupMode?: number;
  readonly flashcard?: number;
  readonly summary: boolean;
  readonly flagged?: number;
  readonly textHighlight?: {
    "highlight_text": string,
    "coords_hash": string
  }; 
  readonly options?: unknown; //Dic

  paste(): void;
  clearFormat(): void;
  allNoteText(): string | undefined;
  merge(note: MbBookNote | undefined): void;
  appendHtmlComment(html?: string, text?: string, tag?: string): void;

  appendTextComment(text: string | undefined): void;
  appendNoteLink(note: MbBookNote | undefined): void;
  removeCommentByIndex(index: number): void;
  static createWithTitle(
    title?: string,
    topic?: MbTopic,
    book?: MbBook
  ): MbBookNote | undefined;
}

export class MbTopic {}

export class MbBook {}

export interface pic {
  paint: string;
  size: unknown;
}

export interface excerptPic extends pic{
  selLst: {
    [key: number]: {
      rotation: number;
      imgRect: unknown;
      rect: unknown;
      pageNo: number;
    };
  };
}

export type noteComment =
  | textComment
  | htmlComment
  | linkComment
  | paintComment;
/**
 * 基本的Comment，合并Note时其title也被合并为此类型
 */
export interface textComment {
  type: "TextNote";
  text: string;
  /**为被合并Note的内容时存在*/
  noteid?: string;
}
/**
 * 复制html内容进Note时产生
 */
export interface htmlComment {
  type: "HtmlNote";
  htmlSize: unknown; //an unknown //Dic
  rtf: unknown; //an unknown //Dic
  html: string;
  text: string;
  /**为被合并Note的内容时存在*/
  noteid?: string;
}
/**
 * 合并Note时产生
 */
export type linkComment = linkComment_text | linkComment_pic;

export interface linkComment_text {
  type: "LinkNote";
  noteid: string;
  q_htext: textComment["text"];
}

export interface linkComment_pic {
  type: "LinkNote";
  noteid: string;
  q_htext?: textComment["text"];
  q_hpic: pic;
}

export interface paintComment extends pic 
{
  type: "PaintNote";
}

export interface LinkedNote {
  summary: boolean,
  noteid: string,
  linktext: string
}