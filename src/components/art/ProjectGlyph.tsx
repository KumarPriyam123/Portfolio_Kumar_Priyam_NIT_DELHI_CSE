// A small moving mark per project, drawn in the card's primary role colour.
// Each one shows the idea of the system, not a logo.

const pkt = (d: string, dl: number, dur = 2.2) => (
  <path d={d} pathLength={100} className="kp-pkt" style={{ ['--dl' as string]: `${dl}s`, ['--dur' as string]: `${dur}s` }} />
);

const GLYPHS: Record<string, () => React.ReactNode> = {
  // Cosine similarity: a job vector swinging toward the résumé vector.
  jobmatch: () => (
    <>
      <path d="M14 58 L 84 18" className="kp-g__line" />
      <g className="kp-g__swing">
        <path d="M14 58 L 90 40" className="kp-g__line kp-g__line--hot" />
        <circle cx={90} cy={40} r={3} className="kp-g__dot" />
      </g>
      <circle cx={84} cy={18} r={3} className="kp-g__dot" />
      <path d="M40 43 A 28 28 0 0 0 41 52" className="kp-g__line kp-g__line--thin" />
      <circle cx={14} cy={58} r={2.5} className="kp-g__dot" />
    </>
  ),
  // A queue that advances one token at a time.
  clinicq: () => (
    <>
      <path d="M10 26 v20 M10 26 h8 M10 46 h8" className="kp-g__line kp-g__line--thin" />
      <g className="kp-g__queue">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={28 + i * 16} cy={36} r={5.5} className={i === 0 ? 'kp-g__dot kp-g__served' : 'kp-g__ring'} />
        ))}
      </g>
    </>
  ),
  // Agents in a ring sharing one memory.
  'marl-maps': () => {
    const pts = [
      [52, 10],
      [86, 36],
      [52, 62],
      [18, 36],
    ];
    const ring = 'M52 10 L86 36 L52 62 L18 36 Z';
    return (
      <>
        {pts.map(([x, y]) => (
          <path key={`${x}${y}`} d={`M52 36 L${x} ${y}`} className="kp-g__line kp-g__line--thin" />
        ))}
        <path d={ring} className="kp-g__line" />
        {pkt(ring, 0, 3.2)}
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={4} className="kp-fire" style={{ ['--dl' as string]: `${i * 0.8}s`, ['--dur' as string]: '3.2s' }} />
        ))}
        <rect x={47} y={31} width={10} height={10} rx={2} className="kp-g__dot" />
      </>
    );
  },
  // Two editors kept in sync.
  'intelligent-interview': () => (
    <>
      <rect x={6} y={12} width={36} height={48} rx={4} className="kp-g__line" />
      <rect x={62} y={12} width={36} height={48} rx={4} className="kp-g__line" />
      {[22, 31, 40].map((y, i) => (
        <g key={y}>
          <path d={`M12 ${y} h${[20, 14, 24][i]}`} className="kp-g__line kp-g__line--thin" />
          <path d={`M68 ${y} h${[20, 14, 24][i]}`} className="kp-g__line kp-g__line--thin" />
        </g>
      ))}
      <path d="M42 36 L62 36" className="kp-g__line kp-g__line--thin" />
      {pkt('M42 36 L62 36', 0, 1.1)}
      <rect x={68} y={46} width={2} height={8} className="kp-g__caret" />
      <rect x={12} y={46} width={2} height={8} className="kp-g__caret" />
    </>
  ),
  // Three tenants, one pipeline.
  'multi-tenant-pipeline': () => {
    const lanes = [14, 36, 58].map((y) => `M6 ${y} C 34 ${y}, 40 36, 60 36 L 98 36`);
    return (
      <>
        {lanes.map((d) => (
          <path key={d} d={d} className="kp-g__line kp-g__line--thin" />
        ))}
        {lanes.map((d, i) => pkt(d, i * 0.55, 1.9))}
        <rect x={60} y={29} width={14} height={14} rx={3} className="kp-g__dot" />
      </>
    );
  },
  // A document, chunked, retrieved, answered.
  'rag-document-qa': () => (
    <>
      <path d="M8 12 h18 l8 8 v34 h-26 z M26 12 v8 h8" className="kp-g__line" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={46} y={16 + i * 15} width={12} height={10} rx={2} className="kp-fire" style={{ ['--dl' as string]: `${i * 0.5}s`, ['--dur' as string]: '2.4s' }} />
      ))}
      <path d="M62 36 L74 36" className="kp-g__line kp-g__line--thin" />
      {pkt('M62 36 L74 36', 1.4, 2.4)}
      <path d="M76 24 h20 a4 4 0 0 1 4 4 v12 a4 4 0 0 1 -4 4 h-12 l-6 6 v-6 h-2 a4 4 0 0 1 -4 -4 v-12 a4 4 0 0 1 4 -4 z" className="kp-g__line" />
    </>
  ),
};

export default function ProjectGlyph({ slug }: { slug: string }) {
  const g = GLYPHS[slug];
  if (!g) return null;
  return (
    <svg viewBox="0 0 104 72" className="kp-glyph" aria-hidden="true">
      {g()}
    </svg>
  );
}
