import React, { useCallback, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';
import Lightbox from './Lightbox';
import { AdVideo, adVideoUrl, adPoster, adLibraryUrl, formatDuration } from '../data/works';

// 投放过的广告素材。视频文件放在网站里，国内也能直接播放。
export default function AdShowcase({ ads }: { ads: AdVideo[] }) {
  const [active, setActive] = useState<AdVideo | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section className="space-y-5">
      <div className="px-1 space-y-1">
        <h2 className="text-[13px] font-semibold tracking-[0.06em] text-white/40">广告作品</h2>
        <p className="text-[15px] text-white/75">以下素材均在 Meta 平台（Facebook、Instagram 等）实际投放</p>
      </div>

      {/* 数量不满一行时居中，不留半边空白 */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {ads.map(ad => (
          <button
            key={ad.id}
            type="button"
            onClick={() => setActive(ad)}
            aria-label={`播放广告：${ad.game} · ${ad.label}`}
            className="glass group w-[calc(50%-0.375rem)] md:w-[calc(25%-0.75rem)] rounded-[1.4rem] p-1.5 text-left hover:-translate-y-1 transition-transform duration-500 ease-spring"
          >
            <div className="relative aspect-[9/16] rounded-[1.1rem] overflow-hidden bg-black">
              <img
                src={adPoster(ad.id, 400)}
                srcSet={`${adPoster(ad.id, 400)} 400w, ${adPoster(ad.id, 720)} 720w`}
                sizes="(min-width: 768px) 25vw, 50vw"
                width={400}
                height={711}
                loading="lazy"
                decoding="async"
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-spring"
              />
              <span className="glass glass-strong absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-spring">
                <Play className="w-5 h-5 fill-white translate-x-px" />
              </span>
              <span className="glass glass-strong absolute bottom-2.5 right-2.5 rounded-full px-2 py-0.5 text-[11px] font-medium text-white/90 tabular-nums">
                {formatDuration(ad.duration)}
              </span>
            </div>
            {/* 说明文字放在画面外面，避免和素材自带的字幕叠在一起 */}
            <div className="px-2 pt-2.5 pb-1.5">
              <p className="text-[14px] font-semibold">{ad.game}</p>
              <p className="text-[12px] text-white/55">{ad.label}</p>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <Lightbox
            key={active.id}
            title={`${active.game} · ${active.label}`}
            onClose={close}
            externalUrl={adLibraryUrl(active.id)}
            externalLabel="在 Meta 广告库查看"
          >
            <video
              src={adVideoUrl(active.id)}
              poster={adPoster(active.id, 720)}
              className="absolute inset-0 w-full h-full object-contain"
              controls
              autoPlay
              playsInline
            />
          </Lightbox>
        )}
      </AnimatePresence>
    </section>
  );
}
