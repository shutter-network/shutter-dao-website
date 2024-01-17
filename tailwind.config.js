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
        "rich-black": {
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
          DEFAULT: "#F9F9F9",
        },
        "coral-red": {
          lightest: "#EFAE95",
          lighter: "#FFD2BF",
          DEFAULT: "#FF7C4E",
        },
        "coral-pastel": {
          DEFAULT: "rgba(255, 210, 191, 1)",
        },
        "app-blue": {
          lightest: "#E6EFFC",
          lighter: "#1a87ff",
          DEFAULT: "#6699CC",
          darker: "#0055b3",
        },
        "protocol-blue": {
          DEFAULT: "#1e8cc3",
        },
        "majorelle-blue": {
          lightest: "#FFF0FF",
          lighter: "#BEB6EC",
          light: "#897AE7",
          DEFAULT: "#7657ED",
          pastel: "#E5E0FF",
        },
        "neon-pink": {
          DEFAULT: "#FFA0B7",
        },
        "pink-pastel": {
          DEFAULT: "#FFDFE7",
        },
        "aquamarine-green": {
          lighter: "#89E4C5",
          light: "#E1FFF3",
          DEFAULT: "#D4ED7A",
          dark: "#07956D",
        },
        "dark-green": {
          lighter: "rgba(14, 195, 144, 0.25)",
          DEFAULT: "#82B725",
          darker: "#0FA87F",
          pastel: "#D0FBE9",
        },
        "cyber-yellow": {
          DEFAULT: "#FFD41E",
          darker: "#DCAE0B",
          lighter: "rgba(255, 244, 209, 0.75)",
        },
        "card-colors": {
          majorelle: "rgba(118, 87, 237, 0.95)",
          green: "rgba(9, 224, 163, 0.95)",
          blue: "rgba(0, 122, 255, 0.65)",
          darkest_grey: "#151515",
          input_grey:"#363636",
        },
      },
      boxShadow: {
        "card-blue": "0px 0px 25px rgba(0, 122, 255, 0.1)",
        "card-gray": "0px 0px 25px rgba(0, 0, 0, 0.08)",
        "card-gray-light": "0px 0px 25px #111111",
        "card-neon-pink": "0px 0px 25px 0px rgba(255, 160, 183, 0.25)",
        "card-coral-red": " 0px 0px 12.1988px rgba(255, 124, 78, 0.22)",
        "card-dark-green": "0px 0px 12.1988px rgba(14, 195, 144, 0.17)",
        "glow-app-blue": "0px 15px 37px rgba(0, 122, 255, 0.25)",
        "glow-coral-red": "0px 15px 37px rgba(255, 124, 78, 0.25)",
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
