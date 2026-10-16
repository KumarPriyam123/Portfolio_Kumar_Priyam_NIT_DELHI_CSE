'use client';

// The hero. One portrait, three crafts. It opens on Software Engineer, drawn in
// code that types itself in, then becomes a neural graph for AI Engineer and
// data streams for Data Engineer, and cycles. The visitor can take over with
// the tabs; autoplay pauses while they hover the controls, when the hero is off
// screen, and entirely under reduced motion.

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ROLES, ROLE, type RoleId } from '@/data/roles';
import { CTA_LABEL, RESUMES, SITE } from '@/lib/site';
import type { RolePortrait } from '@/lib/portrait/portrait';

const DUR: Record<RoleId, number> = { sde: 7000, ai: 7000, data: 6000 };
const ORDER: RoleId[] = ['sde', 'ai', 'data'];
const GLYPHS = '<>/{}[]=+*#01_';
const SRC = '/portrait/kumar-cutout.webp';

function useScramble(text: string, reduce: boolean) {
  const [out, setOut] = useState(text);
  const from = useRef(text);
  useEffect(() => {
    if (reduce || from.current === text) {
      setOut(text);
      from.current = text;
      return;
    }
    const start = performance.now();
    const T = 620;
    let raf = 0;
    const tick = () => {
      const t = Math.min(1, (performance.now() - start) / T);
      let s = '';
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        const at = (i / text.length) * 0.65;
        if (ch === ' ' || t > at + 0.35) s += ch;
        else if (t > at) s += GLYPHS[(Math.random() * GLYPHS.length) | 0];
        else s += from.current[i] ?? '';
      }
      setOut(s);
      if (t < 1) raf = requestAnimationFrame(tick);
      else from.current = text;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, reduce]);
  return out;
}

export default function RoleHero() {
  const [role, setRole] = useState<RoleId>('sde');
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [art, setArt] = useState(false);
  const hero = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const portrait = useRef<RolePortrait | null>(null);
  const bars = useRef<Partial<Record<RoleId, HTMLSpanElement | null>>>({});
  const hold = useRef({ hover: false, focus: false, offscreen: false });
  const elapsed = useRef(0);
  const roleRef = useRef(role);
  const pausedRef = useRef(paused);
  roleRef.current = role;
  pausedRef.current = paused;

  const r = ROLE[role];
  const title = useScramble(r.title, reduce);
  const cut = r.title.indexOf(' ');

  useEffect(() => {
    const m = matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(m.matches);
    const on = () => setReduce(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);

  // The portrait. Loaded after first paint; the photo shows until it is ready.
  useEffect(() => {
    let dead = false;
    const cv = canvas.current;
    const host = hero.current;
    if (!cv || !host) return;
    const img = new Image();
    img.decoding = 'async';
    img.src = SRC;
    Promise.all([img.decode(), document.fonts?.ready, import('@/lib/portrait/portrait')])
      .then(([, , mod]) => {
        if (dead) return;
        portrait.current = new mod.RolePortrait(cv, img, {
          reduce: matchMedia('(prefers-reduced-motion: reduce)').matches,
          mode: roleRef.current,
          host,
          fit: () => (matchMedia('(min-width: 1180px)').matches ? 0.85 : 0.96),
        });
        setArt(true);
      })
      .catch(() => {
        /* the photo stays; nothing else depends on the canvas */
      });
    return () => {
      dead = true;
      portrait.current?.destroy();
      portrait.current = null;
    };
  }, []);

  useEffect(() => {
    portrait.current?.setMode(role);
  }, [role]);

  // Pause off screen.
  useEffect(() => {
    const el = hero.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      hold.current.offscreen = !e.isIntersecting;
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The cycle clock. Bars are written directly; React only hears about role changes.
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(100, now - last);
      last = now;
      const h = hold.current;
      const stopped = pausedRef.current || h.hover || h.focus || h.offscreen || document.hidden;
      if (!stopped) elapsed.current += dt;
      const cur = roleRef.current;
      const k = Math.min(1, elapsed.current / DUR[cur]);
      ORDER.forEach((id) => bars.current[id]?.style.setProperty('transform', `scaleX(${id === cur ? k : 0})`));
      if (k >= 1) {
        elapsed.current = 0;
        setRole(ORDER[(ORDER.indexOf(cur) + 1) % ORDER.length]);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  // Without the clock, the selected tab simply shows a full bar.
  useEffect(() => {
    if (reduce) ORDER.forEach((id) => bars.current[id]?.style.setProperty('transform', `scaleX(${id === role ? 1 : 0})`));
  }, [reduce, role]);

  const choose = useCallback((id: RoleId) => {
    elapsed.current = 0;
    setRole(id);
    setPaused(true);
  }, []);

  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const i = ORDER.indexOf(role);
    let n = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % ORDER.length;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i + ORDER.length - 1) % ORDER.length;
    if (e.key === 'Home') n = 0;
    if (e.key === 'End') n = ORDER.length - 1;
    if (n < 0) return;
    e.preventDefault();
    choose(ORDER[n]);
    (e.currentTarget.querySelectorAll('[role="tab"]')[n] as HTMLElement | undefined)?.focus();
  };

  return (
    <section ref={hero} className="kp-rh" data-role={role} data-art={art ? 'on' : 'off'} aria-labelledby="hero-name">
      <div className="kp-rh__glow" aria-hidden="true">
        {ORDER.map((id) => (
          <i key={id} data-for={id} />
        ))}
      </div>

      <h1 id="hero-name" className="kp-rh__name">
        <span className="kp-line" style={{ ['--i' as string]: 0 }}>
          <span>Kumar</span>
        </span>{' '}
        <span className="kp-line" style={{ ['--i' as string]: 1 }}>
          <span>Priyam</span>
        </span>
      </h1>

      <div className="kp-rh__art" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="kp-rh__photo" src={SRC} alt="" width={413} height={531} fetchPriority="high" />
        <canvas ref={canvas} className="kp-rh__canvas" />
      </div>

      <div className="kp-rh__frame">
        <div className="kp-rh__copy kp-rise" style={{ ['--d' as string]: '520ms' }}>
          <p className="kp-status kp-rh__status">
            <span className="kp-status__dot" aria-hidden="true" />
            {SITE.status} · {SITE.institution}, {SITE.classOf}
          </p>
          <div id="kp-rh-panel" role="tabpanel" aria-labelledby={`kp-tab-${role}`}>
          <p className="kp-rh__kicker kp-mono" aria-hidden="true">
            {String(ORDER.indexOf(role) + 1).padStart(2, '0')} / 03
          </p>
          <p className="kp-rh__role">
            <span className="sr-only">{r.title}</span>
            <span aria-hidden="true">
              {title.slice(0, cut)}
              <br />
              {title.slice(cut + 1)}
            </span>
          </p>
          <p key={`l-${role}`} className="kp-rh__line kp-swap">
            {r.line}
          </p>
          <dl key={`m-${role}`} className="kp-rh__metrics kp-swap">
            {r.metrics.map((m) => (
              <div key={m.l}>
                <dt className="sr-only">{m.l}</dt>
                <dd className="kp-rh__mv">{m.v}</dd>
                <dd className="kp-rh__ml" aria-hidden="true">
                  {m.l}
                </dd>
              </div>
            ))}
          </dl>
          </div>
        </div>

        <div
          className="kp-rh__side kp-rise"
          style={{ ['--d' as string]: '680ms' }}
          onPointerEnter={(e) => {
            if (e.pointerType === 'mouse') hold.current.hover = true;
          }}
          onPointerLeave={() => (hold.current.hover = false)}
          onFocus={() => (hold.current.focus = true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) hold.current.focus = false;
          }}
        >
          <div className="kp-rh__tabhead">
            <span className="kp-mono kp-soft">What I build</span>
            {!reduce && (
              <button type="button" className="kp-rh__pause" onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Play the role cycle' : 'Pause the role cycle'}>
                <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true">
                  {paused ? <path d="M3 1.8v8.4L10 6z" fill="currentColor" /> : <path d="M3 2h2v8H3zM7 2h2v8H7z" fill="currentColor" />}
                </svg>
                <span>{paused ? 'Play' : 'Pause'}</span>
              </button>
            )}
          </div>
          <div className="kp-rh__tabs" role="tablist" aria-label="What I build" onKeyDown={onKey}>
            {ROLES.map((x, i) => (
              <button
                key={x.id}
                id={`kp-tab-${x.id}`}
                type="button"
                role="tab"
                aria-selected={x.id === role}
                aria-controls="kp-rh-panel"
                tabIndex={x.id === role ? 0 : -1}
                className="kp-rh__tab"
                data-for={x.id}
                onClick={() => choose(x.id)}
              >
                <span className="kp-rh__tabn kp-mono">{String(i + 1).padStart(2, '0')}</span>
                <span className="kp-rh__tabt">{x.title}</span>
                <span className="kp-rh__bar" aria-hidden="true">
                  <span ref={(el) => void (bars.current[x.id] = el)} />
                </span>
              </button>
            ))}
          </div>
          <div className="kp-rh__actions">
            <Link className="kp-btn kp-btn--accent" href="/connect">
              {CTA_LABEL}
            </Link>
            <a className="kp-btn kp-btn--ghost" href={RESUMES[0].href} target="_blank" rel="noopener noreferrer">
              Résumé
              <span className="kp-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
