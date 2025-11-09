/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00ff9d',
        secondary: '#6366f1',
        danger: '#ef4444',
        dark: '#0a0e1a',
        'dark-2': '#1a1f3a',
        'text-main': '#e2e8f0',
        'text-dim': '#94a3b8',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
