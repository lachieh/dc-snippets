const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.js', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: colors.trueGray,
        brand: {
          lighter: '#e3f2f2',
          light: '#8ccdca',
          DEFAULT: '#49A9A3',
          dark: '#213D48',
          darker: '#152A2D',
        },
        lemon: {
          light: '#fceba4',
          DEFAULT: '#fade65',
          dark: '#f5be00',
        },
        rose: {
          light: '#e190ac',
          DEFAULT: '#cd4e76',
          dark: '#b6375d',
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
