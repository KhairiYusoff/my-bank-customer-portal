import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { SnackbarProvider } from "@/providers/SnackbarProvider";
import theme from "@/theme";
import Landing from "./features/landing/pages/Landing";
import ApplyPage from "./features/auth/pages/ApplyPage";
import CompleteProfilePage from "./features/auth/pages/CompleteProfilePage";
import CompleteProfileSuccess from "./features/auth/pages/CompleteProfileSuccess";
import LoginPage from "./features/auth/pages/LoginPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import TransferPage from './features/dashboard/pages/TransferPage';
import DepositPage from './features/dashboard/pages/DepositPage';
import WithdrawPage from './features/dashboard/pages/WithdrawPage';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/apply" element={<ApplyPage />} />
            <Route path="/complete-profile" element={<CompleteProfilePage />} />
            <Route path="/complete-profile/success" element={<CompleteProfileSuccess />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transfer"
              element={
                <ProtectedRoute>
                  <TransferPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/deposit"
              element={
                <ProtectedRoute>
                  <DepositPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/withdraw"
              element={
                <ProtectedRoute>
                  <WithdrawPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
