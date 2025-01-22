module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        humba_500: '#ff5264',
        jing_500: '#00b762',
        pravda_400: '#00a5e3',
        pravda_500: '#00baff',
        pravda_600: '#60c8ff',
        pravda_700: '#90d6ff',
        uso_400: '#c88c00',
        uso_500: '#e19e00',
        uso_600: '#f5ac00',
        uso_700: '#ffc052',
      },
      animation: {
        shake: 'shake 0.5s ease',
      },
      keyframes: {
        shake: {
          '0%': { transform: 'rotate(0) scale(1)' },
          '25%': { transform: 'rotate(10deg) scale(1.05)' },
          '50%': { transform: 'rotate(-10deg) scale(1.1)' },
          '75%': { transform: 'rotate(10deg) scale(1.05)' },
          '100%': { transform: 'rotate(0) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
