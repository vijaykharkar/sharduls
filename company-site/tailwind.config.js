/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Navy Colors
        'navy': {
          primary: '#1a3a5c',
          dark: '#102a43',
          light: '#243b53',
        },
        // Blue Colors (Sky Group Theme)
        'blue': {
          primary: '#0052a3',
          dark: '#003d82',
        },
        // Orange/Gold Accent Colors
        'orange': {
          primary: '#d4a853',
          dark: '#ff8c00',
        },
        'gold': {
          primary: '#d4a853',
          hover: '#c49843',
          light: '#e5b960',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-left': 'fadeInLeft 0.8s ease-out forwards',
        'fade-right': 'fadeInRight 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
