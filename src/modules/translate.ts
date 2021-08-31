const text = {
  toggle_title: ["操作", "Actions"],
  toggle_desc_toc_on: [
    "现在点击卡片可获取其下所有笔记以在Obsidian生成目录",
    "tap/click on parent note can now recursively fetch all children notes to generate toc in Obsidian",
  ],
  hint_toc_success: [
    "成功从该笔记获得目录：",
    "Successfully fetch toc from note: ",
  ],
  warn_toc_enabled: [
    "⚠️仍处于获取目录模式",
    "⚠️Fetch TOC Mode is still enabled",
  ],
  hint_addon_enabled: [
    "注意：该插件启用时，选择文本或笔记均会唤醒Obsidian",
    "Note: With addon enabled, selecting text or notes will open Obsidian",
  ],
  off: ["⛔️关闭", "⛔️Disable "],
  on: ["✅开启", "✅Enable "],
  disabled: ["已关闭", " Disabled"],
  enabled: ["已开启", " Enabled"],
  toc: ["获取目录模式", "TOC Fetch Mode"],
  addon: ["Obsidian Bridge", "Obsidian Bridge"],
  cancel: ["取消", "Cancel"],
  missing_param: ["笔记缺少参数", "Missing params"],
};

const getLanguage = () =>
  NSLocale.preferredLanguages().length
    ? NSLocale.preferredLanguages()[0].substring(0, 2)
    : "en";
const getText = (key: keyof typeof text) =>
  getLanguage() === "zh" ? text[key][0] : text[key][1];

export default getText;
