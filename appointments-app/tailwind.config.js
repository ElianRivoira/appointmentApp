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
        'cruceHover': '#CC6AFF',
        'cruceSecondary': 'rgba(164, 66, 241, 0.1)',
        'cruceSecondaryHover': 'rgba(164, 66, 241, 0.2)',
      },
      fontSize: {
        ss: ['14px', '16px'],
        lb: ['16px', '20px'],
      },
      boxShadow: {
        'xg': '0 0 24px rgba(0, 0, 0, 0.12)',
        'navbar': '0 0 12px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
