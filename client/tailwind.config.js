const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/**/*.ts',
    './src/**/*.tsx',
    './src/**/*.js',
    './src/**/*.jsx',
    './public/index.html',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      // Adds a new breakpoint in addition to the default breakpoints
      screens: {
        xs: '480px',
      },
      colors: {
        gray: colors.neutral,
        brand: {
          lighter: '#e3f2f2',
          light: '#8ccdca',
          DEFAULT: '#49A9A3',
          dark: '#213D48',
          darker: '#152A2D',
        },
        lemon: {
          lighter: '#fef8db',
          light: '#fceba4',
          DEFAULT: '#fade65',
          dark: '#dca81a',
          darker: '#a36900',
        },
        rose: {
          lighter: '#ecbbcd',
          light: '#e190ac',
          DEFAULT: '#cd4e76',
          dark: '#b6375d',
          darker: '#8b2f51',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

// #213D48 - Dark Teal
// #152A2D - Darkest Teal
// #49A9A3 - Brand Teal
// #3C5761 - Dark Teal - Hover
