// Three small animated diagrams, one per craft. Pure SVG + CSS: packets are a
// single dash travelling a path (pathLength 100), nodes "fire" on staggered
// delays. Everything stops under reduced motion (see .kp-pkt in globals.css).

type P = { d: string; dl?: number; dur?: number };
const Pkt = ({ d, dl = 0, dur = 2.4 }: P) => (
  <path d={d} pathLength={100} className="kp-pkt" style={{ ['--dl' as string]: `${dl}s`, ['--dur' as string]: `${dur}s` }} />
);

function Box({ x, y, w = 118, h = 42, k, v }: { x: number; y: number; w?: number; h?: number; k: string; v: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={7} className="kp-fig__box" />
      <text x={x + 12} y={y + 17} className="kp-fig__k">
        {k}
      </text>
      <text x={x + 12} y={y + 32} className="kp-fig__v">
        {v}
      </text>
    </g>
  );
}

/** Software: a request moving through a real-time system. */
export function SdeFig() {
  const wires = [
    'M138 56 C 170 56, 170 116, 196 116',
    'M314 116 C 344 116, 344 56, 372 56',
    'M314 116 C 344 116, 344 176, 372 176',
    'M79 77 L 79 155',
  ];
  return (
    <svg viewBox="0 0 492 226" className="kp-fig" role="img" aria-label="Diagram: a client talks to a FastAPI service backed by Postgres and a Redis queue, with a WebRTC peer link.">
      {wires.map((d) => (
        <path key={d} d={d} className="kp-fig__wire" />
      ))}
      <Pkt d={wires[0]} dl={0} />
      <Pkt d={wires[1]} dl={0.9} />
      <Pkt d={wires[2]} dl={1.4} />
      <Pkt d="M372 56 C 344 56, 344 116, 314 116" dl={1.9} />
      <Pkt d="M196 116 C 170 116, 170 56, 138 56" dl={2.6} />
      <Pkt d={wires[3]} dl={0.4} dur={1.6} />
      <Pkt d="M79 155 L 79 77" dl={1.2} dur={1.6} />
      <Box x={20} y={35} k="client" v="Next.js · React" />
      <Box x={196} y={95} k="api" v="FastAPI · Node" />
      <Box x={372} y={35} k="db" v="PostgreSQL" />
      <Box x={372} y={155} k="queue" v="Redis · BullMQ" />
      <Box x={20} y={155} k="peer" v="WebRTC · <70ms" />
      <circle cx={255} cy={95} r={3} className="kp-fire" style={{ ['--dl' as string]: '0.3s' }} />
    </svg>
  );
}

/** AI: activations flowing through a small network. */
export function AiFig() {
  const layers = [
    { x: 46, n: 3, k: 'embed' },
    { x: 172, n: 5, k: 'attend' },
    { x: 298, n: 5, k: 'retrieve' },
    { x: 424, n: 2, k: 'answer' },
  ];
  const ys = (n: number) => Array.from({ length: n }, (_, i) => 108 + (i - (n - 1) / 2) * 38);
  const nodes = layers.map((l) => ys(l.n).map((y) => [l.x, y] as const));
  const edges: string[] = [];
  for (let i = 0; i < nodes.length - 1; i++) for (const a of nodes[i]) for (const b of nodes[i + 1]) edges.push(`M${a[0]} ${a[1]} L${b[0]} ${b[1]}`);
  // A few routes from input to output, each lit in turn.
  const routes = [
    [0, 1, 3, 0],
    [1, 3, 1, 1],
    [2, 2, 4, 1],
    [1, 0, 2, 0],
    [0, 4, 3, 1],
  ].map((r) => 'M' + r.map((j, i) => `${nodes[i][j][0]} ${nodes[i][j][1]}`).join(' L'));
  return (
    <svg viewBox="0 0 470 226" className="kp-fig" role="img" aria-label="Diagram: a neural network with signals flowing from embedding to answer.">
      {edges.map((d) => (
        <path key={d} d={d} className="kp-fig__wire kp-fig__wire--thin" />
      ))}
      {routes.map((d, i) => (
        <Pkt key={d} d={d} dl={i * 0.62} dur={3.1} />
      ))}
      {nodes.flatMap((col, i) =>
        col.map(([x, y], j) => (
          <g key={`${i}-${j}`}>
            <circle cx={x} cy={y} r={7} className="kp-fig__node" />
            <circle cx={x} cy={y} r={3.2} className="kp-fire" style={{ ['--dl' as string]: `${(i * 0.7 + j * 0.37) % 3.1}s`, ['--dur' as string]: '3.1s' }} />
          </g>
        )),
      )}
      {layers.map((l) => (
        <text key={l.k} x={l.x} y={218} textAnchor="middle" className="kp-fig__k">
          {l.k}
        </text>
      ))}
    </svg>
  );
}

/** Data: tenants merging into one validated pipeline, faults triaged aside. */
export function DataFig() {
  const lanes = [40, 92, 144].map((y) => `M24 ${y} C 90 ${y}, 100 92, 150 92`);
  const main = 'M268 92 L 330 92';
  const main2 = 'M448 92 L 510 92';
  const main3 = 'M628 92 L 690 92';
  const fault = 'M390 113 C 390 140, 420 160, 470 160';
  return (
    <svg viewBox="0 0 820 186" className="kp-fig kp-fig--wide" role="img" aria-label="Diagram: three tenant feeds merge into an Airflow pipeline that extracts, validates, loads and classifies failures.">
      {[...lanes, main, main2, main3, fault].map((d) => (
        <path key={d} d={d} className="kp-fig__wire" />
      ))}
      {lanes.map((d, i) => (
        <Pkt key={d} d={d} dl={i * 0.5} dur={2} />
      ))}
      <Pkt d={main} dl={0.9} dur={1.2} />
      <Pkt d={main2} dl={1.5} dur={1.2} />
      <Pkt d={main3} dl={2.1} dur={1.2} />
      <Pkt d={fault} dl={2.4} dur={2.6} />
      {['tenant a', 'tenant b', 'tenant c'].map((t, i) => (
        <text key={t} x={24} y={[40, 92, 144][i] - 12} className="kp-fig__k">
          {t}
        </text>
      ))}
      <Box x={150} y={71} k="extract" v="Airflow DAG" />
      <Box x={330} y={71} k="validate" v="schema · dedup" />
      <Box x={510} y={71} k="load" v="PostgreSQL" />
      <Box x={690} y={71} w={112} k="classify" v="LLM triage" />
      <Box x={470} y={139} w={128} k="quarantine" v="faults classified" />
    </svg>
  );
}
