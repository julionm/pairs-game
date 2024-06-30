/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': 'Inter'
      },
      colors: {
        'correct': '#38bdf8',
        'wrong': '#f97316'
      }
    },
  },
  plugins: [],
}

