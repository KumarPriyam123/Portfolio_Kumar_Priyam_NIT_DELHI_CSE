// The latent field. A WebGL point cloud of Kumar's real stack terms that starts
// as noise, condenses into three domain clusters under the scroll, and re-forms
// around a visitor's query. Labels are real HTML. If WebGL is unavailable the
// same scene is drawn with Canvas 2D from the same math, so the fallback is the
// scene, not a stock picture.

import { TERMS, DOMAIN_LABEL, HIT_SLOTS, type Domain } from '@/lib/terms';
import { termUsage } from '@/lib/search';

type V3 = [number, number, number];

const KIND_DUST = 0;
const KIND_CLUSTER = 1;
const KIND_NEAR = 2;
const SENTINEL = TERMS.length; // uHi[SENTINEL] is always 0

const ANCHOR: Record<Domain, V3> = {
  ai: [-2.0, 0.5, -0.3],
  sw: [1.85, 0.72, 0.25],
  data: [0.1, -1.5, 0.15],
};
const CAT_DOMAIN: Record<string, Domain> = { 'ai-research': 'ai', fullstack: 'sw', 'data-engineering': 'data' };

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const smooth = (x: number) => {
  const t = Math.min(1, Math.max(0, x));
  return t * t * (3 - 2 * t);
};
const clamp = (x: number, a: number, b: number) => (x < a ? a : x > b ? b : x);

type FieldTerm = { id: string; label: string; domain: Domain; pos: V3; uses: number; seed: number };

export type Layout = {
  terms: FieldTerm[];
  count: number;
  noise: Float32Array;
  order: Float32Array;
  meta: Float32Array; // seed, term index, kind, size
};

export function buildLayout(mobile: boolean): Layout {
  const rnd = mulberry32(2027);
  const gauss = () => {
    const u = Math.max(rnd(), 1e-6);
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rnd());
  };

  // Each term sits at the weighted mean of its own domain and the domains of
  // the projects that use it, so shared tools drift toward the middle.
  const terms: FieldTerm[] = termUsage().map(({ term, categories }) => {
    const p: V3 = [...ANCHOR[term.domain]];
    let w = 1;
    for (const c of categories) {
      const a = ANCHOR[CAT_DOMAIN[c]];
      p[0] += a[0] * 0.35;
      p[1] += a[1] * 0.35;
      p[2] += a[2] * 0.35;
      w += 0.35;
    }
    p[0] /= w;
    p[1] /= w;
    p[2] /= w;
    const th = rnd() * Math.PI * 2;
    const ph = Math.acos(2 * rnd() - 1);
    const r = 0.45 + rnd() * 0.4;
    p[0] += r * Math.sin(ph) * Math.cos(th);
    p[1] += r * Math.cos(ph) * 0.75;
    p[2] += r * Math.sin(ph) * Math.sin(th);
    return { id: term.id, label: term.label, domain: term.domain, pos: p, uses: categories.length, seed: 0.04 + rnd() * 0.05 };
  });

  // Relax so no two labels share a spot.
  const MIN = 0.68;
  for (let it = 0; it < 120; it++) {
    for (let i = 0; i < terms.length; i++) {
      for (let j = i + 1; j < terms.length; j++) {
        const a = terms[i].pos;
        const b = terms[j].pos;
        const dx = b[0] - a[0];
        const dy = b[1] - a[1];
        const dz = b[2] - a[2];
        const d = Math.hypot(dx, dy, dz) || 0.001;
        if (d < MIN) {
          const k = ((MIN - d) / d) * 0.5;
          a[0] -= dx * k;
          a[1] -= dy * k;
          a[2] -= dz * k;
          b[0] += dx * k;
          b[1] += dy * k;
          b[2] += dz * k;
        }
      }
    }
  }

  const nCluster = mobile ? 1500 : 3400;
  const nDust = mobile ? 420 : 950;
  const nNear = mobile ? 14 : 34;
  const count = terms.length + nCluster + nDust + nNear;
  const noise = new Float32Array(count * 3);
  const order = new Float32Array(count * 3);
  const meta = new Float32Array(count * 4);
  let k = 0;
  const put = (n: V3, o: V3, seed: number, term: number, kind: number, size: number) => {
    noise.set(n, k * 3);
    order.set(o, k * 3);
    meta.set([seed, term, kind, size], k * 4);
    k++;
  };
  const inEllipsoid = (rx: number, ry: number, rz: number, cz = 0): V3 => {
    for (;;) {
      const x = rnd() * 2 - 1;
      const y = rnd() * 2 - 1;
      const z = rnd() * 2 - 1;
      if (x * x + y * y + z * z <= 1) return [x * rx, y * ry, z * rz + cz];
    }
  };

  // Node points: one per term, the dot each label hangs from.
  terms.forEach((t, i) => put(inEllipsoid(5.6, 3.3, 3.4), t.pos, t.seed, i, KIND_CLUSTER, 2.4));

  // Cluster points, allotted by how much each term is used.
  const weights = terms.map((t) => 1 + t.uses * 1.4);
  const wsum = weights.reduce((s, x) => s + x, 0);
  terms.forEach((t, i) => {
    const n = Math.round((weights[i] / wsum) * nCluster);
    const sigma = 0.085 + Math.min(t.uses, 3) * 0.03;
    for (let j = 0; j < n; j++) {
      const o: V3 = [t.pos[0] + gauss() * sigma, t.pos[1] + gauss() * sigma * 0.85, t.pos[2] + gauss() * sigma];
      put(inEllipsoid(5.8, 3.4, 3.6), o, rnd(), i, KIND_CLUSTER, rnd());
    }
  });
  const used = k;
  // Dust on a distant shell.
  for (let j = 0; j < nDust && k < count - nNear; j++) {
    const th = rnd() * Math.PI * 2;
    const ph = Math.acos(2 * rnd() - 1);
    const r = 4.6 + rnd() * 2.6;
    put(inEllipsoid(8.5, 5.2, 4.6, -1.5), [r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph) * 0.7, r * Math.sin(ph) * Math.sin(th)], rnd(), SENTINEL, KIND_DUST, rnd());
  }
  // Near defocused points, authored in view space so they pass the camera.
  while (k < count) {
    const v: V3 = [(rnd() * 2 - 1) * 4.4, (rnd() * 2 - 1) * 2.7, -1.5 - rnd() * 3.2];
    put(v, v, rnd(), SENTINEL, KIND_NEAR, rnd());
  }
  void used;
  return { terms, count, noise, order, meta };
}

const VERT = `
precision highp float;
attribute vec3 aNoise;
attribute vec3 aOrder;
attribute vec4 aMeta;
uniform mat4 uMV;
uniform mat4 uP;
uniform float uOrder;
uniform float uTime;
uniform float uFocus;
uniform float uPullK;
uniform float uPix;
uniform float uSize;
uniform vec2 uOffset;
uniform float uDolly;
uniform vec2 uPointer;
uniform float uMotion;
uniform vec4 uMask;
uniform float uHi[${HIT_SLOTS}];
varying float vAlpha;
varying float vHi;
varying float vKind;
void main() {
  float seed = aMeta.x;
  int ti = int(aMeta.y + 0.5);
  float hi = 0.0;
  for (int i = 0; i < ${HIT_SLOTS}; i++) { if (i == ti) hi = uHi[i]; }
  float kind = aMeta.z;
  vec4 mv;
  if (kind > 1.5) {
    vec3 n = aNoise;
    n.xy += uPointer * (0.55 + seed * 0.4) * uMotion;
    n.z += uDolly * (1.3 + seed * 0.6);
    mv = vec4(n, 1.0);
  } else {
    float t = clamp(uOrder * 1.45 - seed * 0.45, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);
    vec3 p = mix(aNoise, aOrder, t);
    p += uMotion * 0.03 * vec3(sin(uTime * 0.55 + seed * 40.0), cos(uTime * 0.47 + seed * 31.0), sin(uTime * 0.39 + seed * 23.0));
    mv = uMV * vec4(p, 1.0);
  }
  float pull = hi * uFocus;
  mv.xyz = mix(mv.xyz, vec3(mv.xy * 0.84, mv.z + 1.2), pull * uPullK);
  mv.xy += uOffset;
  gl_Position = uP * mv;
  float depth = max(-mv.z, 0.05);
  float base = kind > 1.5 ? 22.0 : (kind > 0.5 ? 1.0 : 0.7);
  float sz = uSize * base * (0.7 + fract(aMeta.w) * 0.6 + floor(aMeta.w) * 0.9) * (1.0 + pull * 0.9);
  gl_PointSize = clamp(sz * uPix / depth, 1.0, 90.0);
  float a = kind > 1.5 ? 0.1 : (kind > 0.5 ? 0.72 : 0.42);
  a *= clamp(1.4 - depth * 0.12, 0.22, 1.0);
  if (kind > 1.5) a *= 1.0 - smoothstep(-1.0, -0.2, mv.z);
  if (kind > 0.5 && kind < 1.5) a *= mix(1.0, 0.3, uFocus * (1.0 - hi));
  vec2 ndc = gl_Position.xy / gl_Position.w;
  float inX = smoothstep(uMask.x - 0.1, uMask.x + 0.04, ndc.x) * (1.0 - smoothstep(uMask.z - 0.04, uMask.z + 0.1, ndc.x));
  float inY = smoothstep(uMask.y - 0.1, uMask.y + 0.04, ndc.y) * (1.0 - smoothstep(uMask.w - 0.04, uMask.w + 0.1, ndc.y));
  a *= mix(1.0, 0.16, inX * inY);
  vAlpha = a;
  vHi = pull;
  vKind = kind;
}`;

const FRAG = `
precision mediump float;
uniform vec3 uBase;
uniform vec3 uDust;
uniform vec3 uAccent;
uniform float uFade;
varying float vAlpha;
varying float vHi;
varying float vKind;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float r = length(c);
  float soft = vKind > 1.5 ? 1.0 - smoothstep(0.05, 0.5, r) : 1.0 - smoothstep(0.3, 0.5, r);
  if (soft <= 0.001) discard;
  vec3 col = vKind < 0.5 ? uDust : mix(uBase, uAccent, clamp(vHi * 1.15, 0.0, 1.0));
  float a = vAlpha * soft * uFade;
  gl_FragColor = vec4(col * a, a);
}`;

function hexRgb(h: string): V3 {
  const n = parseInt(h.replace('#', ''), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export type FieldOptions = { reduce: boolean; mobile: boolean };
export type MaskBox = [number, number, number, number]; // NDC x0, y0, x1, y1

export class LatentField {
  private canvas: HTMLCanvasElement;
  private labels: HTMLElement;
  private opts: FieldOptions;
  private L: Layout;
  private gl: WebGLRenderingContext | null = null;
  private ctx2d: CanvasRenderingContext2D | null = null;
  private prog: WebGLProgram | null = null;
  private loc: Record<string, WebGLUniformLocation | null> = {};
  private bufs: WebGLBuffer[] = [];
  private raf = 0;
  private running = false;
  private dead = false;
  private last = 0;
  private time = 0;
  private yaw = 0.45;
  private W = 1;
  private H = 1;
  private dpr = 1;

  // targets and smoothed state
  orderTarget = 0;
  private orderCur = 0;
  private hitsTarget = new Float32Array(HIT_SLOTS);
  private hitsCur = new Float32Array(HIT_SLOTS);
  private focusCur = 0;
  private pointerT: [number, number] = [0, 0];
  private pointer: [number, number] = [0, 0];
  private mask: MaskBox = [9, 9, 9, 9];
  fade = 1;
  rayOrigin: { x: number; y: number; strength: number } | null = null;

  private termEls: HTMLElement[] = [];
  private clusterEls: HTMLElement[] = [];
  private rayEls: SVGLineElement[] = [];
  private onResize = () => this.resize();
  private onPointer = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    this.pointerT = [(e.clientX / innerWidth) * 2 - 1, -((e.clientY / innerHeight) * 2 - 1)];
  };
  private onVis = () => {
    if (document.hidden) this.stop();
    else if (this.wantRun) this.start();
  };
  private wantRun = true;
  mode: 'webgl' | '2d' = 'webgl';

  constructor(canvas: HTMLCanvasElement, labels: HTMLElement, opts: FieldOptions) {
    this.canvas = canvas;
    this.labels = labels;
    this.opts = opts;
    this.L = buildLayout(opts.mobile);
    if (opts.reduce) {
      this.orderCur = 1;
      this.orderTarget = 1;
    }
    this.initGL() || this.init2D();
    this.buildLabels();
    this.resize();
    document.fonts?.ready.then(() => !this.dead && this.measure());
    addEventListener('resize', this.onResize, { passive: true });
    document.addEventListener('visibilitychange', this.onVis);
    if (!opts.reduce && matchMedia('(hover: hover) and (pointer: fine)').matches) {
      addEventListener('pointermove', this.onPointer, { passive: true });
    }
    this.start();
  }

  private initGL(): boolean {
    const gl = this.canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false });
    if (!gl) return false;
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader');
      return s;
    };
    try {
      const prog = gl.createProgram()!;
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) || 'link');
      gl.useProgram(prog);
      const attr = (name: string, data: Float32Array, size: number) => {
        const b = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, b);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        const l = gl.getAttribLocation(prog, name);
        gl.enableVertexAttribArray(l);
        gl.vertexAttribPointer(l, size, gl.FLOAT, false, 0, 0);
        this.bufs.push(b);
      };
      attr('aNoise', this.L.noise, 3);
      attr('aOrder', this.L.order, 3);
      attr('aMeta', this.L.meta, 4);
      for (const n of ['uMV', 'uP', 'uOrder', 'uTime', 'uFocus', 'uPullK', 'uPix', 'uSize', 'uOffset', 'uDolly', 'uPointer', 'uMotion', 'uMask', 'uHi', 'uBase', 'uDust', 'uAccent', 'uFade']) {
        this.loc[n] = gl.getUniformLocation(prog, n === 'uHi' ? 'uHi[0]' : n);
      }
      gl.uniform3fv(this.loc.uBase, hexRgb('#B4C4DC'));
      gl.uniform3fv(this.loc.uDust, hexRgb('#6C83A6'));
      gl.uniform3fv(this.loc.uAccent, hexRgb('#F2B544'));
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.disable(gl.DEPTH_TEST);
      this.canvas.addEventListener('webglcontextlost', (e) => {
        e.preventDefault();
        this.gl = null;
        this.mode = '2d';
        // A lost context cannot be drawn on with 2D; swap in a fresh canvas.
        const c = this.canvas.cloneNode(false) as HTMLCanvasElement;
        this.canvas.replaceWith(c);
        this.canvas = c;
        this.init2D();
        this.resize();
      });
      this.gl = gl;
      this.prog = prog;
      this.mode = 'webgl';
      return true;
    } catch (err) {
      console.warn('[field] WebGL unavailable, drawing in 2D', err);
      return false;
    }
  }

  private init2D() {
    this.mode = '2d';
    this.ctx2d = this.canvas.getContext('2d');
  }

  private buildLabels() {
    const frag = document.createDocumentFragment();
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'kp-rays');
    svg.setAttribute('aria-hidden', 'true');
    this.L.terms.forEach(() => {
      const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      svg.appendChild(l);
      this.rayEls.push(l);
    });
    frag.appendChild(svg);
    (Object.keys(DOMAIN_LABEL) as Domain[]).forEach((d) => {
      const el = document.createElement('span');
      el.className = 'kp-cluster';
      el.textContent = DOMAIN_LABEL[d];
      el.dataset.domain = d;
      frag.appendChild(el);
      this.clusterEls.push(el);
    });
    this.L.terms.forEach((t) => {
      const el = document.createElement('span');
      el.className = 'kp-term';
      el.textContent = t.label;
      frag.appendChild(el);
      this.termEls.push(el);
    });
    this.labels.appendChild(frag);
  }

  setHits(hits: number[]) {
    for (let i = 0; i < HIT_SLOTS; i++) this.hitsTarget[i] = i < hits.length ? hits[i] : 0;
    this.kick();
  }
  setMask(m: MaskBox | null) {
    this.mask = m ?? [9, 9, 9, 9];
  }
  setActive(on: boolean) {
    this.wantRun = on;
    if (on) this.start();
    else this.stop();
  }
  /** Reduced motion renders on demand only. */
  kick() {
    if (this.opts.reduce && !this.raf && this.wantRun) this.raf = requestAnimationFrame(this.loop);
  }

  private start() {
    if (this.running || this.dead || document.hidden) return;
    this.running = true;
    this.last = performance.now();
    if (!this.raf) this.raf = requestAnimationFrame(this.loop);
  }
  private stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  resize() {
    const mobile = innerWidth < 860;
    this.dpr = Math.min(devicePixelRatio || 1, mobile ? 1.5 : 1.75);
    const w = this.canvas.clientWidth || innerWidth;
    const h = this.canvas.clientHeight || innerHeight;
    // Ignore small height-only changes (phone URL bar), they would flicker.
    if (Math.abs(w - this.W) < 1 && Math.abs(h - this.H) < 120 && this.W > 1) return;
    this.W = w;
    this.H = h;
    this.sizes = [];
    this.canvas.width = Math.round(w * this.dpr);
    this.canvas.height = Math.round(h * this.dpr);
    if (this.gl) this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.kick();
  }

  // Camera, framing and the CPU twin of the vertex shader.
  private frame() {
    const aspect = this.W / this.H;
    const portrait = aspect < 0.95;
    const o = smooth(this.orderCur);
    const fovy = ((portrait ? 56 : 42) * Math.PI) / 180;
    const f = 1 / Math.tan(fovy / 2);
    const scale = portrait ? clamp(aspect * 1.05, 0.48, 0.9) : 0.8;
    const camZ = this.opts.reduce ? 5.6 : 7.4 - 1.8 * o;
    const offX = portrait ? 0 : clamp((aspect - 1.0) / 0.6, 0, 1) * 1.05;
    const offY = portrait ? 0.9 : 0.12;
    const pitch = -0.16 + (this.opts.reduce ? 0 : this.pointer[1] * 0.08);
    const yaw = this.yaw + (this.opts.reduce ? 0 : this.pointer[0] * 0.2);
    const cy = Math.cos(yaw);
    const sy = Math.sin(yaw);
    const cx = Math.cos(pitch);
    const sx = Math.sin(pitch);
    const R = [cy, 0, sy, sx * sy, cx, -sx * cy, -cx * sy, sx, cx * cy];
    return { aspect, f, scale, camZ, offX, offY, R, dolly: this.opts.reduce ? 0 : (7.4 - camZ) };
  }

  private project(
    F: ReturnType<LatentField['frame']>,
    p: V3,
    pull: number,
    pullK: number,
  ): { x: number; y: number; depth: number; ndcX: number; ndcY: number } {
    const { R, scale, camZ, f, aspect, offX, offY } = F;
    let x = (R[0] * p[0] + R[1] * p[1] + R[2] * p[2]) * scale;
    let y = (R[3] * p[0] + R[4] * p[1] + R[5] * p[2]) * scale;
    let z = (R[6] * p[0] + R[7] * p[1] + R[8] * p[2]) * scale - camZ;
    const k = pull * pullK;
    x = x + (x * 0.84 - x) * k;
    y = y + (y * 0.84 - y) * k;
    z = z + 1.2 * k;
    x += offX;
    y += offY;
    const w = Math.max(-z, 0.05);
    const ndcX = ((f / aspect) * x) / w;
    const ndcY = (f * y) / w;
    return { x: (ndcX * 0.5 + 0.5) * this.W, y: (1 - (ndcY * 0.5 + 0.5)) * this.H, depth: w, ndcX, ndcY };
  }

  private loop = (now: number) => {
    this.raf = 0;
    if (this.dead) return;
    const dt = Math.min((now - this.last) / 1000, 0.1);
    this.last = now;
    const reduce = this.opts.reduce;
    const ease = (r: number) => 1 - Math.pow(1 - r, dt * 60 || 1);

    if (!reduce) {
      this.time += dt;
      this.orderCur += (this.orderTarget - this.orderCur) * ease(0.12);
      this.pointer[0] += (this.pointerT[0] - this.pointer[0]) * ease(0.05);
      this.pointer[1] += (this.pointerT[1] - this.pointer[1]) * ease(0.05);
    }
    let anyHit = 0;
    let settling = false;
    for (let i = 0; i < HIT_SLOTS; i++) {
      const d = this.hitsTarget[i] - this.hitsCur[i];
      this.hitsCur[i] = reduce ? this.hitsTarget[i] : this.hitsCur[i] + d * ease(0.09);
      if (Math.abs(d) > 0.002) settling = true;
      anyHit = Math.max(anyHit, this.hitsTarget[i]);
    }
    const focusT = anyHit > 0 ? 1 : 0;
    this.focusCur = reduce ? focusT : this.focusCur + (focusT - this.focusCur) * ease(0.06);
    if (!reduce) this.yaw += dt * 0.032 * (1 - 0.65 * this.focusCur);

    const F = this.frame();
    if (this.gl) this.drawGL(F);
    else this.draw2D(F);
    this.drawLabels(F, dt);

    if (this.running && !reduce) this.raf = requestAnimationFrame(this.loop);
    else if (reduce && settling && this.wantRun) this.raf = requestAnimationFrame(this.loop);
  };

  private drawGL(F: ReturnType<LatentField['frame']>) {
    const gl = this.gl!;
    const { R, scale, camZ, f, aspect } = F;
    const s = scale;
    const mv = new Float32Array([
      R[0] * s, R[3] * s, R[6] * s, 0,
      R[1] * s, R[4] * s, R[7] * s, 0,
      R[2] * s, R[5] * s, R[8] * s, 0,
      0, 0, -camZ, 1,
    ]);
    const N = 0.1;
    const FAR = 40;
    const p = new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (FAR + N) / (N - FAR), -1, 0, 0, (2 * FAR * N) / (N - FAR), 0]);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniformMatrix4fv(this.loc.uMV, false, mv);
    gl.uniformMatrix4fv(this.loc.uP, false, p);
    gl.uniform1f(this.loc.uOrder, this.orderCur);
    gl.uniform1f(this.loc.uTime, this.time);
    gl.uniform1f(this.loc.uFocus, this.focusCur);
    gl.uniform1f(this.loc.uPullK, this.opts.reduce ? 0 : 0.55);
    gl.uniform1f(this.loc.uPix, this.dpr);
    gl.uniform1f(this.loc.uSize, this.opts.mobile ? 13 : 15);
    gl.uniform2f(this.loc.uOffset, F.offX, F.offY);
    gl.uniform1f(this.loc.uDolly, F.dolly);
    gl.uniform2f(this.loc.uPointer, this.pointer[0], this.pointer[1]);
    gl.uniform1f(this.loc.uMotion, this.opts.reduce ? 0 : 1);
    gl.uniform4fv(this.loc.uMask, this.mask);
    gl.uniform1fv(this.loc.uHi, this.hitsCur);
    gl.uniform1f(this.loc.uFade, this.fade);
    gl.drawArrays(gl.POINTS, 0, this.L.count);
  }

  private draw2D(F: ReturnType<LatentField['frame']>) {
    const ctx = this.ctx2d;
    if (!ctx) return;
    const { noise, order, meta, count } = this.L;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.W, this.H);
    const o = this.orderCur;
    const pullK = this.opts.reduce ? 0 : 0.55;
    const step = this.opts.mobile ? 2 : 1;
    const [mx0, my0, mx1, my1] = this.mask;
    for (let i = 0; i < count; i += step) {
      const kind = meta[i * 4 + 2];
      if (kind > 1.5) continue;
      const seed = meta[i * 4];
      const ti = Math.round(meta[i * 4 + 1]);
      const hi = ti < HIT_SLOTS ? this.hitsCur[ti] : 0;
      const t = smooth(o * 1.45 - seed * 0.45);
      const p: V3 = [
        noise[i * 3] + (order[i * 3] - noise[i * 3]) * t,
        noise[i * 3 + 1] + (order[i * 3 + 1] - noise[i * 3 + 1]) * t,
        noise[i * 3 + 2] + (order[i * 3 + 2] - noise[i * 3 + 2]) * t,
      ];
      const pull = hi * this.focusCur;
      const q = this.project(F, p, pull, pullK);
      if (q.depth < 0.1) continue;
      let a = kind > 0.5 ? 0.72 : 0.42;
      a *= clamp(1.4 - q.depth * 0.12, 0.22, 1);
      if (kind > 0.5) a *= 1 - 0.7 * this.focusCur * (1 - hi);
      if (q.ndcX > mx0 && q.ndcX < mx1 && q.ndcY > my0 && q.ndcY < my1) a *= 0.16;
      const sz = Math.max(0.8, ((this.opts.mobile ? 13 : 15) * (kind > 0.5 ? 1 : 0.7) * (0.7 + (meta[i * 4 + 3] % 1) * 0.6 + Math.floor(meta[i * 4 + 3]) * 0.9) * (1 + pull * 0.9)) / q.depth / 2);
      ctx.globalAlpha = a * this.fade;
      ctx.fillStyle = kind < 0.5 ? '#6C83A6' : pull > 0.4 ? '#F2B544' : '#B4C4DC';
      ctx.beginPath();
      ctx.arc(q.x, q.y, sz, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // Label sizes are measured once (and again when fonts land or the window
  // resizes); placement runs every frame without touching layout.
  private sizes: { w: number; h: number }[] = [];
  private shown = new Float32Array(64);
  measure() {
    this.sizes = [...this.clusterEls, ...this.termEls].map((el) => ({ w: el.offsetWidth, h: el.offsetHeight }));
  }

  private drawLabels(F: ReturnType<LatentField['frame']>, dt = 1 / 60) {
    if (!this.sizes.length) this.measure();
    const o = this.orderCur;
    const vis = smooth((o - 0.7) / 0.28) * this.fade;
    const pullK = this.opts.reduce ? 0 : 0.55;
    const portrait = this.W / this.H < 0.95;
    const [mx0, my0, mx1, my1] = this.mask;
    const ray = portrait ? null : this.rayOrigin;
    const toPx = (nx: number, ny: number) => [(nx * 0.5 + 0.5) * this.W, (1 - (ny * 0.5 + 0.5)) * this.H];
    const [bx0, by1] = toPx(mx0, my0);
    const [bx1, by0] = toPx(mx1, my1);
    const maskBox = [bx0, by0, bx1, by1];
    const overlaps = (a: number[], b: number[], pad = 4) => a[0] < b[2] + pad && a[2] + pad > b[0] && a[1] < b[3] + pad && a[3] + pad > b[1];

    type Cand = { el: HTMLElement; slot: number; x: number; y: number; box: number[]; a: number; pri: number; term?: number; q?: { x: number; y: number } };
    const cands: Cand[] = [];
    const nC = this.clusterEls.length;

    (Object.keys(DOMAIN_LABEL) as Domain[]).forEach((d, i) => {
      const a0 = ANCHOR[d];
      const q = this.project(F, [a0[0], a0[1] + 0.95, a0[2]], 0, 0);
      const sz = this.sizes[i] || { w: 100, h: 14 };
      const x = clamp(q.x, sz.w / 2 + 12, this.W - sz.w / 2 - 12);
      const y = clamp(q.y, 92, this.H - 24);
      cands.push({ el: this.clusterEls[i], slot: i, x, y, box: [x - sz.w / 2, y - sz.h, x + sz.w / 2, y], a: vis * (1 - 0.6 * this.focusCur), pri: 10 });
    });

    this.L.terms.forEach((t, i) => {
      const hi = this.hitsCur[i];
      const pull = hi * this.focusCur;
      const b = this.opts.reduce ? 0 : 0.03;
      const sd = t.seed;
      const p: V3 = [
        t.pos[0] + b * Math.sin(this.time * 0.55 + sd * 40),
        t.pos[1] + b * Math.cos(this.time * 0.47 + sd * 31),
        t.pos[2] + b * Math.sin(this.time * 0.39 + sd * 23),
      ];
      const q = this.project(F, p, pull, pullK);
      const hit = hi > 0.6 && this.focusCur > 0.3;
      let a = vis * clamp(1.5 - q.depth * 0.17, 0.3, 1);
      a *= 1 - this.focusCur * (1 - Math.max(hi, 0.3)) * 0.75;
      if (portrait && !hit && t.uses === 0) a = 0;
      const sz = this.sizes[nC + i] || { w: 60, h: 12 };
      const x = q.x + 9;
      const y = q.y - sz.h / 2;
      cands.push({
        el: this.termEls[i],
        slot: nC + i,
        x,
        y,
        box: [x - 2, y, x + sz.w + 2, y + sz.h],
        a,
        pri: (hit ? 5 + hi : 1) + t.uses * 0.3 + 1 / q.depth,
        term: i,
        q,
      });
    });

    // Greedy placement: most important first; anything that would collide,
    // leave the frame or sit under the copy is faded out rather than overlapped.
    cands.sort((A, B) => B.pri - A.pri);
    const placed: number[][] = [];
    const k = this.opts.reduce ? 1 : 1 - Math.pow(1 - 0.22, Math.max(dt, 1 / 60) * 60);
    for (const c of cands) {
      let target = c.a;
      const [x0, y0, x1, y1] = c.box;
      if (target < 0.02 || x0 < 8 || x1 > this.W - 8 || y0 < 70 || y1 > this.H - 8) target = 0;
      else if (overlaps(c.box, maskBox, 6)) target = 0;
      else if (placed.some((b) => overlaps(c.box, b))) target = 0;
      else placed.push(c.box);
      const cur = this.shown[c.slot] + (target - this.shown[c.slot]) * k;
      this.shown[c.slot] = cur;
      c.el.style.opacity = cur.toFixed(3);
      c.el.style.transform =
        c.term === undefined ? `translate3d(${c.x.toFixed(1)}px, ${c.y.toFixed(1)}px, 0) translate(-50%, -100%)` : `translate3d(${c.x.toFixed(1)}px, ${c.y.toFixed(1)}px, 0)`;

      if (c.term !== undefined && c.q) {
        const hi = this.hitsCur[c.term];
        const hit = hi > 0.6 && this.focusCur > 0.3;
        if (hit !== c.el.classList.contains('is-hit')) c.el.classList.toggle('is-hit', hit);
        const line = this.rayEls[c.term];
        const ra = ray && hi > 0.6 ? ray.strength * Math.min(1, hi) * vis * (overlaps([c.q.x, c.q.y, c.q.x, c.q.y], maskBox, 0) ? 0 : 1) : 0;
        if (ra > 0.01 && ray) {
          line.setAttribute('x1', ray.x.toFixed(1));
          line.setAttribute('y1', ray.y.toFixed(1));
          line.setAttribute('x2', c.q.x.toFixed(1));
          line.setAttribute('y2', c.q.y.toFixed(1));
          line.style.opacity = (ra * 0.55).toFixed(3);
        } else if (line.style.opacity !== '0') {
          line.style.opacity = '0';
        }
      }
    }
  }

  destroy() {
    this.dead = true;
    this.stop();
    removeEventListener('resize', this.onResize);
    removeEventListener('pointermove', this.onPointer);
    document.removeEventListener('visibilitychange', this.onVis);
    if (this.gl) {
      this.bufs.forEach((b) => this.gl!.deleteBuffer(b));
      if (this.prog) this.gl.deleteProgram(this.prog);
    }
    this.labels.textContent = '';
  }
}
