import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { WorkVideo, bilibiliEmbedUrl, formatDuration, workImage, workImageSrcSet } from '../data/works';

// 先显示封面和播放按钮，点击后才加载 B 站播放器。
// 播放器本身有好几 MB 的脚本，直接嵌入会拖慢整个页面。
export default function VideoEmbed({ video, image, title }: { video: WorkVideo; image: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-black">
      {playing ? (
        <iframe
          src={bilibiliEmbedUrl(video)}
          title={`${title}（B 站视频）`}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`播放视频：${title}`}
          className="group absolute inset-0 w-full h-full cursor-pointer"
        >
          <img
            src={workImage(image, 1600)}
            srcSet={workImageSrcSet(image)}
            sizes="(min-width: 1024px) 1024px, 100vw"
            width={1600}
            height={900}
            alt=""
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1.2s] ease-spring"
          />
          <span className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors duration-500" />
          <span className="glass glass-strong absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ease-spring">
            <Play className="w-8 h-8 md:w-9 md:h-9 text-white fill-white translate-x-0.5" />
          </span>
          <span className="glass glass-strong absolute bottom-4 left-4 rounded-full px-3 py-1 text-[12px] font-medium text-white/90 tabular-nums">
            {formatDuration(video.duration)}
          </span>
        </button>
      )}
    </div>
  );
}
