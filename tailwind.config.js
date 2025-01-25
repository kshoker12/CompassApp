const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./navigation/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      violet: colors.violet,
      red: colors.red,
      slate: colors.slate,
      purple: colors.purple,
      cyan: colors.cyan,
      green: colors.green,
      gold: {
        50: '#ffdc73',
        100: '#ffcf40',
        200: '#ffbf00'
      },
      blood: {
        50: '#FAA0A0',
        300: '#D22B2B',
        400: '#880808',
        500: '#811331'
      },
      primary: {
        purple: '#2c2e45',
        lightPurple: '#a855f7',
        darkPurple: '#1a1b2a',
      },
      alt: {
        purple: '#6c71a6'
      },
      success: {
        green: '#4f6962'
      },
    }
  },
  plugins: [],
};

