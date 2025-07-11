import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { SnackbarProvider } from "@/providers/SnackbarProvider";
import theme from "@/theme";
import Landing from "./features/landing/pages/Landing";
import ApplyPage from "./features/auth/pages/ApplyPage";
import CompleteProfilePage from "./features/auth/pages/CompleteProfilePage";
import CompleteProfileSuccess from "./features/auth/pages/CompleteProfileSuccess";
import LoginPage from "./features/auth/pages/LoginPage";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import TransferPage from "./features/transactions/pages/TransferPage";
import DepositPage from "./features/dashboard/pages/DepositPage";
import WithdrawPage from "./features/accounts/pages/WithdrawPage";
import AccountDetailsPage from "./features/accounts/pages/AccountDetailsPage";
import ContactUsPage from "./features/contacts/pages/ContactUsPage";
import FooterSection from "./components/FooterSection";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>
          <Router>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Box component="main" sx={{ flexGrow: 1 }}>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/apply" element={<ApplyPage />} />
                  <Route
                    path="/complete-profile"
                    element={<CompleteProfilePage />}
                  />
                  <Route
                    path="/complete-profile/success"
                    element={<CompleteProfileSuccess />}
                  />
                  <Route path="/login" element={<LoginPage />} />
                  <Route
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                  />
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
                  <Route
                    path="/accounts/:accountNumber"
                    element={
                      <ProtectedRoute>
                        <AccountDetailsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/contact-us"
                    element={
                      <ProtectedRoute>
                        <ContactUsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Box>
              <FooterSection />
            </Box>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
