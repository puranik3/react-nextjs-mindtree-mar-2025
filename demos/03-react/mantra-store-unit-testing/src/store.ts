import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices/theme";
import authSlice from "./slices/auth";

const store = configureStore({
    reducer: {
        theme: themeSlice.reducer,
        auth: authSlice.reducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;

export default store;
