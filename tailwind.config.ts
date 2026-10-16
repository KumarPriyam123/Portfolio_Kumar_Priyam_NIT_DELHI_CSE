import type { Config } from 'tailwindcss';

// Colours and faces come from the scroll-craft tokens in globals.css, so the
// whole page re-themes from six values. Tailwind is used for layout only.
const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--sc-font-display)'],
        sans: ['var(--sc-font-text)'],
        mono: ['var(--sc-font-mono)'],
      },
      colors: {
        canvas: 'var(--sc-canvas)',
        surface: 'var(--sc-surface)',
        ink: 'var(--sc-ink)',
        soft: 'var(--sc-ink-soft)',
        accent: 'var(--sc-accent)',
        'accent-ink': 'var(--sc-accent-ink)',
        line: 'var(--sc-hairline)',
      },
      maxWidth: { page: 'var(--sc-maxw)' },
    },
  },
  plugins: [],
};
export default config;
