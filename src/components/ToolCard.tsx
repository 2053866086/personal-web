import React, { useCallback, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Check, Maximize2 } from 'lucide-react';
import Lightbox from './Lightbox';
import { Tool } from '../data/tools';

// 自研插件卡片：结构和作品卡片一致，截图点击后放大查看
export default function ToolCard({ tool }: { tool: Tool }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const { shot } = tool;

  return (
    <div className="glass h-full rounded-[2rem] p-2.5">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`放大查看 ${tool.name} 界面截图`}
        className="group relative block w-full aspect-video rounded-[1.5rem] overflow-hidden bg-black cursor-zoom-in"
      >
        <img
          src={shot.thumb}
          srcSet={shot.srcSet}
          sizes="(min-width: 768px) 50vw, 100vw"
          width={800}
          height={450}
          loading="lazy"
          decoding="async"
          alt={shot.alt}
          className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-[1.2s] ease-spring"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <span className="glass glass-strong absolute top-3 left-3 rounded-full px-3 py-1 text-[12px] font-medium text-white/90">
          {tool.category}
        </span>
        <span className="glass glass-strong absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-spring">
          <Maximize2 className="w-4 h-4" />
        </span>
      </button>

      <div className="px-4 pt-5 pb-4 space-y-5">
        <div className="space-y-1.5">
          <h3 className="text-[22px] font-semibold tracking-tight">{tool.name}</h3>
          <p className="text-white/55 text-[15px]">{tool.tagline}</p>
        </div>

        <ul className="space-y-3">
          {tool.features.map(feature => (
            <li key={feature} className="flex items-start gap-3 text-white/75 text-[14px] leading-relaxed">
              <span className="mt-0.5 w-5 h-5 rounded-full icon-tile flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/[0.08]">
          {tool.stats.map(stat => (
            <div key={stat.label}>
              <p className="text-2xl font-semibold tracking-tight tabular-nums">{stat.value}</p>
              <p className="text-[12px] text-white/45">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <Lightbox title={shot.alt} onClose={close} aspect={shot.width / shot.height} maxWidth={1320}>
            <img src={shot.full} alt={shot.alt} className="absolute inset-0 w-full h-full object-contain" />
          </Lightbox>
        )}
      </AnimatePresence>
    </div>
  );
}
