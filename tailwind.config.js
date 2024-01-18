module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        key: "url('../features/merkle-drop/images/key.svg')",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        "heading-hero": "3.5rem",
      },
      letterSpacing: {
        tightest: "-0.01em",
        "max-tightest": "-0.0324em",
      },
      colors: {
        "shutter-black": {
          lightest: "#585E60",
          lighter: "#35393A",
          DEFAULT: "#051016",
          darker: "#051016",
        },
        "grey": {
          lighter: "#DFE6EA",
          DEFAULT: "#C1C9CF",
          darker: "#ACB2B5",
        },
        "white": {
          DEFAULT: "#FFFFFF",
          darker: "#DFE6EA",
        },
        "off-white": {
          DEFAULT: "#FAFAFA",
        },
        "shutter-red": {
          lightest: "#e37878",
          lighter: "#e86868",
          DEFAULT: "#ED6464",
        },
        "shutter-blue": {
          lightest: "#C1DDF4",
          lighter: "#C1DDF4",
          DEFAULT: "#6699CC",
          darker: "#2173AA",
        },
        "shutter-dark-blue": {
          lightest: "#C1DDF4",
          lighter: "#C1DDF4",
          DEFAULT: "#6699CC",
          darker: "#2173AA",
        },
        "shutter-green": {
          lighter: "#E9F4C3",
          light: "#E9F4C3",
          DEFAULT: "#D4ED7A",
          dark: "#82B725",
        },
        "shutter-dark-green": {
          lighter: "#D4ED7A",
          DEFAULT: "#82B725",
          darker: "#2D5916",
        },
        "card-colors": {
          majorelle: "rgba(102, 153, 204, 0.95)",
          green: "rgba(212, 237, 122, 0.95)",
          blue: "rgba(33, 115, 170, 0.65)",
          darkest_grey: "#35393A",
          input_grey:"#585E60",
        },
      },
      boxShadow: {
        "card-blue": "0px 0px 25px rgba(102, 153, 204, 0.1)",
        "card-gray": "0px 0px 25px rgba(5, 16, 22, 0.08)",
        "card-gray-light": "0px 0px 25px #35393A",
        "card-shutter-red": " 0px 0px 12.1988px rgba(237, 100, 100, 0.22)",
        "card-shutter-dark-green": "0px 0px 12.1988px rgba(130, 183, 37, 0.17)",
      },
      zIndex: {
        "-1": "-1",
        "-10": "-10",
      },
      stroke: {
        current: "currentColor",
      },
      strokeWidth: {
        "4/3": "1.33",
      },
      scale: {
        "-100": "-1",
      },
    },
    container: {
      padding: "4rem",
    },
  },
  variants: {
    extend: {
      ringColor: "hover",
    },
  },
  plugins: [],
};
