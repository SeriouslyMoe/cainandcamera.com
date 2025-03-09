/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.html'], // Add paths to your HTML files
  theme: {
    extend: {
      fontFamily: {
        serif: ['Crimson Text', 'serif'], // Add Crimson Text to the serif font stack
        sans: ['IBM Plex Sans', 'sans'],
      },
    },
  },
  plugins: [],
};