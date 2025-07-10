import React from "react";
import Box from "@mui/material/Box";
import HeroSection from "@/features/landing/components/HeroSection";
import FeaturesSection from "@/features/landing/components/FeaturesSection";
import TestimonialsSection from "@/features/landing/components/TestimonialsSection";
import ProductsSection from "@/features/landing/components/ProductsSection";

import FadeInSection from "@/features/landing/components/FadeInSection";

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
