module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    transitionDuration: {
      DEFAULT: "300ms",
    },
    extend: {
      colors: {
        accentMain: "#D8A",
        accentDark: "#B48",
        primaryDark: "#171717",
        primaryMediumDark: "#262626",
        primaryMedium: "#404040",
        primaryMediumLight: "#525252",
        textPrimary: "#e5e5e5",
        textLight: "#fafafa",
        textMedium: "#d4d4d4",
        textDark: "#a3a3a3",
      },
    },
    screens: {
      sm: "540px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "900px",
      // => @media (min-width: 1024px) { ... }

      xl: "1104px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1150px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
