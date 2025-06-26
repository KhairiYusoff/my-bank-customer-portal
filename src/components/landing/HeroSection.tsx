import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";

const HeroSection: React.FC = () => (
  <Box
    sx={{
      bgcolor: "primary.main",
      color: "primary.contrastText",
      py: { xs: 8, md: 12 },
      textAlign: "center",
    }}
  >
    <Container>
      <Typography variant="h2" fontWeight={700} gutterBottom>
        Welcome to My Bank
      </Typography>
      <Typography variant="h5" fontWeight={400} sx={{ mb: 4 }}>
        The future of digital banking is here. Open your account online, enjoy
        top security, and manage your finances anywhere, anytime.
      </Typography>
      <Button
        href="/apply"
        variant="contained"
        size="large"
        color="secondary"
        sx={{ px: 6, py: 2, fontSize: "1.2rem", borderRadius: 4, boxShadow: 3 }}
      >
        Apply Now
      </Button>
    </Container>
  </Box>
);

export default HeroSection;
