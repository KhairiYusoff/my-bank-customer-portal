import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/app/store/store";
import { ThemeProvider, CssBaseline, Box, CircularProgress } from "@mui/material";
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
import DepositPage from "./features/accounts/pages/DepositPage";
import WithdrawPage from "./features/accounts/pages/WithdrawPage";
import AccountDetailsPage from "./features/accounts/pages/AccountDetailsPage";
import ContactUsPage from "./features/contacts/pages/ContactUsPage";
import ProfilePage from "./features/profile/pages/ProfilePage";
import ExpensesPage from "./features/expenses";
import FooterSection from "./components/FooterSection";
import { setCredentials } from "@/features/auth/store/authSlice";
import { useLazyCheckTokenQuery } from "@/features/auth/store/authApi";

// Loading component shown while checking authentication status
const AuthLoadingScreen: React.FC = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f6f8fa",
    }}
  >
    <CircularProgress size={60} />
  </Box>
);

// Main app content with routes
const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [checkToken] = useLazyCheckTokenQuery();

  useEffect(() => {
    // Check if user has valid session on app initialization
    // This restores auth state from httpOnly cookies after page refresh
    const checkAuthStatus = async () => {
      try {
        const result = await checkToken().unwrap();
        
        if (result.success && result.data?.user) {
          // Restore user data to Redux state
          dispatch(setCredentials({ user: result.data.user }));
        }
      } catch (error) {
        // User not authenticated or network error - stay logged out
        console.debug("Auth check failed:", error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuthStatus();
  }, [dispatch, checkToken]);

  // Show loading screen while checking authentication
  if (isCheckingAuth) {
    return <AuthLoadingScreen />;
  }

  return (
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
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <ExpensesPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
      <FooterSection />
    </Box>
  );
};

// Root App component with providers
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>
          <Router>
            <AppContent />
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
