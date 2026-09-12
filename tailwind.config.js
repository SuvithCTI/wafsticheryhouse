/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF8F1',
          100: '#F5EEDC',
          200: '#EBDCB9',
          300: '#E0C792',
          400: '#D4AF37', // Classic metallic gold
          500: '#C59B27',
          600: '#A67C1E',
          700: '#7E5B14',
          800: '#5A3F0E',
          900: '#3D2A08',
        },
        burgundy: {
          50: '#FAF0F2',
          100: '#F4DDE2',
          200: '#E6BAC4',
          300: '#D58DA0',
          400: '#B85874',
          500: '#8E294A',
          600: '#721C38',
          700: '#5A132B',
          800: '#430B1E',
          900: '#2E0513',
        },
        ivory: {
          50: '#FCFBF9',
          100: '#F9F7F3',
          200: '#F2EFEB',
          300: '#E7E2DA',
          400: '#D5CEC2',
        },
        charcoal: {
          800: '#1B1A1E',
          900: '#121115',
          950: '#0B0A0D'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Montserrat"', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.3)',
        'gold-intense': '0 0 40px -5px rgba(212, 175, 55, 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
