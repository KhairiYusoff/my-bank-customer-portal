import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import { TESTIMONIALS } from "../constants/testimonials";
import TestimonialCard from "./TestimonialCard";
import { TestimonialsSectionBox, TestimonialsGridBox, TestimonialSectionHeading } from "./styles";

const TestimonialsSection: React.FC = () => (
  <TestimonialsSectionBox component="section">
    <Container
      maxWidth="lg"
      sx={{
        position: "relative",
        zIndex: 2,
        "& > * + *": {
          mt: { xs: 8, md: 10 },
        },
      }}
    >
      <Box sx={{ textAlign: "center", mb: 8 }}>
        <Typography
          variant="overline"
          sx={{
            display: "inline-block",
            fontWeight: 600,
            letterSpacing: 1,
            mb: 2,
            color: "primary.main",
          }}
        >
          TESTIMONIALS
        </Typography>
        <TestimonialSectionHeading variant="h3" component="h2">
          What Our Customers Say
        </TestimonialSectionHeading>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          maxWidth="700px"
          mx="auto"
          sx={{
            fontSize: "1.1rem",
            lineHeight: 1.7,
          }}
        >
          Don't just take our word for it. Here's what our customers have to say
          about their experience with our banking services.
        </Typography>
      </Box>

      <TestimonialsGridBox>
        <Grid container spacing={4}>
          {TESTIMONIALS.map((testimonial, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <TestimonialCard testimonial={testimonial} />
            </Grid>
          ))}
        </Grid>
      </TestimonialsGridBox>
    </Container>
  </TestimonialsSectionBox>
);

export default TestimonialsSection;
