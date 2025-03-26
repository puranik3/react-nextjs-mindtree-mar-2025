import { createContext } from "react";

type Theme = 'light' | 'dark';

interface ThemeContext {
    value: Theme,
    textValue: Theme,
    toggleTheme: () => void
}

// you pass the "default" context to createContext()
const ThemeContext = createContext<ThemeContext>({
    value: 'light',
    textValue: 'dark',
    toggleTheme: () => {} // a no-operation function
});

// export default ThemeContext;

export type {
    Theme
}

export {
    ThemeContext as default,
    ThemeContext
}