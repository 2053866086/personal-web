import React, { useEffect, useRef } from 'react';

// 固定在页面最底层的极光背景，给上面的玻璃面板提供可以透出来的色彩。
// 光斑用 radial-gradient 而不是 blur 滤镜，动画只动 transform，开销很小。
export default function AmbientBackground() {
  const followRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = followRef.current;
    if (!el) return;
    // 只在有鼠标、且没开"减少动态效果"时跟随
    const interactive =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!interactive) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 3;
    let x = tx;
    let y = ty;
    let raf = 0;
    let running = false;

    const tick = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      // 跟上鼠标后停止循环，不空转
      if (Math.abs(tx - x) + Math.abs(ty - y) < 0.5) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    el.style.opacity = '1';
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-ink">
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="aurora aurora-3" />
      <div ref={followRef} className="aurora-follow" />
      <div className="absolute inset-0 grain" />
      {/* 四周压暗，视线集中在中间 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,6,10,0.75))]" />
    </div>
  );
}
