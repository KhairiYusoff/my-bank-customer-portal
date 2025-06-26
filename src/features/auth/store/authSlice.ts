import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/auth";
import { AuthState } from "../types/auth";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      // TODO: Add API call to invalidate token on the server
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle login pending state
    builder.addMatcher(
      (action) =>
        action.type.endsWith("/pending") && action.type.includes("login"),
      (state) => {
        state.isLoading = true;
        state.error = null;
      }
    );

    // Handle login fulfilled state
    builder.addMatcher(
      (action) =>
        action.type.endsWith("/fulfilled") && action.type.includes("login"),
      (state, action: PayloadAction<{ data: { user: User } }>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
      }
    );

    // Handle login rejected state
    builder.addMatcher(
      (action) =>
        action.type.endsWith("/rejected") && action.type.includes("login"),
      (state, action: { payload: any }) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload?.data?.message || "Login failed";
      }
    );
  },
});

export const { setCredentials, logout, setError, clearError } =
  authSlice.actions;
export default authSlice.reducer;
