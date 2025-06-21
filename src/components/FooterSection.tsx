import React from 'react';
import { Box, Container, Typography, Link, Divider } from '@mui/material';

const FooterSection: React.FC = () => (
  <Box sx={{ bgcolor: 'background.paper', py: 4 }}>
    <Container maxWidth="md" sx={{ textAlign: 'center' }}>
      <Divider sx={{ mb: 3 }} />
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} My Bank. All rights reserved. |{' '}
        <Link href="#" underline="hover">
          Privacy Policy
        </Link>
      </Typography>
    </Container>
  </Box>
);

export default FooterSection;
