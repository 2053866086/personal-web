import { useEffect } from 'react';

// 鼠标划过 .glass 元素时，把指针在元素内的坐标写进 CSS 变量，
// 由 index.css 里的 .glass::after 画出跟随的镜面反光。全局只挂一个监听。
export function useGlassSpotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let current: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const el = (target?.closest?.('.glass') as HTMLElement | null) ?? null;
      if (el !== current) {
        current?.style.setProperty('--spot', '0');
        current = el;
      }
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--my', `${e.clientY - rect.top}px`);
      el.style.setProperty('--spot', '1');
    };

    const onLeave = () => {
      current?.style.setProperty('--spot', '0');
      current = null;
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);
}
