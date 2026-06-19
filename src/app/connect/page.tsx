'use client';

import React, { useEffect, useState } from 'react';

export default function ConnectPage() {
  useEffect(() => {
    document.title = 'Connect | Kumar Priyam';
  }, []);

  /* ── Form State ── */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');

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
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setFormStatus('error');
    }
  };

  const resetForm = () => {
    setFormStatus('idle');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear_gradient(to_bottom,#ffffff05_1px,transparent_1px)]"
        aria-hidden="true"
      />

      {/* Radial blur accents */}
      <div
        className="fixed top-1/3 right-1/4 -z-10 h-[250px] w-[250px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-1/3 left-1/4 -z-10 h-[200px] w-[200px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* ═══════════════════════════════════════════════
            PAGE HEADER
        ═══════════════════════════════════════════════ */}
        <div className="mb-12">
          <span className="font-mono text-xs font-semibold text-emerald-500 dark:text-emerald-400 uppercase tracking-widest">
            TRANSMITTER
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
            Let&apos;s Connect
          </h1>
          <div className="mt-4 h-1 w-12 rounded bg-emerald-500 dark:bg-emerald-400" />
        </div>

        {/* ═══════════════════════════════════════════════
            TWO-COLUMN LAYOUT
        ═══════════════════════════════════════════════ */}
        <div className="grid gap-12 md:grid-cols-5">
          {/* ─── Left Column: Contact Info (md:col-span-2) ─── */}
          <div className="md:col-span-2 space-y-6">
            {/* Description */}
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              I am actively looking for{' '}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                Data Engineering Internships
              </span>{' '}
              or full-stack software development roles. If you want to discuss
              ETL pipelines, multi-agent systems, or algorithmic optimizations,
              reach out!
            </p>

            {/* Contact Details */}
            <div className="space-y-4">
              {/* Email */}
              <a
                href="mailto:kpriyam2005p@gmail.com"
                className="group flex items-center gap-3 rounded-lg border border-zinc-200 bg-white p-3 transition-all hover:border-emerald-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-emerald-600/50"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Email
                  </span>
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    kpriyam2005p@gmail.com
                  </span>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+919773593089"
                className="group flex items-center gap-3 rounded-lg border border-zinc-200 bg-white p-3 transition-all hover:border-emerald-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-emerald-600/50"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Phone
                  </span>
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    +91-9773593089
                  </span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900/60">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Location
                  </span>
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    New Delhi, India
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {'// SOCIAL_LINKS'}
              </h3>
              <div className="flex gap-3">
                {/* GitHub Button */}
                <a
                  href="https://github.com/KumarPriyam123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-zinc-600"
                  aria-label="GitHub Profile"
                >
                  <svg
                    className="h-5 w-5 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                    />
                  </svg>
                  GitHub
                </a>

                {/* LinkedIn Button */}
                <a
                  href="https://linkedin.com/in/kumar-priyam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-indigo-600/50"
                  aria-label="LinkedIn Profile"
                >
                  <svg
                    className="h-5 w-5 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* ─── Right Column: Contact Form (md:col-span-3) ─── */}
          <div className="md:col-span-3">
            <form
              onSubmit={handleFormSubmit}
              className="space-y-5 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40"
              noValidate
            >
              {/* Form header */}
              <div className="flex items-center gap-2 border-b border-zinc-100 pb-4 dark:border-zinc-800/60">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
                  contact_form.tsx
                </span>
              </div>

              {/* Name field */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-mono font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="contact-name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  disabled={formStatus === 'submitting'}
                  className="w-full rounded-lg border border-zinc-200 bg-transparent px-4 py-2.5 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 dark:border-zinc-800 dark:text-white dark:placeholder:text-zinc-600"
                />
              </div>

              {/* Email field */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="contact-email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  disabled={formStatus === 'submitting'}
                  className="w-full rounded-lg border border-zinc-200 bg-transparent px-4 py-2.5 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 dark:border-zinc-800 dark:text-white dark:placeholder:text-zinc-600"
                />
              </div>

              {/* Message field */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Hi Kumar, I am interested in discussing a Data Engineering Internship..."
                  disabled={formStatus === 'submitting'}
                  className="w-full rounded-lg border border-zinc-200 bg-transparent px-4 py-2.5 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 dark:border-zinc-800 dark:text-white dark:placeholder:text-zinc-600 resize-y"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={
                  formStatus === 'submitting' || formStatus === 'success'
                }
                className="w-full inline-flex items-center justify-center rounded-lg bg-zinc-950 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 transition-all font-mono"
              >
                {formStatus === 'submitting' && (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-white dark:text-zinc-950"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                )}
                {formStatus === 'idle' && 'send_message()'}
                {formStatus === 'submitting' && 'transmitting...'}
                {formStatus === 'success' &&
                  'message_transmitted_successfully!'}
                {formStatus === 'error' && 'failed_to_transmit.try_again()'}
              </button>

              {/* Success / Error feedback */}
              {formStatus === 'success' && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-800/40 dark:bg-emerald-900/20">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                      Message sent successfully! I&apos;ll get back to you soon.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-2 font-mono text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    send_another()
                  </button>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 dark:border-rose-800/40 dark:bg-rose-900/20">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-rose-600 dark:text-rose-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-rose-700 dark:text-rose-300">
                      Transmission failed. Please try again.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormStatus('idle')}
                    className="mt-2 font-mono text-xs text-rose-600 dark:text-rose-400 hover:underline"
                  >
                    retry()
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════
            RESUME QUICK LINKS
        ═══════════════════════════════════════════════ */}
        <section className="mt-16" aria-label="Resume Downloads">
          <div className="mb-4">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              {'// QUICK_DOWNLOADS'}
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {/* Data Engineering Resume */}
            <a
              href="https://drive.google.com/file/d/1XJmW1XJ5lQ17fY251xmbZpC3lzsZgviR/view"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-emerald-600/50"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Data Engineering Resume
                </span>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
                  resume_de.pdf
                </p>
              </div>
              <svg
                className="ml-auto h-4 w-4 flex-shrink-0 text-zinc-300 dark:text-zinc-600 group-hover:text-emerald-500 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>

            {/* SDE + GenAI Resume */}
            <a
              href="https://drive.google.com/file/d/1sDOkbyz0YaCgN3EzVKoCykDRa7ZAyBo9/view"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-indigo-600/50"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  SDE + GenAI Resume
                </span>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
                  resume_sde_genai.pdf
                </p>
              </div>
              <svg
                className="ml-auto h-4 w-4 flex-shrink-0 text-zinc-300 dark:text-zinc-600 group-hover:text-indigo-500 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
