import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { checkLoginAsync, loginAsync, logoutAsync } from "../../auth/auth";
import { processResponse } from "../../utils";

export const login = createAsyncThunk("auth/login", async (data) => {
    const res = await loginAsync(data.code);
    if (res.ok) {
        return res.data;
    }
    toast.error(`Failed to log in: ${res.statusText}`);
    return undefined;
});

export const checkLogin = createAsyncThunk("auth/checkLogin", async () => {
    const res = await checkLoginAsync();
    return processResponse(res);
});

export const logout = createAsyncThunk("auth/logout", async () => {
    const res = await logoutAsync();
    return processResponse(res, undefined, "Successfully logged out");
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loggedIn: false,
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload) {
                state.loggedIn = true;
                state.user = action.payload;
            }
        });
        builder.addCase(login.rejected, (_, action) => {
            toast.error(`Failed to log in: ${action.error.message}`);
        });
        builder.addCase(checkLogin.fulfilled, (state, action) => {
            if (action.payload) {
                state.loggedIn = true;
                state.user = action.payload;
            }
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.loggedIn = false;
            state.user = undefined;
        });
        builder.addCase(logout.rejected, (state, action) => {
            if (action.payload) {
                state.loggedIn = false;
                state.user = undefined;
            }
        });
    },
    reducers: {},
});

export const userSelector = (state) => state.auth.user;
export const loggedInSelector = (state) => state.auth.loggedIn;

export default authSlice.reducer;
