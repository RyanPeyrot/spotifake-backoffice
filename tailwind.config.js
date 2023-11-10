const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  plugins: [],
  theme: {
    ...defaultTheme,
    extend: {
      'spotify-bg': '226 232 240',
      'spotify-text': 'text-slate-200',
    },
  },
};
