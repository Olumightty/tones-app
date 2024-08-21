/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  prefix: "",
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
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },      
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
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
  plugins: [require("tailwindcss-animate")],
}

