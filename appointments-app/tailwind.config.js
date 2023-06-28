/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cruce: '#A442F1',
        cruceHover: '#CC6AFF',
        cruceSecondary: 'rgba(164, 66, 241, 0.1)',
        cruceSecondaryHover: 'rgba(164, 66, 241, 0.2)',
        cruceBackground: '#F0F0F0',
        grey1: '#F5F5F5',
        grey2: '#F0F0F0',
        grey3: '#E1E1E1',
        grey4: '#C8C8C8',
        grey5: '#AFAFAF',
        grey6: '#8C8C8C',
        grey7: '#6E6E6E',
        grey8: '#505050',
        exito: '#00A541',
        error: '#E53939',
        errorHover: '#E54949',
        black033: 'rgba(0, 0, 0, 0.3)',
      },
      fontSize: {
        xm: ['13px', '16px'],
        ss: ['14px', '16px'],
        ls: ['15px', '20px'],
        lm: ['15px', '18px'],
        lb: ['16px', '20px'],
        ln: ['18px', '24px'],
        lx: ['19px', '24px'],
        xb: ['20px', '24px'],
        '4.5xl': ['40px', '47px'],
      },
      boxShadow: {
        xg: '0 0 24px rgba(0, 0, 0, 0.12)',
        navbar: '0 0 12px rgba(0, 0, 0, 0.08)',
        timer: '0 3px 12px rgba(0, 0, 0, 0.2)',
        active: 'inset 0px 0px 8px rgba(0, 0, 0, 0.24)',
      },
      height: {
        26: '108px',
      },
      width: {
        30: '125px',
      },
      margin: {
        6.5: '26px',
        8.5: '34px',
        62: '248px',
      },
      screens: {
        'sd': '466px',
        'ml': '830px',
        'xb': '1160px',
        'xc': '1315px',
        'xd': '1390px',
        'smMax': {'max': '640px'},
        'mdMax': {'max': '768px'},
        'lgMax': {'max': '1024px'},
        'xlMax': {'max': '1300px'},
      },
      backgroundImage: {
        'doneIcon': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjYTU0MmYxIiBkPSJNMTczLjg5OCA0MzkuNDA0bC0xNjYuNC0xNjYuNGMtOS45OTctOS45OTctOS45OTctMjYuMjA2IDAtMzYuMjA0bDM2LjIwMy0zNi4yMDRjOS45OTctOS45OTggMjYuMjA3LTkuOTk4IDM2LjIwNCAwTDE5MiAzMTIuNjkgNDMyLjA5NSA3Mi41OTZjOS45OTctOS45OTcgMjYuMjA3LTkuOTk3IDM2LjIwNCAwbDM2LjIwMyAzNi4yMDRjOS45OTcgOS45OTcgOS45OTcgMjYuMjA2IDAgMzYuMjA0bC0yOTQuNCAyOTQuNDAxYy05Ljk5OCA5Ljk5Ny0yNi4yMDcgOS45OTctMzYuMjA0LS4wMDF6Ii8+PC9zdmc+')",
      },
    },
  },
  plugins: [],
};
