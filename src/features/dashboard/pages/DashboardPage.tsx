import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  CircularProgress,
  Alert,
  Grid,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { AccountBalance as AccountBalanceIcon } from "@mui/icons-material";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useGetAccountsQuery } from "@/features/accounts/store/accountsApi";
import { AccountCard, QuickActions } from "../components";
import { GradientPageTitle, AccountsSectionTitle } from "../components/styles";
import SpendInsightsCard from "@/features/ai/components/SpendInsightsCard";

// ─── Pure Helpers ─────────────────────────────────────────────────────────────

function renderLoadingState() {
  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <GradientPageTitle variant="h4">Dashboard</GradientPageTitle>
          <Paper sx={{ textAlign: "center", py: 6 }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2, color: "text.secondary" }}>
              Loading your accounts...
            </Typography>
          </Paper>
        </Box>
      </Container>
    </DashboardLayout>
  );
}

function renderErrorState(message: string) {
  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <GradientPageTitle variant="h4">Dashboard</GradientPageTitle>
          <Alert severity="error">{message}</Alert>
        </Box>
      </Container>
    </DashboardLayout>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: accountsResponse, error, isLoading } = useGetAccountsQuery();

  if (isLoading) return renderLoadingState();
  if (error)
    return renderErrorState(
      (error as any).data?.message || "Failed to load accounts.",
    );

  // No Accounts State
  if (!accountsResponse?.data || accountsResponse.data.length === 0) {
    return (
      <DashboardLayout>
        <Container maxWidth="lg">
          <Box sx={{ my: 4 }}>
            <GradientPageTitle variant="h4">Dashboard</GradientPageTitle>
            <Paper sx={{ textAlign: "center", py: 6 }}>
              <AccountBalanceIcon
                sx={{ fontSize: 80, color: "text.secondary", mb: 2 }}
              />
              <Typography variant="h5" color="text.secondary" gutterBottom>
                No accounts found
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                You can open a new account by contacting our support team
              </Typography>
              <Button variant="contained" onClick={() => navigate("/contact")}>
                Contact Support
              </Button>
            </Paper>
          </Box>
        </Container>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          {/* Page Title */}
          <GradientPageTitle variant="h4">Dashboard</GradientPageTitle>

          {/* Quick Actions */}
          <QuickActions />

          {/* AI Spend Insights */}
          <Box sx={{ mb: 4 }}>
            <SpendInsightsCard />
          </Box>

          {/* Accounts Grid */}
          <AccountsSectionTitle variant="h5">
            Your Accounts ({accountsResponse.data.length})
          </AccountsSectionTitle>
          <Grid container spacing={3}>
            {accountsResponse.data.map((account) => (
              <AccountCard key={account.accountNumber} account={account} />
            ))}
          </Grid>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default DashboardPage;
