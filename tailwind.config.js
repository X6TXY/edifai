module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#C7002B",
          "secondary": "#D9D9D9",
          "accent": "#F5F5F5",
          "neutral": "#ADA7A7",
          "base-100": "#1d232a",
          "info": "#AFADAD",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
  },
  theme: {
    extend: {
      screens: {
        'sl': '769px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      }
    }
  },
  plugins: [require('daisyui')],
};
