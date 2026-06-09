/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: 'var(--color-surface)',
        background: 'var(--color-background)',
        'surface-low': 'var(--color-surface-container-low)',
        'surface-container': 'var(--color-surface-container)',
        'surface-container-low': 'var(--color-surface-container-low)',
        'surface-container-lowest': 'var(--color-surface-container-lowest)',
        'surface-container-high': 'var(--color-surface-container-high)',
        'on-surface': 'var(--color-on-surface)',
        'on-surface-variant': 'var(--color-on-surface-variant)',
        primary: 'var(--color-primary)',
        'primary-fixed': 'var(--color-primary-fixed)',
        'on-primary': 'var(--color-on-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        outline: 'var(--color-outline)',
        'outline-variant': 'var(--color-outline-variant)',
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        'headline-lg': ['Sora', 'sans-serif'],
        'headline-md': ['Sora', 'sans-serif'],
        'body-lg': ['Inter', 'sans-serif'],
        'body-md': ['Inter', 'sans-serif'],
        'code-sm': ['JetBrains Mono', 'monospace'],
        'label-caps': ['JetBrains Mono', 'monospace'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        display: ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'headline-lg': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'headline-md': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'code-sm': ['14px', { lineHeight: '1.5', fontWeight: '500' }],
        'label-caps': ['12px', { lineHeight: '1', letterSpacing: '0.1em', fontWeight: '700' }],
      },
      maxWidth: {
        'container-max': '1200px',
      },
      spacing: {
        gutter: '2rem',
        'section-padding': '5rem',
        'card-gap': '1.5rem',
      },
      borderRadius: {
        card: '0.75rem',
        control: '9999px',
      },
    },
  },
  plugins: [],
};
