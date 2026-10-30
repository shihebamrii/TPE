/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tpe: {
          canvas: '#FFFFFF',
          studio: '#FAFAFB',
          surface: '#F3F4F6',
          charcoal: '#0A0A0A',
          dark: '#111827',
          cyan: '#00A0E3',      // CMYK Cyan from logo
          magenta: '#E6007E',   // CMYK Magenta from logo
          yellow: '#FFB800',    // CMYK Yellow from logo
          red: '#D8232A',       // Slogan Red from logo
          border: '#E5E7EB',
          subtle: '#9CA3AF',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['Caveat', 'cursive'],
        mono: ['"DM Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.15em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
      }
    },
  },
  plugins: [],
}
