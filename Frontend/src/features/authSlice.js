import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axios.js";

export const fetchUser = createAsyncThunk(
    "auth/fetchUser",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/v1/users/authMe", { withCredentials: true });
            // console.log("authMe response:", res.data);
            return res.data;
        } catch (err) {
            console.error("authMe error:", err.message);
            return rejectWithValue(err.response?.data || "Not logged in");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, status: "idle" },
    reducers: {
        logout(state) {
            state.user = null;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchUser.rejected, (state) => {
                state.user = null;
                state.status = "failed";
            });
    },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;

// reducers function, inital state, action, payload, disptach, 
