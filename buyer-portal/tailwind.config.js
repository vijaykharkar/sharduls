/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold:       { DEFAULT: '#C9A84C', light: '#E0CB7E', dark: '#A68A30', 50: '#FBF6E8' },
        terracotta: { DEFAULT: '#C4622D', light: '#E08A5A', dark: '#9C4D22' },
        cream:      { DEFAULT: '#FAF3E0', dark: '#F0E4C8' },
        charcoal:   { DEFAULT: '#1A1A1A', light: '#2D2D2D', lighter: '#444444' },
        rose:       { DEFAULT: '#E8A598', light: '#F2C4BA', dark: '#D4887A' },
        sidebar:    '#111111',
        cardBg:     '#FFFFFF',
        border:     '#E5E0D5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft:   '0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)',
        strong: '0 10px 40px -10px rgba(0,0,0,0.15)',
        gold:   '0 4px 25px -4px rgba(201,168,76,0.35)',
        card:   '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
      },
      animation: {
        fadeIn:     'fadeIn 0.4s ease-out',
        slideUp:    'slideUp 0.4s ease-out',
        slideDown:  'slideDown 0.3s ease-out',
        slideLeft:  'slideLeft 0.3s ease-out',
        slideRight: 'slideRight 0.3s ease-out',
        scaleIn:    'scaleIn 0.3s ease-out',
        spinSlow:   'spin 12s linear infinite',
        shimmer:    'shimmer 2s infinite',
        bounce1:    'bounce1 0.4s ease-out',
      },
      keyframes: {
        fadeIn:     { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:    { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideDown:  { '0%': { opacity: '0', transform: 'translateY(-10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideLeft:  { '0%': { opacity: '0', transform: 'translateX(20px)' },  '100%': { opacity: '1', transform: 'translateX(0)' } },
        slideRight: { '0%': { opacity: '0', transform: 'translateX(-20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        scaleIn:    { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        shimmer:    { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        bounce1:    { '0%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.25)' }, '100%': { transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
};
