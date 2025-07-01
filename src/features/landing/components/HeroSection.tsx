import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

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
      <Box sx={{ display: "flex", gap: 3, justifyContent: "center" }}>
        <Button
          component={RouterLink}
          to="/apply"
          variant="contained"
          size="large"
          color="secondary"
          sx={{
            px: 6,
            py: 2,
            fontSize: "1.2rem",
            borderRadius: 4,
            boxShadow: 3,
          }}
        >
          Apply Now
        </Button>
        <Button
          component={RouterLink}
          to="/login"
          variant="outlined"
          size="large"
          color="secondary"
          sx={{
            px: 6,
            py: 2,
            fontSize: "1.2rem",
            borderRadius: 4,
            boxShadow: 3,
            borderWidth: 2,
            "&:hover": {
              borderWidth: 2,
            },
          }}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  </Box>
);

export default HeroSection;
