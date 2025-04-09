import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Theme = "light" | "dark";

interface ThemeState {
    value: Theme;
}

const initialState: ThemeState = {
    value: "light",
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme(curState) {
            // this is a copy of the state, and so we are free to mutate it
            curState.value = curState.value === "light" ? "dark" : "light";
        },
    },
});

export const themeSelector = (state: RootState) => state.theme.value;
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
