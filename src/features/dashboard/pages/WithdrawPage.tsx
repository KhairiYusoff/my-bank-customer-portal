import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Box, Container, Typography } from '@mui/material';

const WithdrawPage: React.FC = () => {
  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Withdraw Funds
          </Typography>
          <Typography variant="body1">
            This is the withdraw funds page.
          </Typography>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default WithdrawPage;
