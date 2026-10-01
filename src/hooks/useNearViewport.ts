import { useEffect, useRef, useState } from 'react';

// 元素滚动到视口附近（默认提前 800px）才返回 true，之后一直保持 true。
// 用来让首屏以下的重区块晚点挂载，不占首次渲染的排版时间。
export function useNearViewport<T extends Element>(rootMargin = '800px 0px') {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (!('IntersectionObserver' in window)) {
      setNear(true);
      return;
    }

    const observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        setNear(true);
        observer.disconnect();
      }
    }, { rootMargin });
    observer.observe(el);
    return () => observer.disconnect();
  }, [near, rootMargin]);

  return [ref, near] as const;
}
