import { createContext } from "react";

export const themes = {
  light: {
    type: "light",
    fontColor: "#2b2c38",
    background: "#f4f7f9",
    navbarBrand: "#2b2c38",
  },
  dark: {
    type: "dark",
    fontColor: "#dcdcdc",
    background: "#2b2c38",
    navbarBrand: "#83ec79",
  },
};

export const ThemeContext = createContext({});
