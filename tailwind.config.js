/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: '#c8a96e', light: '#eddcb2', dark: '#a8863e', pale: '#f5ecd6' },
        ink:  { DEFAULT: '#0a0a0a', soft: '#1a1a1a', light: '#2a2a2a' },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:  ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
