module.exports = {
  purge: {
    enabled: process?.argv?.indexOf("build") !== -1,
    content: ["./src/**/*.html", "./src/**/*.ts"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: "600px",
      md: "960px",
      lg: "1280px",
      xl: "1920px",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
