import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import DashboardLayout from '@/layouts/DashboardLayout';

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to your Dashboard!
          </Typography>
          <Typography variant="body1">
            This is a placeholder for your main dashboard content.
          </Typography>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default DashboardPage;
