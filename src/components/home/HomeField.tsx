'use client';

// Owns the fixed latent field behind the hero and the query act, and wires it
// to the page: scroll drives condensation, the query drives hits and rays, and
// whichever copy block is on screen is masked so no point ever sits under text.

import { useEffect, useRef } from 'react';
import { LatentField, type MaskBox } from '@/lib/field/field';
import { rank, termHits } from '@/lib/search';
import { getQuery, useQuery } from '@/lib/query-store';

export default function HomeField() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const labels = useRef<HTMLDivElement>(null);
  const field = useRef<LatentField | null>(null);
  const q = useQuery();

  useEffect(() => {
    if (!canvas.current || !labels.current) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = innerWidth < 860 || matchMedia('(hover: none) and (pointer: coarse)').matches;
    const f = new LatentField(canvas.current, labels.current, { reduce, mobile });
    field.current = f;
    if (wrap.current) wrap.current.dataset.mode = f.mode;
    const { results } = rank(getQuery().text);
    f.setHits(termHits(getQuery().text, results));

    const hero = document.querySelector<HTMLElement>('.kp-hero');
    const heroCopy = document.getElementById('hero-copy');
    const panel = document.getElementById('query-panel');
    const search = document.getElementById('query-search');
    const work = document.getElementById('work');

    const toNdc = (r: DOMRect, pad = 18): MaskBox => {
      const W = innerWidth;
      const H = canvas.current?.clientHeight || innerHeight;
      return [((r.left - pad) / W) * 2 - 1, 1 - ((r.bottom + pad) / H) * 2, ((r.right + pad) / W) * 2 - 1, 1 - ((r.top - pad) / H) * 2];
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      const y = scrollY;
      const vh = innerHeight;
      if (hero && !reduce) f.orderTarget = Math.min(1, Math.max(0, y / (hero.offsetHeight * 0.7)));

      const panelOp = panel ? parseFloat(panel.style.opacity || '0') : 0;
      let mask: MaskBox | null = null;
      if (panel && panelOp > 0.04) mask = toNdc(panel.getBoundingClientRect());
      else if (heroCopy) {
        const r = heroCopy.getBoundingClientRect();
        if (r.bottom > 0) mask = toNdc(r);
      }
      f.setMask(mask);

      if (search && panelOp > 0.04) {
        const r = search.getBoundingClientRect();
        const portrait = innerWidth < 860;
        f.rayOrigin = portrait ? { x: r.left + r.width * 0.5, y: r.top, strength: panelOp } : { x: r.right, y: r.top + r.height / 2, strength: panelOp };
      } else f.rayOrigin = null;

      // Fully covered by the work section: stop drawing.
      const covered = work ? work.getBoundingClientRect().top <= 0 : false;
      f.setActive(!covered);
      if (wrap.current) {
        wrap.current.style.visibility = covered ? 'hidden' : 'visible';
        // For the verification harness: a compact signature of what paints.
        const hits = termHits(getQuery().text, rank(getQuery().text).results).filter((h) => h > 0.5).length;
        wrap.current.dataset.scVerifyState = `${f.orderTarget.toFixed(2)}|${hits}|${mask ? 'm' : '-'}|${f.rayOrigin ? 'r' : '-'}|${covered ? 'c' : 'v'}`;
      }
      void vh;
      f.kick();
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    addEventListener('scroll', on, { passive: true });
    addEventListener('resize', on, { passive: true });
    update();
    return () => {
      removeEventListener('scroll', on);
      removeEventListener('resize', on);
      if (raf) cancelAnimationFrame(raf);
      f.destroy();
      field.current = null;
    };
  }, []);

  useEffect(() => {
    const f = field.current;
    if (!f) return;
    const { results } = rank(q.text);
    f.setHits(termHits(q.text, results));
  }, [q.text]);

  return (
    <div ref={wrap} className="kp-field" aria-hidden="true">
      <canvas ref={canvas} />
      <div ref={labels} className="kp-field__labels" />
    </div>
  );
}
