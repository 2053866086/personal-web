import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Play, X } from 'lucide-react';
import { ShortsChannel, Short, shortThumb, shortEmbedUrl, shortPageUrl, formatViews } from '../data/works';

const EASE = [0.22, 1, 0.36, 1] as const;

// 竖屏短视频弹窗：点击封面后才加载 YouTube 播放器
function ShortLightbox({ short, onClose }: { short: Short; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus();
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={short.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label="关闭"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-xl cursor-default"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative flex flex-col items-center gap-4"
      >
        {/* 宽度按 9:16 由可用高度推出来，手机上也不会超出屏幕 */}
        <div className="glass rounded-[2rem] p-2 w-[min(calc(100vw-2rem),calc((100dvh-9rem)*9/16),420px)]">
          <div className="relative aspect-[9/16] rounded-[1.6rem] overflow-hidden bg-black">
            <iframe
              src={shortEmbedUrl(short.id)}
              title={short.title}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={shortPageUrl(short.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="glass glass-strong inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-[13px] font-medium text-white/80 hover:text-white transition-colors"
          >
            在 YouTube 打开
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="关闭"
            className="glass glass-strong w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white active:scale-90 transition-transform"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

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
        {active && <ShortLightbox key={active.id} short={active} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
