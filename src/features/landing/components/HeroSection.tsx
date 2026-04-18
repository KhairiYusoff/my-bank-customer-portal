import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { HeroBox, HeroApplyButton, HeroSignInButton } from "./styles";

const HeroSection: React.FC = () => (
  <HeroBox>
    <Container>
      <Typography variant="h2" fontWeight={700} gutterBottom>
        Welcome to My Bank
      </Typography>
      <Typography variant="h5" fontWeight={400} sx={{ mb: 4 }}>
        The future of digital banking is here. Open your account online, enjoy
        top security, and manage your finances anywhere, anytime.
      </Typography>
      <Box sx={{ display: "flex", gap: 3, justifyContent: "center" }}>
        <HeroApplyButton
          component={RouterLink}
          to="/apply"
          variant="contained"
          size="large"
          color="secondary"
        >
          Apply Now
        </HeroApplyButton>
        <HeroSignInButton
          component={RouterLink}
          to="/login"
          variant="outlined"
          size="large"
          color="secondary"
        >
          Sign In
        </HeroSignInButton>
      </Box>
    </Container>
  </HeroBox>
);

export default HeroSection;
