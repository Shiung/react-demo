/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('./tailwind-base-preset.js')],
  content: ['./src/**/*.{js,jsx,ts,tsx,svelte}', './public/**/*.html'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        shake: {
          '10%, 90%': {
            transform: 'translate3d(-5px, 0, 0)'
          },
          '20%, 80%': {
            transform: 'translate3d(5px, 0, 0)'
          },
          '30%, 50%, 70%': {
            transform: 'translate3d(-5px, 0, 0)'
          },
          '40%, 60%': {
            transform: 'translate3d(5px, 0, 0)'
          }
        }
      },
      animation: {
        shake: 'shake 0.7s cubic-bezier(.36,.07,.19,.97) both',
      },
    }
  },
  plugins: [],
}
