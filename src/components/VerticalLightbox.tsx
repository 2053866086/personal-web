import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

// 竖屏视频弹窗，Shorts 和广告共用。放在 AnimatePresence 里才有退出动画。
export default function VerticalLightbox({
  title,
  onClose,
  externalUrl,
  externalLabel,
  children,
}: {
  title: string;
  onClose: () => void;
  externalUrl?: string;
  externalLabel?: string;
  children: React.ReactNode;
}) {
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
      aria-label={title}
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
            {children}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {externalUrl && (
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-strong inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-[13px] font-medium text-white/80 hover:text-white transition-colors"
            >
              {externalLabel}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
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
