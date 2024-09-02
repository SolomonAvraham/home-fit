import type { Config } from "tailwindcss";

const config: Config = {
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        BebasNeue: ["Bebas Neue", "sans-serif"],
        Acme: ["Acme", "sans-serif"],
        ProtestGuerrilla: ["Protest Guerrilla", "sans-serif"],
        Dosis: ["Dosis", "sans-serif"],
      },
      backgroundImage: {
        bgOne: "url('/bg/bg-3.jpg')",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
