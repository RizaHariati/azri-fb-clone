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
      fontFamily: {
        bodyFont: ["Public Sans", "sans-serif"],
        headerFont: ["Montserrat", "sans-serif"],
      },
      colors: {
        accentMain: "#347294",
        accentDark: "#2C6381",
        primaryDark: "#0E0E0E",
        primaryMediumDark: "#161A1D",
        mainBackground: "#22272A",
        primaryMedium: "#303437",
        secondaryMedium: "#394246",
        primaryMediumLight: "#555B5E",
        textPrimary: "#D3DDDF",
        textLight: "#fafafa",
        textMedium: "#D3DDDF",
        textDark: "#A3A7AA",
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
