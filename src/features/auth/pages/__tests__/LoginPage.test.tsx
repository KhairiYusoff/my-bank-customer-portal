import { render } from "@testing-library/react";
import LoginPage from "../LoginPage";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/app/store/baseApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "@/features/auth/store/authSlice";
import { SnackbarProvider } from "notistack";

// Create a test store for testing components that use Redux
const createTestStore = () => {
  const store = configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActionPaths: ["meta.arg", "payload.timestamp", "meta.baseQueryMeta.request"],
          ignoredPaths: ["api.queries", "api.mutations"],
        },
      }).concat(baseApi.middleware),
  });
  
  setupListeners(store.dispatch);
  return store;
};

describe("LoginPage", () => {
  it("renders without crashing", () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <SnackbarProvider>
          <BrowserRouter>
            <LoginPage />
          </BrowserRouter>
        </SnackbarProvider>
      </Provider>
    );
  });
});
