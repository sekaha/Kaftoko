module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'text-glow': '0 0 6px currentColor',
      },
      colors: {
        humba_500: '#ff5264',
        jing_500: '#00b762',
        pravda_600: '#00a5e3',
        pravda_500: '#00baff',
        pravda_400: '#60c8ff',
        pravda_300: '#90d6ff',
        pravda_200: '#c4e9ff',
        uso_600: '#c88c00',
        uso_500: '#e19e00',
        uso_400: '#f5ac00',
        uso_300: '#ffc052',
      },
      animation: {
        shake: 'shake 0.5s ease',
        'flip-horizontal-bottom':
          'flip-horizontal-bottom 2.0s cubic-bezier(0.455, 0.030, 0.515, 0.955) both',
      },
      keyframes: {
        shake: {
          '0%': { transform: 'rotate(0) scale(1)' },
          '25%': { transform: 'rotate(10deg) scale(1.05)' },
          '50%': { transform: 'rotate(-10deg) scale(1.1)' },
          '75%': { transform: 'rotate(10deg) scale(1.05)' },
          '100%': { transform: 'rotate(0) scale(1)' },
        },
        'flip-horizontal-bottom': {
          '0%': {
            transform: 'rotateX(90deg)',
          },
          '100%': {
            transform: 'rotateX(0)',
          },
        },
      },
    },
  },
  plugins: [],
}
