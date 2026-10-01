// 自研 AE 插件。截图放在 public/images/tools/，由真实插件界面截取
export interface ToolShot {
  thumb: string; // 卡片缩略图（16:9，从截图顶部裁出）
  srcSet: string;
  full: string; // 点击放大后的完整截图
  width: number; // 完整截图的原始尺寸，用来算弹窗比例
  height: number;
  alt: string;
}

export interface Tool {
  id: string;
  name: string;
  category: string;
  tagline: string;
  shot: ToolShot;
  features: string[];
  stats: { value: string; label: string }[];
}

export const toolsData: Tool[] = [
  {
    id: "toolbox",
    name: "工具箱X",
    category: "AE 自动化",
    tagline: "把 AE 里的重复操作做成一键完成。",
    shot: {
      thumb: "/images/tools/toolbox-thumb-800.webp",
      srcSet: "/images/tools/toolbox-thumb-800.webp 800w, /images/tools/toolbox-thumb-1183.webp 1183w",
      full: "/images/tools/toolbox-1183.webp",
      width: 1183,
      height: 1454,
      alt: "工具箱X 界面：素材替换面板和按分类整理的工具列表",
    },
    features: [
      "素材替换：按名称、前缀、顺序或合成名匹配，先扫描预览再批量换源",
      "批量操作：命名、删蒙版和效果、图层帧偏移、合成复制，集中在一个面板",
      "表达式库：13 类常用预设一键应用，复制图层组后还能批量修复引用",
      "跨合成联动：在主合成里移动素材，其他合成里的同一素材同步跟随",
    ],
    stats: [
      { value: "13", label: "类表达式预设" },
      { value: "189", label: "项自动化测试" },
      { value: "7", label: "次版本交付" },
    ],
  },
  {
    id: "reslib",
    name: "资源库X",
    category: "素材管理",
    tagline: "不用离开 AE，就能浏览和导入本地素材库。",
    shot: {
      thumb: "/images/tools/reslib-1100.webp",
      srcSet: "/images/tools/reslib-1100.webp 1100w, /images/tools/reslib-1600.webp 1600w",
      full: "/images/tools/reslib-2640.webp",
      width: 2640,
      height: 1485,
      alt: "资源库X 界面：素材卡片、文件夹树和序列帧识别",
    },
    features: [
      "卡片式浏览本地和共享素材库，图片、视频直接预览",
      "自动识别序列帧，连续编号的图片合成一组导入",
      "层级导入：保留文件夹结构，原样放进 AE 项目面板",
      "按文件名、路径或备注搜索，常用素材收藏置顶",
    ],
    stats: [
      { value: "50", label: "种可导入格式" },
      { value: "12", label: "层深度搜索" },
      { value: "6", label: "次版本交付" },
    ],
  },
];
