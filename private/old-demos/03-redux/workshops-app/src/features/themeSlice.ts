import { createSlice, PayloadAction } from "@reduxjs/toolkit"; // RTK
import { RootState } from '../store';

type Theme = "light" | "dark";

interface ThemeState {
    value: Theme;
}

const initialState: ThemeState = {
    value: "light",
};

const themeSlice = createSlice({
    name: "theme",
    // initialState: initialState,
    initialState,
    reducers: {
        // like a "case" in 01-hello-redux.html
        // an action is created - { type: 'theme/toggleTheme' } and an action creator is also defined
        // this method is called ONLY on dispatch({ type: 'theme/toggleTheme', payload: {} })
        // RRK uses Immer.js (creates a copy of the current state - "draft state")
        // After this function completes execution, Immer JS will apply the changes to create a new state object
        // TAKEAWAY: We can freely change curState when using RTK
        toggleTheme(curState, payload: PayloadAction<string>) {
            console.log(payload);
            // in general we may be using payload.x, payload.y etc.
            curState.value = curState.value === "light" ? "dark" : "light";
        },
    },
});

export const themeSelector = (state: RootState) => state.theme.value;
export const { toggleTheme } = themeSlice.actions; // action creators - dispatch( toggleTheme(/*x, y, z*/) )
export default themeSlice.reducer;