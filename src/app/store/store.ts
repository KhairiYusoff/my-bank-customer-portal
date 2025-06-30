import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./baseApi";
import authReducer from "@/features/auth/store/authSlice";

// Configure the Redux store
export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [baseApi.reducerPath]: baseApi.reducer,
    // Add the auth reducer
    auth: authReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other useful features
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp", "meta.baseQueryMeta.request"],
        // Ignore these field paths in the state
        ignoredPaths: ["api.queries", "api.mutations"],
      },
    }).concat(baseApi.middleware),
  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== "production",
});

// Enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
