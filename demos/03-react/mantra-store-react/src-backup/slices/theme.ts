import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        value: "light",
    },
    reducers: {
        switchTheme: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value = state.value === "light" ? "dark" : "light";
        },
    },
});

export const { switchTheme } = themeSlice.actions;
export default themeSlice;
