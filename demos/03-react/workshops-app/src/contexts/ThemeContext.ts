import { createContext, useContext } from "react";

type Theme = "light" | "dark";

/**
 * default context value
 *
 * {
    theme: 'light', // 'dark'
    toggleTheme: () => {}
   }
 */
const ThemeContext = createContext({
    theme: "light" as Theme, // 'dark'
    toggleTheme: () => {},
});

const useTheme = () => useContext(ThemeContext);

export { ThemeContext, useTheme };

export type { Theme };
