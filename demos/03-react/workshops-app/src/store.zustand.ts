import { create } from "zustand";

type Theme = "light" | "dark";

interface StoreState {
    theme: Theme;
    toggleTheme: () => void;
}

const useStore = create<StoreState>((set) => ({
    theme: "light",
    toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));

export default useStore;
