import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import { TESTIMONIALS } from '../constants/testimonials';
import TestimonialCard from './TestimonialCard';

const TestimonialsSection: React.FC = () => (
  <Box 
    component="section" 
    sx={{ 
      py: { xs: 10, md: 14 },
      backgroundColor: 'background.paper',
      position: 'relative',
      overflow: 'hidden',
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        right: 0,
        height: '100px',
        zIndex: 1,
      },
      '&::before': {
        top: 0,
        background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
      },
      '&::after': {
        bottom: 0,
        background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
      }
    }}
  >
    <Container 
      maxWidth="lg" 
      sx={{ 
        position: 'relative', 
        zIndex: 2,
        '& > * + *': {
          mt: { xs: 8, md: 10 },
        }
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography 
          variant="overline" 
          color="primary"
          sx={{
            display: 'inline-block',
            fontWeight: 600,
            letterSpacing: 1,
            mb: 2,
            color: 'primary.main',
          }}
        >
          TESTIMONIALS
        </Typography>
        <Typography 
          variant="h3" 
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 3,
            position: 'relative',
            '&::after': {
              content: '""',
              display: 'block',
              width: '80px',
              height: '4px',
              backgroundColor: 'primary.main',
              margin: '24px auto 0',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
            },
            '&:hover::after': {
              width: '120px',
              backgroundColor: 'secondary.main',
            }
          }}
        >
          What Our Customers Say
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="text.secondary"
          maxWidth="700px"
          mx="auto"
          sx={{
            fontSize: '1.1rem',
            lineHeight: 1.7,
          }}
        >
          Don't just take our word for it. Here's what our customers have to say about their experience with our banking services.
        </Typography>
      </Box>
      
      <Box sx={{ 
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -40,
          left: 0,
          right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)',
        }
      }}>
        <Grid container spacing={4}>
          {TESTIMONIALS.map((testimonial, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <TestimonialCard testimonial={testimonial} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  </Box>
);

export default TestimonialsSection;
