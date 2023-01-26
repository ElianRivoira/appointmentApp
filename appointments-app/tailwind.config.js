/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cruce': '#A442F1',
        'cruceSecondary': 'rgba(164, 66, 241, 0.1)'
      },
      fontSize: {
        ss: ['14px', '16px'],
        lb: ['16px', '20px'],
      }
    },
  },
  plugins: [],
}
