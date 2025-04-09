import { createContext } from "react";

export type Theme = "light" | "dark";

// 2 components are automatically generated
// ThemeContext.Provider
// ThemeContext.Consumer (used in class components)
const ThemeContext = createContext({
    theme: "light",
    switchTheme() {
        console.log("switching theme");
    },
});

const ThemeProvider = ThemeContext.Provider;

export { ThemeContext, ThemeProvider };
