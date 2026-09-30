import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { VariantVideo, variantVideoUrl, variantPoster } from '../data/works';

function VariantCard({ variant }: { variant: VariantVideo }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  // 滚动到可见区域才播放，离开就暂停，省流量也省电
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const toggleMute = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    if (!el.muted) el.play().catch(() => {});
  };

  return (
    <div className="glass rounded-[2rem] p-2.5 space-y-3">
      <div className="flex items-start justify-between gap-4 px-3 pt-2">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold tracking-tight">{variant.title}</h3>
          <p className="text-[14px] text-white/55">{variant.desc}</p>
        </div>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? '打开声音' : '静音'}
          aria-pressed={!muted}
          className="glass glass-strong shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white active:scale-90 transition-transform"
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
      {/* 手机上 5 个画面太窄，给个最小宽度，左右滑动查看 */}
      <div className="overflow-x-auto rounded-[1.5rem]">
        <div className="min-w-[720px] aspect-[45/16] rounded-[1.5rem] overflow-hidden bg-black">
          <video
            ref={ref}
            src={variantVideoUrl(variant.id)}
            poster={variantPoster(variant.id)}
            muted
            loop
            playsInline
            preload="none"
            controls={reduced}
            aria-label={`${variant.title}：${variant.desc}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default function VariantShowcase({ variants }: { variants: VariantVideo[] }) {
  return (
    <section className="space-y-5">
      <div className="px-1 space-y-1">
        <h2 className="text-[13px] font-semibold tracking-[0.06em] text-white/40">AI 批量变体</h2>
        <p className="text-[15px] text-white/75">同一条素材用 AI 批量生成多个版本，用于投放测试</p>
      </div>
      {variants.map(v => (
        <VariantCard key={v.id} variant={v} />
      ))}
      <p className="md:hidden text-[12px] text-white/35 px-1">视频可以左右滑动查看全部版本。</p>
    </section>
  );
}
