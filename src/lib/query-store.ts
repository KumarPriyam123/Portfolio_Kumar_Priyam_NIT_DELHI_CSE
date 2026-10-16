'use client';

// The visitor's query is page state that travels: the field, the ranked work,
// the nav chip, case studies and the contact message all read it. Only a query
// the visitor chose ("user") persists; the scroll-typed sample ("demo") never
// leaves the page it was typed on.

import { useSyncExternalStore } from 'react';

export type QuerySource = 'user' | 'demo' | 'none';
export type QueryState = { text: string; source: QuerySource };

const KEY = 'kp:query';
let state: QueryState = { text: '', source: 'none' };
let hydrated = false;
const subs = new Set<() => void>();

function hydrate() {
  if (hydrated || typeof window === 'undefined') return;
  hydrated = true;
  try {
    const saved = sessionStorage.getItem(KEY);
    if (saved) state = { text: saved, source: 'user' };
  } catch {
    /* storage can throw in private modes; the page works without it */
  }
}

function emit() {
  subs.forEach((f) => f());
}

export function setQuery(text: string, source: QuerySource) {
  hydrate();
  const t = text.slice(0, 160);
  if (t === state.text && source === state.source) return;
  state = { text: t, source: t.trim() ? source : 'none' };
  if (source === 'user' || !t.trim()) {
    try {
      if (state.source === 'user') sessionStorage.setItem(KEY, t);
      else if (source === 'user') sessionStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  }
  emit();
}

export function clearQuery() {
  state = { text: '', source: 'none' };
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  emit();
}

export function getQuery(): QueryState {
  hydrate();
  return state;
}

const SERVER: QueryState = { text: '', source: 'none' };

export function useQuery(): QueryState {
  return useSyncExternalStore(
    (f) => {
      subs.add(f);
      return () => subs.delete(f);
    },
    getQuery,
    () => SERVER,
  );
}
