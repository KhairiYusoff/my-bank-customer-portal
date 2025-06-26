import React from "react";
import Box from "@mui/material/Box";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ProductsSection from "@/components/landing/ProductsSection";
import FooterSection from "@/components/landing/FooterSection";
import FadeInSection from "@/components/landing/FadeInSection";

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
