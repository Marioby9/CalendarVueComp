/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'darkBlack': '#1E1E1E',
      'black': '#2d2d2d',
      'overlayBlack': 'rgba(0, 0, 0, 0.9)',
      'gray': '#454545',
      'white': '#FFFFFF',
      'bone': '#e0e0e0',
      'darkGreen': '#345e37',
      'green': '#2E8B57',
      'lowGreen': '#61bc84',
      'lowerGreen': '#8FBC8F',
      'lightGreen': '#c6ffe6',
      'overlayGreen': '#345e3748',
      'blue':'#4e88ca'
    }
  },
  plugins: []
}
