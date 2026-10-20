/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: { colors: {
    brand: { primary: '#115E59', accent: '#0F766E' },
    surface: { page: '#F6F8F9', card: '#FFFFFF' },
    ink: { primary: '#172333', muted: '#526579' },
    type: { feature: '#1D4ED8', bug: '#9F1239' },
    due: { safe: '#F0F7F4', warning: '#FFF4D6', overdue: '#FFF0F0', neutral: '#FFFFFF' },
  } } },
  plugins: [],
};
