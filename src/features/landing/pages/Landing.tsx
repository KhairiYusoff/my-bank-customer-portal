import React from "react";
import Box from "@mui/material/Box";
import HeroSection from "@/features/landing/components/HeroSection";
import FeaturesSection from "@/features/landing/components/FeaturesSection";
import TestimonialsSection from "@/features/landing/components/TestimonialsSection";
import ProductsSection from "@/features/landing/components/ProductsSection";
import FooterSection from "@/features/landing/components/FooterSection";
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
      <FooterSection />
    </Box>
  );
};

export default Landing;
