import React from "react";
import {
  Container,
  Typography,
  Grid,
  CardContent,
  Box,
} from "@mui/material";
import { FEATURES, Feature } from "../constants/features";
import { FeatureCard } from "./styles";

const FeaturesSection: React.FC = () => (
  <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
    <Typography variant="h4" align="center" fontWeight={600} gutterBottom>
      Why Choose My Bank?
    </Typography>
    <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
      {FEATURES.map((feature: Feature, idx) => {
        const Icon = feature.icon;
        return (
          <Grid item xs={12} sm={6} md={3} key={idx}>
          <FeatureCard elevation={3}>
              <Box>
                <Icon fontSize="large" color="primary" />
              </Box>
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  gutterBottom
                  align="center"
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  {feature.desc}
                </Typography>
              </CardContent>
          </FeatureCard>
          </Grid>
        );
      })}
    </Grid>
  </Container>
);

export default FeaturesSection;
