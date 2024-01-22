/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows:{
        'layout': 'minmax(60px, auto) 1fr 100px'
      }
    },
  },
  plugins: [],
}