'use client';

// The close. A real input: the visitor's query and their top matches become the
// first line of the message. Works without JavaScript too: the form is a plain
// POST to Web3Forms, never a GET that would put someone's message in a URL.

import { useEffect, useMemo, useRef, useState } from 'react';
import { CTA_LABEL, RESUMES, SITE, WEB3FORMS_KEY, splitTitle } from '@/lib/site';
import { rank } from '@/lib/search';
import { clearQuery, useQuery } from '@/lib/query-store';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactPanel({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const q = useQuery();
  const carried = q.source === 'user' && q.text.trim() ? q.text.trim() : '';
  const matches = useMemo(() => {
    if (!carried) return [];
    return rank(carried)
      .results.filter((r) => r.score > 0)
      .slice(0, 2)
      .map((r) => splitTitle(r.project.title).name);
  }, [carried]);

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const edited = useRef(false);

  // Pre-fill only while the visitor has not written anything themselves.
  useEffect(() => {
    if (edited.current) return;
    const msg = carried
      ? `Hi Kumar, we're hiring for: ${carried}.${matches.length ? ` Your work that matched: ${matches.join(' and ')}.` : ''}\n\n`
      : '';
    setForm((f) => ({ ...f, message: msg }));
  }, [carried, matches]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      (e.currentTarget.querySelector(':invalid') as HTMLElement | null)?.focus();
      e.currentTarget.reportValidity();
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: carried ? `Portfolio: hiring for ${carried}` : 'New message from portfolio contact form',
          from_name: 'Portfolio Contact',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== false) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
        edited.current = false;
      } else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  const H = headingLevel;

  return (
    <div className="kp-contact__grid">
      <div data-sc-in>
        <H id="contact-title" className="kp-display kp-h1">
          {CTA_LABEL}.
        </H>
        <p className="kp-lede mt-5">I&apos;m looking for AI Engineer, SDE and Data Engineer roles. Tell me about the system you&apos;re building.</p>
        <div className="kp-direct">
          <a href={`mailto:${SITE.email}`}>
            <span className="kp-direct__k">Email</span>
            <span className="kp-direct__v">{SITE.email}</span>
          </a>
          <a href={SITE.phoneHref}>
            <span className="kp-direct__k">Phone</span>
            <span className="kp-direct__v">{SITE.phone}</span>
          </a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
            <span className="kp-direct__k">LinkedIn</span>
            <span className="kp-direct__v">in/kumar-priyam ↗</span>
          </a>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer">
            <span className="kp-direct__k">GitHub</span>
            <span className="kp-direct__v">KumarPriyam123 ↗</span>
          </a>
          {RESUMES.map((r) => (
            <a key={r.id} href={r.href} target="_blank" rel="noopener noreferrer">
              <span className="kp-direct__k">Résumé</span>
              <span className="kp-direct__v">
                {r.label} ↗<span className="block text-sm text-soft">{r.blurb}</span>
              </span>
            </a>
          ))}
        </div>
      </div>

      <div data-sc-in>
        {carried && (
          <div className="kp-carry mb-6">
            <p className="kp-label">Your query</p>
            <p className="mt-2">
              <span className="text-ink">“{carried}”</span>
              {matches.length > 0 && <span className="text-soft"> matched {matches.join(' and ')}.</span>}
            </p>
            <button type="button" className="kp-clear mt-2" onClick={clearQuery}>
              Don&apos;t include it
            </button>
          </div>
        )}
        <form className="kp-form" action="https://api.web3forms.com/submit" method="POST" onSubmit={submit} noValidate>
          <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
          <input type="hidden" name="subject" value={carried ? `Portfolio: hiring for ${carried}` : 'New message from portfolio contact form'} />
          <input type="hidden" name="from_name" value="Portfolio Contact" />
          <div className="kp-form__row">
            <label className="kp-label">
              Name
              <input
                className="kp-input normal-case tracking-normal"
                name="name"
                required
                autoComplete="name"
                placeholder="Your name"
                value={form.name}
                disabled={status === 'sending'}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label className="kp-label">
              Email
              <input
                className="kp-input normal-case tracking-normal"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                value={form.email}
                disabled={status === 'sending'}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
          </div>
          <label className="kp-label">
            Message
            <textarea
              className="kp-input normal-case tracking-normal"
              name="message"
              required
              rows={6}
              placeholder="Hi Kumar, I'd like to talk about an AI Engineer, SDE or Data Engineer role."
              value={form.message}
              disabled={status === 'sending'}
              onChange={(e) => {
                edited.current = true;
                setForm({ ...form, message: e.target.value });
              }}
            />
          </label>
          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" className="kp-btn kp-btn--accent" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : status === 'error' ? 'Retry' : 'Send message'}
            </button>
            <p className="kp-status-msg" role="status" aria-live="polite">
              {status === 'sent' && "Message sent. I'll get back to you soon."}
              {status === 'error' && 'That did not go through. Try again, or email me directly.'}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
