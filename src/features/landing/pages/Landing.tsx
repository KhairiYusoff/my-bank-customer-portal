import React from "react";
import Box from "@mui/material/Box";
import {
  HeroSection,
  FeaturesSection,
  TestimonialsSection,
  ProductsSection,
  FadeInSection,
} from "../components";

const Landing: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeroSection />
      <FadeInSection>
        <FeaturesSection />
      </FadeInSection>
      <FadeInSection>
        <ProductsSection />
      </FadeInSection>
      <FadeInSection>
        <TestimonialsSection />
      </FadeInSection>

    </Box>
  );
};

export default Landing;
