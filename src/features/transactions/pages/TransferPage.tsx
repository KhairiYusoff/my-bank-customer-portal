import React from "react";
import {
  Box,
  Container,
  Typography,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import {
  SwapHoriz as TransferIcon,
  AccountBalance as AccountBalanceIcon,
} from "@mui/icons-material";
import DashboardLayout from "@/layouts/DashboardLayout";
import { PageHeader, LoadingOverlay } from "@/components";
import { PrimaryIconAvatar } from "../components/styles";
import TransferForm from "../components/TransferForm";
import { useTransferForm } from "../hooks/useTransferForm";

const TransferPage: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    errors,
    isDirty,
    isValid,
    isLoading,
    isFetchingAccounts,
    accountsError,
    accounts,
    openConfirm,
    transferData,
    onSubmit,
    handleCloseConfirm,
    handleConfirmTransfer,
  } = useTransferForm();

  const hasAccounts = accounts.length > 0;

  const renderContent = () => {
    if (accountsError) {
      return (
        <Alert
          severity="error"
          sx={{
            borderRadius: 3,
            "& .MuiAlert-icon": { fontSize: "2rem" },
          }}
        >
          <Typography variant="h6" gutterBottom>
            Failed to load accounts
          </Typography>
          <Typography variant="body2">
            Unable to retrieve your account information. Please try refreshing
            the page.
          </Typography>
        </Alert>
      );
    }

    if (!hasAccounts) {
      return (
        <Card>
          <CardContent sx={{ textAlign: "center", py: 6 }}>
            <PrimaryIconAvatar
              sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
            >
              <AccountBalanceIcon
                sx={{ fontSize: "2.5rem", color: "primary.main" }}
              />
            </PrimaryIconAvatar>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No Accounts Available
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              You need at least one account to make transfers. Please open an
              account first.
            </Typography>
          </CardContent>
        </Card>
      );
    }

    return (
      <TransferForm
        accounts={accounts}
        isLoading={isLoading}
        isDirty={isDirty}
        isValid={isValid}
        openConfirm={openConfirm}
        transferData={transferData}
        control={control}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        handleCloseConfirm={handleCloseConfirm}
        handleConfirmTransfer={handleConfirmTransfer}
      />
    );
  };

  return (
    <DashboardLayout>
      <LoadingOverlay loading={isFetchingAccounts} />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <PageHeader
            title="Transfer Funds"
            subtitle="Send money securely between your accounts"
            icon={<TransferIcon fontSize="large" />}
            colorScheme="primary"
          />

          {/* Content Section */}
          {renderContent()}
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default TransferPage;
