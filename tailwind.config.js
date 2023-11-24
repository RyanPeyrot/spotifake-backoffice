const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [require('@tailwindcss/forms'), require('flowbite/plugin')],
  theme: {
    ...defaultTheme,
    extend: {
      colors: {
        spotiwhite: 'var(--spotiwhite)',
        spotiblack: 'var(--spotiblack)',
        spotigreen: 'var(--spotigreen)',
      },
    },
  },
};
