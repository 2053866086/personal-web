import React, { useCallback, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ArrowUpRight, Play } from 'lucide-react';
import Lightbox from './Lightbox';
import { ShortsChannel, Short, shortThumb, shortEmbedUrl, shortPageUrl, formatViews } from '../data/works';

export default function ShortsShowcase({ channel }: { channel: ShortsChannel }) {
  const [active, setActive] = useState<Short | null>(null);
  // 保持引用稳定，避免弹窗里的 effect 反复重跑
  const close = useCallback(() => setActive(null), []);

  return (
    <section className="space-y-5">
      <div className="px-1 space-y-1">
        <h2 className="text-[13px] font-semibold tracking-[0.06em] text-white/40">YouTube Shorts</h2>
        <p className="text-[15px] text-white/75">{channel.role}</p>
      </div>

      <a
        href={channel.url}
        target="_blank"
        rel="noopener noreferrer"
        className="glass group flex items-center gap-4 rounded-[2rem] p-3 pr-4 sm:pr-6"
      >
        <img
          src={channel.avatar}
          width={96}
          height={96}
          alt=""
          className="w-14 h-14 rounded-full ring-1 ring-white/15 shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-lg font-semibold tracking-tight truncate">{channel.name}</p>
          <p className="text-[13px] text-white/50">
            YouTube · {channel.subscribers} 订阅 · {channel.videoCount.toLocaleString()} 个视频
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-white text-black text-[13px] font-semibold shrink-0 group-hover:bg-white/85 transition-colors">
          访问频道
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
        <ArrowUpRight className="sm:hidden w-5 h-5 text-white/50 shrink-0" />
      </a>

      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {channel.shorts.map(short => (
          <button
            key={short.id}
            type="button"
            onClick={() => setActive(short)}
            aria-label={`播放短视频：${short.title}`}
            className="glass group rounded-[1.4rem] p-1.5 text-left hover:-translate-y-1 transition-transform duration-500 ease-spring"
          >
            <div className="relative aspect-[9/16] rounded-[1.1rem] overflow-hidden bg-black">
              <img
                src={shortThumb(short.id)}
                width={400}
                height={711}
                loading="lazy"
                decoding="async"
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-spring"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <span className="glass glass-strong absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-spring">
                <Play className="w-4 h-4 fill-white translate-x-px" />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-2.5 md:p-3 space-y-1">
                <p className="hidden md:block text-[12px] font-medium leading-snug text-white/90 line-clamp-2">
                  {short.title}
                </p>
                <p className="inline-flex items-center gap-1 text-[11px] text-white/70 tabular-nums">
                  <Play className="w-2.5 h-2.5 fill-white/70" />
                  {formatViews(short.views)}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <p className="text-[12px] text-white/35 px-1">视频托管在 YouTube，中国大陆地区需要能访问 YouTube 才能播放。</p>

      <AnimatePresence>
        {active && (
          <Lightbox
            key={active.id}
            title={active.title}
            onClose={close}
            externalUrl={shortPageUrl(active.id)}
            externalLabel="在 YouTube 打开"
          >
            <iframe
              src={shortEmbedUrl(active.id)}
              title={active.title}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </Lightbox>
        )}
      </AnimatePresence>
    </section>
  );
}
