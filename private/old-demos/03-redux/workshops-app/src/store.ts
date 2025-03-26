import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import themeReducer from "./features/themeSlice";
import workshopsListReducer from "./features/workshopsListSlice";

// this was earlier done using combineReducers()
/* root state looks like this
{
    theme:  {
        value: "light",
    },
    workshopsList: {
        workshops: [],
        loading: true,
        error: null,
    },
    // cart: {
    //     items: [],
    //     discount: 'NEW50'
    // },
    // checkout: {
    //     ...
    // }
}
*/
const store = configureStore({
    reducer: {
        theme: themeReducer,
        workshopsList: workshopsListReducer
        // cart: createSlice,
        // checkout: checkoutSlice
        // mystate : someReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;