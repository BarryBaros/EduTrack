import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        primary: "#FFC0CB",
        secondary: "#87CEEB",
        tertiary: "#B0C4DE",
        quaternary: "#8B4513",
        quinary: "#008B8B",
        septenary: "#00008B",
        octonary: "#800080",
        nonary: "#000000",
        quarternaryText: "#000000",
        quinaryText: "#FFFFFF",
        septenaryText: "#FFFFFF",
        octonaryText: "#FFFFFF",
        nonaryText: "#FFFFFF",
        lamaSky:"#C3EBFA",
        lamaSkyLight:"#EDF9FD",
        lamaPurple:"#CFCEFF",
        lamaPurpleLight:"#E9EAF9",
        lamaRed:"#F8D7DA",
        lamaRedLight:"#FDE2E9",
        lamaGreen:"#D3F2F6",
        lamaGreenLight:"#E5F7F9",

      }
    },
  },
  plugins: [],
};
export default config;
