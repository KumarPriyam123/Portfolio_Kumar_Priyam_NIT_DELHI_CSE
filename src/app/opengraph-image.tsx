import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

// The link preview recruiters see on LinkedIn and Slack: the latent field in
// miniature, with one query hub and its rays, rendered at build time.
export const alt = 'Kumar Priyam: AI Engineer, SDE, Data Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function rnd(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default async function OG() {
  const dir = path.join(process.cwd(), 'src/app/fonts');
  const [semi, reg] = await Promise.all([readFile(path.join(dir, 'Geist-SemiBold.ttf')), readFile(path.join(dir, 'Geist-Regular.ttf'))]);
  const r = rnd(7);
  const centers = [
    [760, 190],
    [1010, 260],
    [880, 450],
  ];
  const hits = [
    [800, 215],
    [905, 470],
  ];
  const dots: { x: number; y: number; s: number; o: number; hit: boolean }[] = [];
  centers.forEach(([cx, cy], ci) => {
    for (let i = 0; i < 70; i++) {
      const g = () => (r() + r() + r() - 1.5) * 70;
      dots.push({ x: cx + g(), y: cy + g() * 0.8, s: 2 + r() * 3, o: 0.35 + r() * 0.5, hit: ci !== 1 && r() > 0.45 });
    }
  });
  for (let i = 0; i < 60; i++) dots.push({ x: 560 + r() * 640, y: r() * 630, s: 1.5 + r() * 1.5, o: 0.2 + r() * 0.3, hit: false });

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#070a10', color: '#e8edf5', fontFamily: 'Geist', position: 'relative' }}>
        <svg width="1200" height="630" style={{ position: 'absolute', inset: 0 }}>
          {hits.map(([x, y], i) => (
            <line key={i} x1={600} y1={430} x2={x} y2={y} stroke="#f2b544" strokeOpacity="0.55" strokeWidth="1.5" />
          ))}
          {dots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.s} fill={d.hit ? '#f2b544' : '#b4c4dc'} fillOpacity={d.o} />
          ))}
          <circle cx={600} cy={430} r={7} fill="#f2b544" />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '64px 72px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, color: '#93a1b6' }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, background: '#f2b544' }} />
            Open to roles · NIT Delhi, Class of 2027
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 132, fontWeight: 600, letterSpacing: -6, lineHeight: 0.92, marginTop: 18 }}>
            <span>Kumar</span>
            <span>Priyam</span>
          </div>
          <div style={{ fontSize: 34, marginTop: 26, color: '#e8edf5' }}>AI Engineer · SDE · Data Engineer</div>
          <div style={{ fontSize: 24, marginTop: 10, color: '#93a1b6' }}>kpriyam.me</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Geist', data: semi, weight: 600, style: 'normal' },
        { name: 'Geist', data: reg, weight: 400, style: 'normal' },
      ],
    },
  );
}
