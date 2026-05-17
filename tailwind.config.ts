import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#C0392B', light: '#E74C3C' },
        accent: { DEFAULT: '#D4AC0D', light: '#F4D03F' },
        secondary: '#1A3A4A',
        dark: '#0D1B2A',
        cream: '#FDF6EC',
        surface: '#FEF9F0',
        'text-dark': '#1C1009',
        'text-muted': '#6B4C3B',
        success: '#27AE60',
      },
      fontFamily: {
        display: ['"Yatra One"', 'cursive'],
        heading: ['"Noto Serif"', 'serif'],
        body: ['"Hind Madurai"', 'sans-serif'],
        accent: ['"Cinzel Decorative"', 'serif'],
        tamil: ['"Noto Sans Tamil"', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'petal-fall': 'petal-fall 6s linear infinite',
        'scroll-left': 'scroll-left 30s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212,172,13,0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(212,172,13,0.9)' },
        },
        'petal-fall': {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #D4AC0D, #F4D03F, #D4AC0D)',
        'gradient-red-gold': 'linear-gradient(135deg, #C0392B, #D4AC0D)',
        'gradient-dark': 'linear-gradient(180deg, #0D1B2A, #1A3A4A)',
      },
    },
  },
  plugins: [],
} satisfies Config
