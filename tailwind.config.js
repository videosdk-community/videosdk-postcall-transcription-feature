/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        drawLine: {
          '0%': { transform: 'scaleX(0) rotate(45deg)' },
          '100%': { transform: 'scaleX(1) rotate(45deg)' },
        },
      },
      animation: {
        'draw-line': 'drawLine 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
