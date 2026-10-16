'use client';

// Marks the words in a passage that the visitor's query hit, so a case study
// shows why it ranked. Plain text when there is no query.

import { Fragment, useMemo } from 'react';
import { parseQuery, rank, tokenize } from '@/lib/search';
import { useQuery } from '@/lib/query-store';

export default function Marked({ text }: { text: string }) {
  const q = useQuery();
  const set = useMemo(() => {
    const p = parseQuery(q.text);
    return new Set([...p.direct, ...p.expanded].filter((t) => t.length > 2));
  }, [q.text]);
  if (!set.size) return <>{text}</>;
  const parts = text.split(/([A-Za-z0-9.+#-]+)/);
  return (
    <>
      {parts.map((w, i) => {
        if (i % 2 === 0) return <Fragment key={i}>{w}</Fragment>;
        const toks = tokenize(w);
        const hit = toks.length > 0 && toks.some((t) => set.has(t));
        return hit ? (
          <mark key={i} className="kp-mark">
            {w}
          </mark>
        ) : (
          <Fragment key={i}>{w}</Fragment>
        );
      })}
    </>
  );
}

export function MatchNote({ slug }: { slug: string }) {
  const q = useQuery();
  const info = useMemo(() => {
    if (q.source !== 'user' || !q.text.trim()) return null;
    const { results } = rank(q.text);
    const i = results.findIndex((r) => r.project.slug === slug);
    return i === -1 ? null : { pos: i + 1, of: results.length, r: results[i] };
  }, [q, slug]);
  if (!info) return null;
  return (
    <div className="kp-carry mt-8">
      <p className="kp-label">Your query</p>
      <p className="mt-2">
        <span className="text-ink">“{q.text.trim()}”</span>
        <span className="text-soft">
          {' '}
          ranks this {info.pos} of {info.of}
          {info.r.matched.length > 0 ? `, on ${info.r.matched.join(', ')}` : ', with no direct match'}.
        </span>
      </p>
      <p className="mt-1 text-sm text-soft">Matched words are marked below.</p>
    </div>
  );
}
