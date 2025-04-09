import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token:
            localStorage.getItem("token") ||
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiam9obiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMjMxNDEzNiwiZXhwIjoxNzEyOTE4OTM2fQ.BFTUKhvibdTPOsth0Le6-lb6XhQMYs2LA9WeTfSt2Qs",
        role: localStorage.getItem("role") || "admin",
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.role = action.payload.role;

            // update localstorage
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("role", action.payload.role);
        },
        logout: (state) => {
            state.token = "";
            state.role = "";

            // update loalstorage
            // localStorage.removeItem("token");
            // localStorage.removeItem("role");
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice;
