import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, List, ListItem, ListItemText, CircularProgress, Alert, Link, Divider } from '@mui/material';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useGetAccountsQuery } from '@/features/accounts/store/accountsApi';

const DashboardPage: React.FC = () => {
  const { data: accountsResponse, error, isLoading } = useGetAccountsQuery();

  const renderAccounts = () => {
    if (isLoading) {
      return <CircularProgress />;
    }

    if (error) {
      const apiError = error as any;
      return <Alert severity="error">{apiError.data?.message || 'Failed to load accounts.'}</Alert>;
    }

    if (!accountsResponse || !accountsResponse.data || accountsResponse.data.length === 0) {
      return <Alert severity="info">No accounts found. You can open one by contacting support.</Alert>;
    }

    return (
      <List>
        {accountsResponse.data.map((account) => (
          <React.Fragment key={account.accountNumber}>
            <ListItem button component={RouterLink} to={`/accounts/${account.accountNumber}`}>
              <ListItemText 
                primary={account.accountType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} 
                secondary={`Account Number: ${account.accountNumber}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    );
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Your Accounts
          </Typography>
          {renderAccounts()}
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default DashboardPage;

