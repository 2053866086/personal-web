// 图片放在 public/images/，每张有 800w 和 1600w 两个 WebP 尺寸
export const workImage = (name: string, width: 800 | 1600) => `/images/${name}-${width}.webp`;
export const workImageSrcSet = (name: string) =>
  `${workImage(name, 800)} 800w, ${workImage(name, 1600)} 1600w`;

// B 站视频：aid / bvid / cid 从 B 站"分享 → 嵌入代码"里的 iframe 地址复制
export interface WorkVideo {
  bvid: string;
  aid: string;
  cid: string;
  duration: number; // 秒
}

export interface Work {
  id: string;
  title: string;
  category: string;
  image: string;
  tags: string[];
  description: string;
  details: string[];
  video?: WorkVideo;
  channel?: ShortsChannel;
}

// YouTube Shorts：封面已下载到 public/images/shorts/，国内打不开 YouTube 时也能看到封面
export interface Short {
  id: string; // YouTube 视频 ID
  title: string;
  views: number;
}

export interface ShortsChannel {
  name: string;
  url: string;
  avatar: string;
  role: string; // 我在这个账号里负责的部分
  subscribers: string; // 快照数据，不会自动更新
  videoCount: number;
  shorts: Short[];
}

export const shortThumb = (id: string) => `/images/shorts/short-${id}.webp`;
export const shortEmbedUrl = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0&modestbranding=1`;
export const shortPageUrl = (id: string) => `https://www.youtube.com/shorts/${id}`;
export const formatViews = (n: number) => (n >= 10000 ? `${(n / 10000).toFixed(1)}万` : `${n}`);

export const bilibiliEmbedUrl = (v: WorkVideo) => {
  const params = new URLSearchParams({
    isOutside: 'true',
    aid: v.aid,
    bvid: v.bvid,
    cid: v.cid,
    p: '1',
    autoplay: '1', // 播放器只在点击后才加载，所以直接自动播放
    danmaku: '0',
    high_quality: '1',
  });
  return `https://player.bilibili.com/player.html?${params}`;
};
export const bilibiliPageUrl = (v: WorkVideo) => `https://www.bilibili.com/video/${v.bvid}`;
export const formatDuration = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export const worksData: Work[] = [
  {
    id: "overseas-growth",
    title: "海外增长视频矩阵",
    category: "AI + 视频制作",
    image: "overseas-growth",
    tags: ["Stable Diffusion", "After Effects", "Figma"],
    description: "为 Pawdoku、Mahjong Master、Tile Home、Arrows 等休闲益智手游制作海外买量视频广告。结合 Stable Diffusion 与 After Effects，搭建起一套可批量产出的广告素材矩阵，大幅提升了素材产出效率，并有效提高了目标市场的用户转化率。",
    details: [
      "用 AI 批量生成广告素材，不再受实拍条件的限制。",
      "建立标准化的 Figma to AE 动效工作流，让不同游戏的素材能快速复用和迭代。",
      "针对 TikTok、Instagram Reels 等海外平台，做本地化的视觉优化。"
    ]
  },
  {
    id: "ip-building",
    title: "百万级新媒体IP打造",
    category: "内容策划与视觉",
    image: "ip-building",
    channel: {
      name: "Maggie姐在西雅图",
      url: "https://www.youtube.com/@seattlemaggiesun/shorts",
      avatar: "/images/maggie-avatar.webp",
      role: "负责 Shorts 的策划、剪辑与运营",
      subscribers: "2.7万",
      videoCount: 1964,
      // 频道里播放量最高的 6 条 Shorts
      shorts: [
        { id: "5wk_KNs_-sE", title: "买了未必觉得值得，大西雅图六个贵社区！", views: 6494 },
        { id: "UtwXIuh-EVg", title: "全美房价40万，为什么不能信？", views: 4437 },
        { id: "-qC1g4vlics", title: "现在能买房么？就看这四点！", views: 4144 },
        { id: "IAar96kFveU", title: "西雅图东区各城市打分，你的城市能拿几分？", views: 3206 },
        { id: "WS-Z15o5mWI", title: "西雅图会不会重演2008年", views: 2825 },
        { id: "Pd0quD7SVt4", title: "西雅图奶茶店从夯到拉排名！", views: 2764 },
      ],
    },
    tags: ["内容运营", "视觉设计", "数据分析"],
    description: "专注房产领域的新媒体 IP 打造，覆盖国内抖音与海外 YouTube 两个平台。从选题策划、剪辑到账号运营全程参与，依靠清晰的人设和统一的视觉风格，让账号从零起步，持续产出高播放量的内容。",
    details: [
      "从零孵化一位抖音房产博主，账号积累数万粉丝，单条视频单日播放量突破百万。",
      "负责西雅图房产经纪人 Maggie 的 YouTube 频道，承担 Shorts 的策划、剪辑与运营。",
      "制定 IP 视觉规范（色彩、排版、动态元素），让内容在各平台保持一致的辨识度。",
      "根据播放数据持续迭代选题和剪辑节奏，并针对不同平台调整分发策略。"
    ]
  },
  {
    id: "ue5-environment",
    title: "虚幻5CG制作",
    category: "3D CG 动画",
    image: "ue5-environment",
    video: { bvid: "BV1bwQWYnE5Z", aid: "114149862410415", cid: "28867233246", duration: 82 },
    tags: ["Unreal Engine 5", "Sequencer", "Lumen", "镜头语言"],
    description: "基于 Unreal Engine 5 打造的高品质 CG 动画短片。涵盖了从资产搭建、材质灯光、镜头设计到最终渲染输出的完整 CG 制作流程，展现了史诗级的视觉效果。",
    details: [
      "利用 Sequencer 进行电影级镜头调度与动画序列制作。",
      "结合 Lumen 全局光照与 Nanite 虚拟微多边形几何体，实现影视级画面质感。",
      "负责场景搭建、氛围营造及后期特效合成，把控整体视觉呈现。"
    ]
  },
  {
    id: "brand-visual",
    title: "AIGC内容",
    category: "分镜设计",
    image: "ai-comic",
    video: { bvid: "BV1ASaf6dEXi", aid: "117360283354294", cid: "42343926938", duration: 61 },
    tags: ["Midjourney", "Stable Diffusion", "后期剪辑"],
    description: "以 AI 生成技术为核心的内容创作实践。覆盖创意策划、分镜设计、AI 画面与视频生成到后期剪辑合成的完整流程，探索 AIGC 在视频内容生产中的效率与表现力。",
    details: [
      "从创意与脚本出发进行分镜设计，把控整体视觉风格与叙事节奏。",
      "使用 Seedance 2、Stable Diffusion 等工具生成角色、场景与动态画面，保持风格与角色一致性。",
      "结合后期剪辑软件完成动效、音效与字幕合成，输出完整成片。"
    ]
  }
];
