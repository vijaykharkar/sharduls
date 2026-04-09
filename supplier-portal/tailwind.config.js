/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:    { DEFAULT: '#A8B2C0', dark: '#8A95A5', light: '#C4CDD9' },
        background: '#080B10',
        surface:    '#161C26',
        accent:     { DEFAULT: '#E53E3E', dark: '#C53030', light: '#FC8181' },
        highlight:  '#EDF2F7',
        sidebar:    '#0A0D14',
        cardBg:     '#161C26',
        border:     '#2A3040',
        muted:      '#4A5568',
        success:    { DEFAULT: '#22C55E', dark: '#16a34a' },
        warning:    { DEFAULT: '#F59E0B', dark: '#d97706' },
        error:      { DEFAULT: '#E53E3E', dark: '#C53030' },
        info:       { DEFAULT: '#3B82F6', dark: '#2563eb' },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(0,0,0,0.3), 0 10px 20px -2px rgba(0,0,0,0.2)',
        strong: '0 25px 60px rgba(0,0,0,0.6)',
        chrome: '0 0 20px rgba(168,178,192,0.15)',
        glow: '0 0 30px rgba(168,178,192,0.1)',
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        slideUp: 'slideUp 0.3s ease-out',
        slideDown: 'slideDown 0.3s ease-out',
        slideRight: 'slideRight 0.3s ease-out',
        slideLeft: 'slideLeft 0.3s ease-out',
        scaleIn: 'scaleIn 0.3s ease-out',
        shimmer: 'shimmer 2s linear infinite',
        gearSpin: 'spin 12s linear infinite',
        gearSpinReverse: 'spinReverse 12s linear infinite',
        pulseChrome: 'pulseChrome 2s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-16px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(16px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        spinReverse: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        pulseChrome: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(168,178,192,0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(168,178,192,0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
