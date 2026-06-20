'use client';

import React, { useEffect, useState } from 'react';

const RESUMES = {
  aiSde: 'https://drive.google.com/file/d/1lPMTdrULT4iWPU5typRmVDVlBtF81wHf/view',
  data: 'https://drive.google.com/file/d/1XJmW1XJ5lQ17fY251xmbZpC3lzsZgviR/view',
};

const contactRows = [
  { label: 'Email', value: 'kpriyam2005p@gmail.com', href: 'mailto:kpriyam2005p@gmail.com' },
  { label: 'Phone', value: '+91 97735 93089', href: 'tel:+919773593089' },
  { label: 'Location', value: 'New Delhi, India', href: null },
];

const socialRows = [
  { label: 'GitHub', href: 'https://github.com/KumarPriyam123' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kumar-priyam-71bbb82a7/' },
];

export default function ConnectPage() {
  useEffect(() => {
    document.title = 'Connect — Kumar Priyam';
  }, []);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '79001377-2d40-48d5-af4c-4a629bedb258',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: 'New message from portfolio contact form',
          from_name: 'Portfolio Contact',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const inputClass =
    'w-full border-b border-rule bg-transparent py-3 font-serif text-lg text-ink outline-none transition-colors placeholder:text-faint focus:border-accent disabled:opacity-50';

  return (
    <div>
      {/* Masthead */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-editorial px-5 py-16 sm:px-8 sm:py-20">
          <span className="reveal eyebrow">Section 04 — Connect</span>
          <h1 className="reveal delay-1 mt-6 font-display text-5xl font-light tracking-[-0.02em] text-ink sm:text-7xl">
            Let&rsquo;s talk
          </h1>
          <p className="reveal delay-2 mt-5 max-w-xl text-[1.05rem] leading-relaxed text-muted">
            I&rsquo;m actively looking for{' '}
            <span className="text-ink">AI Engineer, SDE, and Data Engineer roles</span>.
            For multi-agent systems, full-stack platforms, ETL pipelines, or
            algorithmic work — reach out.
          </p>
        </div>
      </section>

      {/* Two columns */}
      <section className="mx-auto max-w-editorial px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          {/* Contact details */}
          <div className="md:col-span-5">
            <p className="eyebrow text-faint">Direct</p>
            <dl className="mt-6 divide-y divide-rule border-y border-rule">
              {contactRows.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-4 py-5">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                    {row.label}
                  </dt>
                  <dd className="text-right">
                    {row.href ? (
                      <a href={row.href} className="font-serif text-[17px] text-ink transition-colors hover:text-accent">
                        {row.value}
                      </a>
                    ) : (
                      <span className="font-serif text-[17px] text-ink">{row.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-10 eyebrow text-faint">Elsewhere</p>
            <div className="mt-5 flex gap-6">
              {socialRows.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink link-underline">
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7 md:border-l md:border-rule md:pl-10">
            <form onSubmit={handleFormSubmit} className="space-y-8" noValidate>
              <div>
                <label htmlFor="contact-name" className="eyebrow text-faint">Name</label>
                <input
                  type="text"
                  name="name"
                  id="contact-name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  disabled={formStatus === 'submitting'}
                  className={`mt-2 ${inputClass}`}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="eyebrow text-faint">Email</label>
                <input
                  type="email"
                  name="email"
                  id="contact-email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  disabled={formStatus === 'submitting'}
                  className={`mt-2 ${inputClass}`}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="eyebrow text-faint">Message</label>
                <textarea
                  name="message"
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Hi Kumar, I'd like to discuss an AI Engineer / SDE / Data Engineer role…"
                  disabled={formStatus === 'submitting'}
                  className={`mt-2 resize-y ${inputClass}`}
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'submitting' || formStatus === 'success'}
                className="inline-flex items-center gap-2 bg-ink px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-accent disabled:opacity-50"
              >
                {formStatus === 'idle' && 'Send message →'}
                {formStatus === 'submitting' && 'Sending…'}
                {formStatus === 'success' && 'Sent ✓'}
                {formStatus === 'error' && 'Failed — retry'}
              </button>

              {formStatus === 'success' && (
                <p className="border-l-2 border-accent pl-4 text-sm text-muted">
                  Message sent — I&rsquo;ll get back to you soon.{' '}
                  <button type="button" onClick={() => setFormStatus('idle')} className="text-ink link-underline">
                    Send another
                  </button>
                </p>
              )}
              {formStatus === 'error' && (
                <p className="border-l-2 border-accent pl-4 text-sm text-muted">
                  Transmission failed.{' '}
                  <button type="button" onClick={() => setFormStatus('idle')} className="text-ink link-underline">
                    Try again
                  </button>
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Résumé quick links */}
      <section className="border-t border-rule bg-surface">
        <div className="mx-auto max-w-editorial px-5 py-12 sm:px-8 sm:py-16">
          <p className="eyebrow text-faint">Résumé</p>
          <div className="mt-6 grid border border-rule sm:grid-cols-2">
            <a href={RESUMES.aiSde} target="_blank" rel="noopener noreferrer" className="group flex items-baseline justify-between border-b border-rule p-7 transition-colors hover:bg-paper sm:border-b-0 sm:border-r">
              <span className="font-display text-xl font-light text-ink transition-colors group-hover:text-accent">
                AI&nbsp;+&nbsp;SDE
              </span>
              <span className="font-mono text-xs text-faint transition-transform group-hover:translate-x-1" aria-hidden="true">↗</span>
            </a>
            <a href={RESUMES.data} target="_blank" rel="noopener noreferrer" className="group flex items-baseline justify-between p-7 transition-colors hover:bg-paper">
              <span className="font-display text-xl font-light text-ink transition-colors group-hover:text-accent">
                Data Engineering
              </span>
              <span className="font-mono text-xs text-faint transition-transform group-hover:translate-x-1" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
