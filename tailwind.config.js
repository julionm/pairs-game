/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    fontFamily: {
      sans: 'Inter'
    },
    extend: {
      fontFamily: {
        'inter': 'Inter',
        'japanese': 'Noto Sans Japanese'
      },
      colors: {
        'correct': '#38bdf8',
        'wrong': '#f97316'
      }
    },
  },
  plugins: [],
}

