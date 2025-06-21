import React from 'react';
import Box from '@mui/material/Box';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ProductsSection from '@/components/ProductsSection';
import FooterSection from '@/components/FooterSection';
import FadeInSection from '@/components/FadeInSection';

const Landing: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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
