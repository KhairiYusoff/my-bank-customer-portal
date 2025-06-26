import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store/store";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import Landing from "./features/landing/pages/Landing";
import ApplyPage from "./features/auth/pages/ApplyPage";
import CompleteProfilePage from "./features/auth/pages/CompleteProfilePage";
import CompleteProfileSuccess from "./features/auth/pages/CompleteProfileSuccess";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/apply" element={<ApplyPage />} />
            <Route path="/complete-profile" element={<CompleteProfilePage />} />
            <Route path="/complete-profile/success" element={<CompleteProfileSuccess />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
