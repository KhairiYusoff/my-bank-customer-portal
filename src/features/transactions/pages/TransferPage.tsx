import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Box, Container, Typography } from '@mui/material';
import TransferForm from '../components/TransferForm';

const TransferPage: React.FC = () => {
  return (
    <DashboardLayout>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Transfer Funds
          </Typography>
          <TransferForm />
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default TransferPage;
