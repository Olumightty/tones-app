/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
    },
    colors: {
      navy: "#2E236C",
      purpleish: "#433D8B",
      white: "#FFF",
      gold: "#FFC94A",
      grey: "#758694",
      dullWhite: "#F1F6F8",
      transparent: 'transparent',
      black: '#000',
    },
    backgroundImage:{
      gradientNavy: "linear-gradient(165deg, rgba(0, 0, 0, 1) 0%, rgba(21, 0, 80, 1) 50%)",
      gradientNavyLighter: "linear-gradient(11deg, rgba(0, 0, 0, 0.7) 0%, rgba(21, 0, 80, 0.9) 17%)",
      gradientPurple: "linear-gradient(334deg, rgba(0, 0, 0, 1) 0%, rgba(21, 0, 80, 1) 22%)",
      gradientMain: "linear-gradient(334deg, rgba(46, 35, 108, 1) 44%, rgba(21, 0, 80, 1) 96%)",
      gradientTransparent: "linear-gradient(0deg, #758694, transparent)"
    },
    // gridTemplateRows: {
    //   full: "repeat(5, 100%)",
    // },
    extend: {
      animation: {
        'disc-spin': 'spin 10s linear infinite' 
      }
    },
    screens: {
      es: "280px",
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}

