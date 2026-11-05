tailwind.config = {
  theme: {
    extend: {
      colors: {
        ink: "#eee9f8",
        panel: "#f7f3fc",
        line: "#d1c5e4",
        mist: "#241b31",
        muted: "#71647f",
        accent: "#4f713c",
        "accent-dim": "#87a977",
      },
      fontFamily: {
        sans: [
          "Avenir Next",
          "Segoe UI",
          "PingFang SC",
          "Hiragino Sans GB",
          "Microsoft YaHei",
          "sans-serif",
        ],
        display: [
          "Arial Narrow",
          "Avenir Next Condensed",
          "Segoe UI",
          "PingFang SC",
          "Microsoft YaHei",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 80px rgba(184, 243, 154, 0.12)",
        card: "0 28px 80px rgba(0, 0, 0, 0.35)",
      },
    },
  },
};
