import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, CircularProgress, Alert } from '@mui/material';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useGetAccountBalanceQuery } from '../store/accountsApi';

const AccountDetailsPage: React.FC = () => {
  const { accountNumber } = useParams<{ accountNumber: string }>();

  // The hook will not run if accountNumber is undefined
  const { data, error, isLoading, isFetching } = useGetAccountBalanceQuery(accountNumber!, {
    skip: !accountNumber,
  });

  const renderContent = () => {
    if (isLoading || isFetching) {
      return <CircularProgress sx={{ mt: 4 }} />;
    }

    if (error) {
        const apiError = error as any;
        return (
            <Alert severity="error" sx={{ mt: 4 }}>
                {apiError.data?.message || 'Failed to load account balance.'}
            </Alert>
        );
    }

    if (data && data.success && data.data) {
      return (
        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Balance: ${data.data.balance.toFixed(2)}
          </Typography>
        </Box>
      );
    }

    return (
        <Alert severity="info" sx={{ mt: 4 }}>
            Account details could not be loaded.
        </Alert>
    );
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Account Details
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Account Number: {accountNumber}
          </Typography>
          {renderContent()}
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default AccountDetailsPage;
