/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f3f8',
          100: '#d9e0ed',
          200: '#b3c1db',
          300: '#8da2c9',
          400: '#6783b7',
          500: '#4164a5',
          600: '#2d4a7a',
          700: '#1B2A4A',
          800: '#152238',
          900: '#0f1926',
        },
        gold: {
          50: '#fdf8ec',
          100: '#f9ecc8',
          200: '#f0d68f',
          300: '#e7c057',
          400: '#D4A843',
          500: '#c49530',
          600: '#a47823',
          700: '#845c1b',
          800: '#644013',
          900: '#44240b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
