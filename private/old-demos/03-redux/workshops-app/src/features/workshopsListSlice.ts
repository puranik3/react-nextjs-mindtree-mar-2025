import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getWorkshops } from "../services/workshops";
import IWorkshop from "../models/IWorkshop";

interface WorkshopsListState {
    workshops: IWorkshop[];
    loading: boolean;
    error: Error | undefined | null;
}

const initialState: WorkshopsListState = {
    workshops: [],
    loading: true,
    error: null,
};

interface GetWorkshopsArgs {
    page: number;
    category: string;
}

// a new action type - { type: "workshopsList/getWorkshops" }
export const getWorkshopsThunk = createAsyncThunk<IWorkshop[], GetWorkshopsArgs, { rejectValue: Error }>(
    "workshopsList/getWorkshops",
    // thunk
    async ({ page, category }, thunkAPI) => {
        try {
            const data = await getWorkshops(page, category);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error as Error);
        }
    }
);

const workshopsListSlice = createSlice({
    name: "workshopsList",
    initialState,
    reducers: {
        // { type: "workshopsList/fetchWorkshopsPending" } - dispatch before making API call
        // fetchWorkshopsPending(state) {
        //     state.loading = true;
        //     state.error = null;
        // },
        // // { type: "workshopsList/fetchWorkshopsSuccess" } - dispatch after successful API call
        // fetchWorkshopsSuccess(state, action: PayloadAction<IWorkshop[]>) {
        //     state.loading = false;
        //     state.workshops = action.payload;
        // },
        // // { type: "workshopsList/fetchWorkshopsFailure" } - dispatch after unsuccessful API call
        // fetchWorkshopsFailure(state, action: PayloadAction<Error | undefined | null>) {
        //     state.loading = false;
        //     state.error = action.payload;
        // },
        resetWorkshopsList(state) {
            state.workshops = [];
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWorkshopsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getWorkshopsThunk.fulfilled, (state, action: PayloadAction<IWorkshop[]>) => {
                state.loading = false;
                state.workshops = action.payload;
            })
            .addCase(getWorkshopsThunk.rejected, (state, action: PayloadAction<Error | undefined | null>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const workshopsListSelector = (state: RootState) => state.workshopsList;
// export const { fetchWorkshopsPending, fetchWorkshopsSuccess, fetchWorkshopsFailure, resetWorkshopsList } = workshopsListSlice.actions;
export default workshopsListSlice.reducer;