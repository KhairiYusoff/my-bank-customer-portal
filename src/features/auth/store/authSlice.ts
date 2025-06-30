import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, LoginResponse, ApiErrorResponse } from "../types/auth";
import { authApi } from "./authApi";
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
    builder.addMatcher(authApi.endpoints.login.matchPending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    // Handle login fulfilled state
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        if (action.payload.data) {
          state.user = action.payload.data.user;
        }
      }
    );

    // Handle login rejected state
    builder.addMatcher(
      authApi.endpoints.login.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        const transformedError = action.error as ApiErrorResponse;
        state.error = transformedError.message || "Login failed";
      }
    );
  },
});

export const { setCredentials, logout, setError, clearError } =
  authSlice.actions;
export default authSlice.reducer;
