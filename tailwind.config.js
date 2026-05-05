/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          50: '#faf9f7',
          100: '#f5f3f0',
          200: '#e8e3dd',
          300: '#dcd3ca',
          400: '#c9b8ac',
          500: '#b69d8e',
          600: '#a08275',
          700: '#8a6b5c',
          800: '#6b5447',
          900: '#4d3d32',
        },
        accent: {
          gold: '#d4af37',
          rose: '#c41e3a',
          charcoal: '#2c2c2c',
        },
      },
      fontFamily: {
        luxury: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'lg': '12px',
        'xl': '16px',
      },
    },
  },
  plugins: [],
}
