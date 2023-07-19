module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#7C3BCF",
        
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
  plugins: [require('daisyui')],
};
