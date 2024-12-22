/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      colors: {
        'con': {
          100:'#ccc',
          200:'#fffefe',
          400:'#fffbf5',
          600:'#f4ede2',
          900:'#423232'
        },
        'colo': {
          100:'#b5e2dc', //green
          200:'#f4da92', //yellow
          400:'#f7c0b5'  //red
        }
      },
    },
  },
  plugins: [],
}

