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
        'cruceBackground': '#F0F0F0',
        'grey3': '#E1E1E1',
        'grey4': '#C8C8C8',
        'grey5': '#AFAFAF',
        'grey6': '#8C8C8C',
        'grey7': '#6E6E6E',
        'exito': '#00A541',
        'error': '#E53939',
      },
      fontSize: {
        ss: ['14px', '16px'],
        lb: ['16px', '20px'],
        ln: ['18px', '24px'],
        xb: ['20px', '24px'],
      },
      boxShadow: {
        'xg': '0 0 24px rgba(0, 0, 0, 0.12)',
        'navbar': '0 0 12px rgba(0, 0, 0, 0.08)',
      },
      height: {
        '26': '108px',
      },
      margin: {
        '8.5': '34px',
      },
    },
  },
  plugins: [],
}
