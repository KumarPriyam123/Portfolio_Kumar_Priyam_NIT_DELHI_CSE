// The role portrait. One photo, three renderings, each drawn live on a canvas:
//   sde  the face is typeset from code and types itself in, row by row
//   ai   the face becomes a neural graph; activations walk its edges
//   data the face is carried by data streams; records flow left to right
// Modes change with a blocky dissolve. Each mode keeps a pre-rendered base
// layer and only animates a light overlay, so a frame stays cheap.

import { CODE } from './code';

export type Mode = 'sde' | 'ai' | 'data';
type RGB = [number, number, number];
const COLOR: Record<Mode, RGB> = { sde: [94, 234, 212], ai: [242, 181, 68], data: [255, 138, 101] };
const BG: RGB = [7, 10, 16];
const GLYPHS = '{}()<>[];=+*/#%$&@01xyz';

const clamp = (x: number, a: number, b: number) => (x < a ? a : x > b ? b : x);
const ease = (t: number) => 1 - Math.pow(1 - clamp(t, 0, 1), 3);
const rgba = (c: RGB, a: number, k = 1) => `rgba(${Math.round(c[0] * k)},${Math.round(c[1] * k)},${Math.round(c[2] * k)},${a.toFixed(3)})`;
const mix = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const WHITE: RGB = [240, 250, 255];

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Box = { x: number; y: number; w: number; h: number };
type Grid = { cols: number; rows: number; lum: Float32Array; a: Float32Array };

function sample(img: HTMLImageElement, cols: number, rows: number): Grid {
  const c = document.createElement('canvas');
  c.width = cols;
  c.height = rows;
  const x = c.getContext('2d', { willReadFrequently: true })!;
  x.imageSmoothingQuality = 'high';
  x.drawImage(img, 0, 0, cols, rows);
  const d = x.getImageData(0, 0, cols, rows).data;
  const lum = new Float32Array(cols * rows);
  const a = new Float32Array(cols * rows);
  const vals: number[] = [];
  for (let i = 0; i < cols * rows; i++) {
    a[i] = d[i * 4 + 3] / 255;
    lum[i] = (0.2126 * d[i * 4] + 0.7152 * d[i * 4 + 1] + 0.0722 * d[i * 4 + 2]) / 255;
    if (a[i] > 0.5) vals.push(lum[i]);
  }
  // Contrast stretch inside the subject so the face always uses the full range.
  vals.sort((p, q) => p - q);
  const lo = vals[Math.floor(vals.length * 0.04)] ?? 0;
  const hi = vals[Math.floor(vals.length * 0.97)] ?? 1;
  for (let i = 0; i < lum.length; i++) lum[i] = clamp((lum[i] - lo) / Math.max(hi - lo, 0.05), 0, 1);
  return { cols, rows, lum, a };
}

// Local contrast: push each cell away from its neighbourhood mean so eyes,
// nose and mouth survive being drawn at text resolution.
function detail(g: Grid, radius: number, k: number): Float32Array {
  const { cols, rows, lum, a } = g;
  const blur = new Float32Array(cols * rows);
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++) {
      let s = 0;
      let n = 0;
      for (let dy = -radius; dy <= radius; dy++) {
        const yy = y + dy;
        if (yy < 0 || yy >= rows) continue;
        for (let dx = -radius; dx <= radius; dx++) {
          const xx = x + dx;
          if (xx < 0 || xx >= cols) continue;
          const j = yy * cols + xx;
          if (a[j] < 0.4) continue;
          s += lum[j];
          n++;
        }
      }
      blur[y * cols + x] = n ? s / n : lum[y * cols + x];
    }
  const out = new Float32Array(cols * rows);
  const vals: number[] = [];
  for (let i = 0; i < out.length; i++) {
    out[i] = lum[i] + k * (lum[i] - blur[i]);
    if (a[i] > 0.5) vals.push(out[i]);
  }
  vals.sort((p, q) => p - q);
  const lo = vals[Math.floor(vals.length * 0.03)] ?? 0;
  const hi = vals[Math.floor(vals.length * 0.985)] ?? 1;
  for (let i = 0; i < out.length; i++) out[i] = clamp((out[i] - lo) / Math.max(hi - lo, 0.05), 0, 1);
  return out;
}

function edges(g: Grid): Float32Array {
  const { cols, rows, lum } = g;
  const e = new Float32Array(cols * rows);
  let max = 0;
  for (let y = 1; y < rows - 1; y++)
    for (let x = 1; x < cols - 1; x++) {
      const i = y * cols + x;
      const gx = lum[i - cols + 1] + 2 * lum[i + 1] + lum[i + cols + 1] - lum[i - cols - 1] - 2 * lum[i - 1] - lum[i + cols - 1];
      const gy = lum[i + cols - 1] + 2 * lum[i + cols] + lum[i + cols + 1] - lum[i - cols - 1] - 2 * lum[i - cols] - lum[i - cols + 1];
      e[i] = Math.hypot(gx, gy);
      if (e[i] > max) max = e[i];
    }
  for (let i = 0; i < e.length; i++) e[i] = Math.min(1, e[i] / (max * 0.55 || 1));
  return e;
}

function canvas(w: number, h: number, dpr: number) {
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.round(w * dpr));
  c.height = Math.max(1, Math.round(h * dpr));
  const x = c.getContext('2d')!;
  x.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { c, x };
}

type Ctx = { W: number; H: number; box: Box; dpr: number; img: HTMLImageElement; silhouette: HTMLCanvasElement; mono: string; reduce: boolean; mobile: boolean };
type Pointer = { x: number; y: number } | null;

interface Layer {
  draw(x: CanvasRenderingContext2D, local: number, p: Pointer): void;
}

/* ------------------------------------------------------------------ SDE --- */
class CodeLayer implements Layer {
  private base: HTMLCanvasElement;
  private cells: { x: number; y: number; ch: string; c: string; l: number }[] = [];
  private fs: number;
  private cw: number;
  private ch: number;
  private rows: number;
  private flick: { i: number; until: number; g: string }[] = [];
  private r = rng(11);
  constructor(private k: Ctx) {
    const { box } = k;
    this.fs = clamp(box.h / (k.mobile ? 64 : 80), 6.5, 11);
    this.cw = this.fs * 0.62;
    this.ch = this.fs * 1.04;
    const cols = Math.floor(box.w / this.cw);
    this.rows = Math.floor(box.h / this.ch);
    const g = sample(k.img, cols, this.rows);
    const L = detail(g, Math.max(2, Math.round(cols / 16)), 1.35);
    const { c, x } = canvas(k.W, k.H, k.dpr);
    x.drawImage(k.silhouette, 0, 0, k.W, k.H);
    x.textBaseline = 'top';
    let n = 0;
    for (let row = 0; row < this.rows; row++)
      for (let col = 0; col < cols; col++) {
        const i = row * cols + col;
        let chr = CODE[n++ % CODE.length];
        if (g.a[i] < 0.42) continue;
        const l = L[i];
        // Shadows stay empty: the face is drawn by where the code is not.
        if (l < 0.24) continue;
        const v = Math.pow((l - 0.24) / 0.76, 1.55);
        if (chr === ' ') chr = v > 0.5 ? '=' : '·';
        const tone = mix(COLOR.sde, WHITE, Math.pow(v, 2.2) * 0.9);
        const col2 = rgba(tone, (0.1 + 0.9 * v) * Math.min(1, g.a[i] * 1.2));
        const px = box.x + col * this.cw;
        const py = box.y + row * this.ch;
        x.font = `${v > 0.62 ? 700 : 500} ${this.fs}px ${k.mono}`;
        x.fillStyle = col2;
        x.fillText(chr, px, py);
        this.cells.push({ x: px, y: py, ch: chr, c: col2, l: v });
      }
    this.base = c;
  }
  draw(x: CanvasRenderingContext2D, local: number, p: Pointer) {
    const { W, box, reduce } = this.k;
    const T = reduce ? 0 : 1500;
    const t = T ? clamp(local / T, 0, 1) : 1;
    if (t < 1) {
      // Typing in, row by row, with a bright frontier.
      const rowsDone = this.rows * ease(t);
      const full = Math.floor(rowsDone);
      const frac = rowsDone - full;
      const fy = box.y + full * this.ch;
      x.save();
      x.beginPath();
      x.rect(0, 0, W, fy);
      x.rect(0, fy, box.x + box.w * frac, this.ch);
      x.clip();
      x.drawImage(this.base, 0, 0, W, this.k.H);
      x.restore();
      x.font = `600 ${this.fs}px ${this.k.mono}`;
      x.textBaseline = 'top';
      const fx = box.x + box.w * frac;
      for (let j = 0; j < 7; j++) {
        x.fillStyle = rgba(WHITE, 0.9 - j * 0.12);
        x.fillText(GLYPHS[(this.r() * GLYPHS.length) | 0], fx - j * this.cw, fy);
      }
      x.fillStyle = rgba(COLOR.sde, 0.95);
      x.fillRect(fx + this.cw * 0.4, fy, this.cw * 0.9, this.ch * 0.92);
      return;
    }
    x.drawImage(this.base, 0, 0, W, this.k.H);
    if (reduce) return;
    x.font = `600 ${this.fs}px ${this.k.mono}`;
    x.textBaseline = 'top';
    const now = performance.now();
    // A few cells recompile at any moment, so the code feels live.
    if (this.cells.length && this.r() < 0.6) this.flick.push({ i: (this.r() * this.cells.length) | 0, until: now + 260 + this.r() * 260, g: GLYPHS[(this.r() * GLYPHS.length) | 0] });
    this.flick = this.flick.filter((f) => f.until > now);
    for (const f of this.flick) {
      const c = this.cells[f.i];
      x.fillStyle = rgba(BG, 1);
      x.fillRect(c.x, c.y, this.cw, this.ch);
      x.fillStyle = rgba(WHITE, clamp((f.until - now) / 300, 0, 1));
      x.fillText(f.g, c.x, c.y);
    }
    if (p) {
      const R = 78;
      for (const c of this.cells) {
        const d = Math.hypot(c.x - p.x, c.y - p.y);
        if (d > R) continue;
        const k = 1 - d / R;
        x.fillStyle = rgba(BG, 1);
        x.fillRect(c.x, c.y, this.cw, this.ch);
        x.fillStyle = rgba(mix(COLOR.sde, WHITE, k), 0.35 + 0.65 * k);
        x.fillText(k > 0.45 ? GLYPHS[(this.r() * GLYPHS.length) | 0] : c.ch, c.x, c.y);
      }
    }
  }
}

/* ------------------------------------------------------------------- AI --- */
class GraphLayer implements Layer {
  private base: HTMLCanvasElement;
  private nodes: { x: number; y: number; w: number; s: number }[] = [];
  private links: [number, number][] = [];
  private adj: number[][] = [];
  private pulses: { e: number; dir: 1 | -1; t: number; v: number }[] = [];
  private r = rng(29);
  private tw: { i: number; until: number }[] = [];
  constructor(private k: Ctx) {
    const { box, mobile } = k;
    const cols = 120;
    const rows = Math.round(cols * (box.h / box.w));
    const g = sample(k.img, cols, rows);
    const e = edges(g);
    const L = detail(g, 5, 1.2);
    const weights = new Float32Array(cols * rows);
    let sum = 0;
    // Light on dark: nodes gather where the face catches light, and on its contours.
    for (let i = 0; i < weights.length; i++) {
      weights[i] = g.a[i] > 0.5 ? 0.015 + 1.8 * Math.pow(L[i], 2.2) + 1.25 * e[i] : 0;
      sum += weights[i];
    }
    const N = mobile ? 600 : 1150;
    const cdf = new Float32Array(weights.length);
    let acc = 0;
    for (let i = 0; i < weights.length; i++) cdf[i] = acc += weights[i] / sum;
    for (let n = 0; n < N; n++) {
      const u = this.r();
      let lo = 0;
      let hi = cdf.length - 1;
      while (lo < hi) {
        const m = (lo + hi) >> 1;
        if (cdf[m] < u) lo = m + 1;
        else hi = m;
      }
      const cx = lo % cols;
      const cy = (lo / cols) | 0;
      this.nodes.push({ x: box.x + ((cx + this.r()) / cols) * box.w, y: box.y + ((cy + this.r()) / rows) * box.h, w: Math.min(1, Math.pow(L[lo], 1.5) * 0.9 + e[lo] * 0.35), s: this.r() });
    }
    // k nearest neighbours through a spatial hash.
    const maxLen = box.w * (mobile ? 0.085 : 0.06);
    const hash = new Map<string, number[]>();
    const key = (x: number, y: number) => `${Math.floor(x / maxLen)},${Math.floor(y / maxLen)}`;
    this.nodes.forEach((p, i) => {
      const kk = key(p.x, p.y);
      (hash.get(kk) ?? hash.set(kk, []).get(kk)!).push(i);
    });
    const seen = new Set<string>();
    this.adj = this.nodes.map(() => []);
    this.nodes.forEach((p, i) => {
      const gx = Math.floor(p.x / maxLen);
      const gy = Math.floor(p.y / maxLen);
      const near: [number, number][] = [];
      for (let dx = -1; dx <= 1; dx++)
        for (let dy = -1; dy <= 1; dy++)
          for (const j of hash.get(`${gx + dx},${gy + dy}`) ?? []) {
            if (j === i) continue;
            const d = Math.hypot(this.nodes[j].x - p.x, this.nodes[j].y - p.y);
            if (d < maxLen) near.push([d, j]);
          }
      near.sort((a, b) => a[0] - b[0]);
      for (const [, j] of near.slice(0, 3)) {
        const id = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(id)) continue;
        seen.add(id);
        this.adj[i].push(this.links.length);
        this.adj[j].push(this.links.length);
        this.links.push([i, j]);
      }
    });
    const { c, x } = canvas(k.W, k.H, k.dpr);
    x.drawImage(k.silhouette, 0, 0, k.W, k.H);
    this.paint(x, 1);
    this.base = c;
    for (let i = 0; i < (mobile ? 36 : 70); i++) this.pulses.push(this.newPulse());
  }
  private newPulse() {
    return { e: (this.r() * this.links.length) | 0, dir: (this.r() < 0.5 ? 1 : -1) as 1 | -1, t: this.r(), v: 0.9 + this.r() * 1.6 };
  }
  private paint(x: CanvasRenderingContext2D, k: number, local = 99999) {
    const c = COLOR.ai;
    x.lineWidth = 0.8;
    x.strokeStyle = rgba(c, 0.17 * k);
    x.beginPath();
    for (const [i, j] of this.links) {
      const a = this.nodes[i];
      const b = this.nodes[j];
      if (local < 99999 && (a.s * 700 > local || b.s * 700 > local)) continue;
      x.moveTo(a.x, a.y);
      x.lineTo(b.x, b.y);
    }
    x.stroke();
    for (const n of this.nodes) {
      const g = local < 99999 ? ease((local - n.s * 700) / 300) : 1;
      if (g <= 0) continue;
      x.fillStyle = rgba(mix(c, WHITE, n.w * n.w * 0.6), (0.25 + 0.75 * n.w) * g);
      x.beginPath();
      x.arc(n.x, n.y, (0.5 + 2.1 * n.w) * g, 0, Math.PI * 2);
      x.fill();
    }
  }
  draw(x: CanvasRenderingContext2D, local: number, p: Pointer) {
    const { W, H, reduce } = this.k;
    if (!reduce && local < 1100) {
      x.drawImage(this.k.silhouette, 0, 0, W, H);
      this.paint(x, ease(local / 1100), local);
      return;
    }
    x.drawImage(this.base, 0, 0, W, H);
    if (reduce) return;
    const now = performance.now();
    // Activations walk the graph.
    for (const q of this.pulses) {
      q.t += 0.016 * q.v;
      if (q.t >= 1) {
        const [i, j] = this.links[q.e];
        const end = q.dir === 1 ? j : i;
        const opts = this.adj[end];
        const ne = opts[(this.r() * opts.length) | 0];
        if (ne === undefined || this.r() < 0.04) Object.assign(q, this.newPulse(), { t: 0 });
        else {
          q.e = ne;
          q.dir = this.links[ne][0] === end ? 1 : -1;
          q.t = 0;
        }
      }
      const [i, j] = this.links[q.e];
      const a = this.nodes[q.dir === 1 ? i : j];
      const b = this.nodes[q.dir === 1 ? j : i];
      const px = a.x + (b.x - a.x) * q.t;
      const py = a.y + (b.y - a.y) * q.t;
      x.strokeStyle = rgba(WHITE, 0.55);
      x.lineWidth = 1.2;
      x.beginPath();
      x.moveTo(a.x + (b.x - a.x) * Math.max(0, q.t - 0.35), a.y + (b.y - a.y) * Math.max(0, q.t - 0.35));
      x.lineTo(px, py);
      x.stroke();
      x.fillStyle = rgba(mix(COLOR.ai, WHITE, 0.6), 0.95);
      x.beginPath();
      x.arc(px, py, 1.7, 0, Math.PI * 2);
      x.fill();
    }
    if (this.r() < 0.35) this.tw.push({ i: (this.r() * this.nodes.length) | 0, until: now + 500 });
    this.tw = this.tw.filter((t) => t.until > now);
    for (const t of this.tw) {
      const n = this.nodes[t.i];
      const k = (t.until - now) / 500;
      x.fillStyle = rgba(WHITE, 0.8 * k);
      x.beginPath();
      x.arc(n.x, n.y, 1.5 + 2.2 * k, 0, Math.PI * 2);
      x.fill();
    }
    if (p) {
      // Attention: the pointer attends to its nearest nodes.
      const near = this.nodes
        .map((n, i) => [Math.hypot(n.x - p.x, n.y - p.y), i] as [number, number])
        .filter((d) => d[0] < 150)
        .sort((a, b) => a[0] - b[0])
        .slice(0, 7);
      for (const [d, i] of near) {
        const n = this.nodes[i];
        const k = 1 - d / 150;
        x.strokeStyle = rgba(COLOR.ai, 0.25 + 0.55 * k);
        x.lineWidth = 1;
        x.beginPath();
        x.moveTo(p.x, p.y);
        x.lineTo(n.x, n.y);
        x.stroke();
        x.fillStyle = rgba(WHITE, 0.5 + 0.5 * k);
        x.beginPath();
        x.arc(n.x, n.y, 2 + 2 * k, 0, Math.PI * 2);
        x.fill();
      }
      x.fillStyle = rgba(COLOR.ai, 0.9);
      x.beginPath();
      x.arc(p.x, p.y, 3, 0, Math.PI * 2);
      x.fill();
    }
  }
}

/* ----------------------------------------------------------------- DATA --- */
class StreamLayer implements Layer {
  private base: HTMLCanvasElement;
  private lines: { ys: Float32Array; inside: Uint8Array }[] = [];
  private step = 3;
  private packets: { l: number; x: number; v: number; len: number }[] = [];
  private r = rng(47);
  constructor(private k: Ctx) {
    const { box, W, mobile } = k;
    const sp = clamp(box.h / (mobile ? 46 : 58), 7, 12.5);
    const cols = 140;
    const rows = Math.round(cols * (box.h / box.w));
    const g = sample(k.img, cols, rows);
    const n = Math.floor(box.h / sp);
    const pts = Math.ceil(W / this.step) + 1;
    const amp = sp * 2.1;
    for (let li = 0; li < n; li++) {
      const y0 = box.y + (li + 0.5) * sp;
      const ys = new Float32Array(pts);
      const inside = new Uint8Array(pts);
      const gy = clamp(Math.floor(((y0 - box.y) / box.h) * rows), 0, rows - 1);
      for (let pi = 0; pi < pts; pi++) {
        const xx = pi * this.step;
        const gx = Math.floor(((xx - box.x) / box.w) * cols);
        let a = 0;
        let l = 1;
        if (gx >= 0 && gx < cols) {
          a = g.a[gy * cols + gx];
          l = g.lum[gy * cols + gx];
        }
        const v = a > 0.4 ? (0.35 + 0.65 * (1 - l)) * a : 0;
        ys[pi] = y0 - amp * v + Math.sin(xx * 0.045 + li * 1.7) * (a > 0.4 ? 0.9 : 0.35);
        inside[pi] = a > 0.4 ? Math.max(1, Math.round(1 + l * 3)) : 0;
      }
      this.lines.push({ ys, inside });
    }
    const { c, x } = canvas(k.W, k.H, k.dpr);
    x.drawImage(k.silhouette, 0, 0, k.W, k.H);
    this.paint(x);
    this.base = c;
    for (let i = 0; i < (mobile ? 26 : 46); i++) this.packets.push(this.newPacket(true));
  }
  private newPacket(anywhere = false) {
    return { l: (this.r() * this.lines.length) | 0, x: anywhere ? this.r() * this.k.W : -40, v: 1.2 + this.r() * 2.6, len: 24 + this.r() * 50 };
  }
  private paint(x: CanvasRenderingContext2D) {
    const c = COLOR.data;
    x.lineJoin = 'round';
    for (const line of this.lines) {
      // Outside the silhouette the pipeline continues, dim.
      x.strokeStyle = rgba(c, 0.13);
      x.lineWidth = 1;
      x.beginPath();
      line.ys.forEach((y, i) => (i ? x.lineTo(i * this.step, y) : x.moveTo(0, y)));
      x.stroke();
      // Inside, brightness follows the face.
      for (let level = 1; level <= 4; level++) {
        x.strokeStyle = rgba(mix(c, WHITE, (level - 1) * 0.16), 0.38 + level * 0.15);
        x.lineWidth = 0.9 + level * 0.28;
        x.beginPath();
        let open = false;
        for (let i = 0; i < line.ys.length; i++) {
          if (line.inside[i] === level) {
            if (!open) x.moveTo(i * this.step, line.ys[i]);
            else x.lineTo(i * this.step, line.ys[i]);
            open = true;
          } else open = false;
        }
        x.stroke();
      }
    }
  }
  private yAt(l: number, xx: number) {
    const ys = this.lines[l].ys;
    const i = clamp(Math.floor(xx / this.step), 0, ys.length - 1);
    return ys[i];
  }
  draw(x: CanvasRenderingContext2D, local: number) {
    const { W, H, reduce } = this.k;
    const t = reduce ? 1 : clamp(local / 1100, 0, 1);
    if (t < 1) {
      x.save();
      x.beginPath();
      x.rect(0, 0, W * ease(t), H);
      x.clip();
      x.drawImage(this.base, 0, 0, W, H);
      x.restore();
      x.fillStyle = rgba(WHITE, 0.7);
      x.fillRect(W * ease(t) - 1, this.k.box.y, 2, this.k.box.h);
      return;
    }
    x.drawImage(this.base, 0, 0, W, H);
    if (reduce) return;
    // Records move through the pipelines.
    x.lineCap = 'round';
    for (const p of this.packets) {
      p.x += p.v;
      if (p.x - p.len > W) Object.assign(p, this.newPacket());
      const ins = this.lines[p.l].inside[clamp(Math.floor(p.x / this.step), 0, this.lines[p.l].inside.length - 1)];
      x.strokeStyle = rgba(ins ? WHITE : COLOR.data, ins ? 0.95 : 0.42);
      x.lineWidth = ins ? 2 : 1.6;
      x.beginPath();
      for (let s = 0; s <= 6; s++) {
        const xx = p.x - (p.len * s) / 6;
        const yy = this.yAt(p.l, xx);
        if (s === 0) x.moveTo(xx, yy);
        else x.lineTo(xx, yy);
      }
      x.stroke();
    }
  }
}

/* --------------------------------------------------------------- engine --- */
export class RolePortrait {
  private x: CanvasRenderingContext2D;
  private k!: Ctx;
  private layers: Partial<Record<Mode, Layer>> = {};
  private mode: Mode;
  private prev: Mode | null = null;
  private since = 0;
  private trans = 1;
  private transStart = 0;
  private raf = 0;
  private dead = false;
  private visible = true;
  private pointer: Pointer = null;
  private tmpA: { c: HTMLCanvasElement; x: CanvasRenderingContext2D } | null = null;
  private tmpB: { c: HTMLCanvasElement; x: CanvasRenderingContext2D } | null = null;
  private mask: { c: HTMLCanvasElement; x: CanvasRenderingContext2D; n: Float32Array; cols: number; rows: number } | null = null;
  private ro: ResizeObserver;
  private io: IntersectionObserver;
  private onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const r = this.cv.getBoundingClientRect();
    this.pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  private onLeave = () => {
    this.pointer = null;
  };

  constructor(
    private cv: HTMLCanvasElement,
    private img: HTMLImageElement,
    private opts: { reduce: boolean; mode: Mode; host?: HTMLElement; fit?: number | (() => number) },
  ) {
    this.x = cv.getContext('2d')!;
    this.mode = opts.mode;
    this.build();
    this.since = performance.now();
    this.ro = new ResizeObserver(() => {
      clearTimeout(this.rt);
      this.rt = window.setTimeout(() => this.build(), 150);
    });
    this.ro.observe(cv);
    this.io = new IntersectionObserver(([e]) => {
      this.visible = e.isIntersecting;
      if (this.visible) this.loop();
    });
    this.io.observe(cv);
    const host = opts.host ?? cv.parentElement ?? cv;
    if (!opts.reduce && matchMedia('(hover: hover) and (pointer: fine)').matches) {
      host.addEventListener('pointermove', this.onMove, { passive: true });
      host.addEventListener('pointerleave', this.onLeave);
    }
    this.loop();
  }
  private rt = 0;

  private build() {
    const W = this.cv.clientWidth;
    const H = this.cv.clientHeight;
    if (!W || !H) return;
    // Six full-size layers live at once; cap the pixel budget on big screens.
    const dpr = Math.min(devicePixelRatio || 1, 2, Math.sqrt(3.6e6 / (W * H)));
    this.cv.width = Math.round(W * dpr);
    this.cv.height = Math.round(H * dpr);
    this.x.setTransform(dpr, 0, 0, dpr, 0, 0);
    const ar = this.img.naturalWidth / this.img.naturalHeight;
    const f = this.opts.fit;
    let h = H * (typeof f === 'function' ? f() : f ?? 1);
    let w = h * ar;
    if (w > W) {
      w = W;
      h = w / ar;
    }
    const box = { x: (W - w) / 2, y: H - h, w, h };
    const sil = canvas(W, H, dpr);
    sil.x.drawImage(this.img, box.x, box.y, box.w, box.h);
    sil.x.globalCompositeOperation = 'source-in';
    sil.x.fillStyle = rgba(BG, 0.96);
    sil.x.fillRect(0, 0, W, H);
    const mono = getComputedStyle(document.documentElement).getPropertyValue('--font-geist-mono').trim() || 'ui-monospace, monospace';
    this.k = { W, H, box, dpr, img: this.img, silhouette: sil.c, mono, reduce: this.opts.reduce, mobile: W < 520 };
    this.layers = {};
    this.tmpA = canvas(W, H, dpr);
    this.tmpB = canvas(W, H, dpr);
    const cols = 26;
    const rows = Math.round(cols * (H / W));
    const m = document.createElement('canvas');
    m.width = cols;
    m.height = rows;
    const r = rng(5);
    const n = new Float32Array(cols * rows);
    for (let yy = 0; yy < rows; yy++) for (let xx = 0; xx < cols; xx++) n[yy * cols + xx] = 0.55 * (yy / rows) + 0.45 * r();
    this.mask = { c: m, x: m.getContext('2d')!, n, cols, rows };
    this.loop();
  }

  private layer(m: Mode): Layer {
    if (!this.layers[m]) this.layers[m] = m === 'sde' ? new CodeLayer(this.k) : m === 'ai' ? new GraphLayer(this.k) : new StreamLayer(this.k);
    return this.layers[m]!;
  }

  setMode(m: Mode) {
    if (m === this.mode) return;
    this.prev = this.mode;
    this.mode = m;
    this.since = performance.now();
    this.transStart = this.since;
    this.trans = this.opts.reduce ? 1 : 0;
    this.loop();
  }

  private loop = () => {
    if (this.raf || this.dead) return;
    this.raf = requestAnimationFrame(this.frame);
  };

  private frame = () => {
    this.raf = 0;
    if (this.dead || !this.k) return;
    const now = performance.now();
    const { W, H } = this.k;
    const x = this.x;
    x.clearRect(0, 0, W, H);
    const local = now - this.since;
    if (this.prev && this.trans < 1) {
      this.trans = clamp((now - this.transStart) / 750, 0, 1);
      const { cols, rows, n, x: mx, c: mc } = this.mask!;
      const img = mx.createImageData(cols, rows);
      for (let i = 0; i < n.length; i++) img.data[i * 4 + 3] = this.trans * 1.35 - n[i] * 0.35 > n[i] * 0.65 ? 255 : 0;
      mx.putImageData(img, 0, 0);
      const A = this.tmpA!;
      const B = this.tmpB!;
      for (const [T, m, inv] of [
        [A, this.prev, true],
        [B, this.mode, false],
      ] as const) {
        T.x.globalCompositeOperation = 'source-over';
        T.x.clearRect(0, 0, W, H);
        this.layer(m).draw(T.x, m === this.mode ? local : 99999, null);
        T.x.globalCompositeOperation = inv ? 'destination-out' : 'destination-in';
        T.x.imageSmoothingEnabled = false;
        T.x.drawImage(mc, 0, 0, W, H);
        T.x.globalCompositeOperation = 'source-over';
      }
      x.drawImage(A.c, 0, 0, W, H);
      x.drawImage(B.c, 0, 0, W, H);
      if (this.trans >= 1) this.prev = null;
    } else {
      this.layer(this.mode).draw(x, local, this.pointer);
    }
    const animating = !this.opts.reduce || this.prev !== null;
    if (this.visible && !document.hidden && animating) this.loop();
  };

  destroy() {
    this.dead = true;
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    this.io.disconnect();
    const host = this.opts.host ?? this.cv.parentElement ?? this.cv;
    host.removeEventListener('pointermove', this.onMove);
    host.removeEventListener('pointerleave', this.onLeave);
  }
}
