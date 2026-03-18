/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f8',
          100: '#d6e1ed',
          200: '#adc3db',
          300: '#84a5c9',
          400: '#5b87b7',
          500: '#3269a5',
          600: '#274f82',
          700: '#1E3A5F',
          800: '#172D4A',
          900: '#101F35',
        },
        gold: {
          50: '#fdf0ec',
          100: '#f9d5c8',
          200: '#f0aa8f',
          300: '#e07f57',
          400: '#C45D3E',
          500: '#a84a30',
          600: '#8c3c27',
          700: '#6f2e1e',
          800: '#522115',
          900: '#36140c',
        },
        'warm-gray': '#F5F3F0',
        brand: {
          navy: '#1E3A5F',
          accent: '#C45D3E',
          surface: '#F5F3F0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
      },
      spacing: {
        section: {
          sm: '2.5rem',
          md: '3.5rem',
          lg: '5rem',
          xl: '8rem',
        },
      },
    },
  },
  plugins: [],
};
