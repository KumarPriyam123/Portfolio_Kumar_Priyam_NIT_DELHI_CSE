import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

// The link preview recruiters see on LinkedIn and Slack: the photo, the name,
// and the three crafts in their colours. Rendered at build time.
export const alt = 'Kumar Priyam: Software Engineer, AI Engineer, Data Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const ROLES = [
  { t: 'Software Engineer', c: '#5eead4' },
  { t: 'AI Engineer', c: '#f2b544' },
  { t: 'Data Engineer', c: '#ff8a65' },
];

export default async function OG() {
  const root = process.cwd();
  const dir = path.join(root, 'src/app/fonts');
  const [semi, reg, photo] = await Promise.all([
    readFile(path.join(dir, 'Geist-SemiBold.ttf')),
    readFile(path.join(dir, 'Geist-Regular.ttf')),
    readFile(path.join(root, 'public/portrait/kumar-cutout.png')),
  ]);
  const src = `data:image/png;base64,${photo.toString('base64')}`;

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#070a10', color: '#e8edf5', fontFamily: 'Geist', position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            right: 40,
            bottom: 0,
            width: 520,
            height: 600,
            display: 'flex',
            background: 'radial-gradient(60% 50% at 20% 40%, rgba(94,234,212,0.28), transparent 70%), radial-gradient(60% 50% at 85% 30%, rgba(242,181,68,0.26), transparent 70%), radial-gradient(90% 50% at 50% 100%, rgba(255,138,101,0.3), transparent 70%)',
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={466} height={599} alt="" style={{ position: 'absolute', right: 66, bottom: 0 }} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '64px 72px', width: 700 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, color: '#93a1b6' }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, background: '#4ade80' }} />
            Open to roles · NIT Delhi, Class of 2027
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 120, fontWeight: 600, letterSpacing: -5, lineHeight: 0.92, marginTop: 18 }}>
            <span>Kumar</span>
            <span>Priyam</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 30 }}>
            {ROLES.map((r) => (
              <div key={r.t} style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 32 }}>
                <div style={{ width: 12, height: 12, borderRadius: 12, background: r.c }} />
                {r.t}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 22, marginTop: 22, color: '#93a1b6' }}>kpriyam.me</div>
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
