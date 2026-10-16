'use client';

// Loads the unmodified scroll-craft engine once and mounts it per route.
// The engine reads data-sc-* attributes off server-rendered markup; on every
// client navigation the old instance is destroyed (its listeners, rAF loops and
// observers) and a fresh one mounts against the new page.

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type Api = { destroy(): void; layout(): void; read(): void };
declare global {
  interface Window {
    ScrollCraft?: { mount(root: Element | Document): Api; reduce: boolean; instances: Api[] };
  }
}

export default function ScrollCraftMount() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const api = useRef<Api | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ScrollCraft) setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !window.ScrollCraft) return;
    let raf2 = 0;
    // Two frames: the new route's DOM is committed and has had a layout.
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        api.current?.destroy();
        // Drift writes the ground onto <html>; a new route starts from the token.
        document.documentElement.style.removeProperty('--sc-canvas');
        api.current = window.ScrollCraft!.mount(document.body);
      });
    });
    // Client components (the ranked list, the field) can change the page height
    // after mount. Re-measure so act positions never go stale.
    let t = 0;
    const ro = new ResizeObserver(() => {
      clearTimeout(t);
      t = window.setTimeout(() => {
        api.current?.layout();
        api.current?.read();
      }, 120);
    });
    ro.observe(document.body);
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(t);
      ro.disconnect();
    };
  }, [ready, pathname]);

  useEffect(() => () => api.current?.destroy(), []);

  return <Script src="/scrollcraft/scrollcraft.js" strategy="afterInteractive" onLoad={() => setReady(true)} onReady={() => setReady(true)} />;
}
