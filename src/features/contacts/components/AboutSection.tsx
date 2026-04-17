import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { AboutInfoBox } from "./styles";

const AboutSection: React.FC = () => {
  return (
    <Card
      sx={{
        mt: 4,
        borderRadius: 3,
        boxShadow: (theme) => theme.palette.customShadows.card,
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
        >
          About MyBank Online Banking
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              Welcome to the all-new MyBank Online Banking experience. We
              provide convenient, safe and instant banking access to your MyBank
              accounts through your desktop, laptop and mobile devices.
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              Log in with your existing MyBank credentials to perform your
              desired banking transactions swiftly and securely from anywhere,
              anytime.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <AboutInfoBox>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                IMPORTANT NOTE
              </Typography>
              <Typography variant="body2" color="text.secondary">
                MyBank Online Banking is exclusively available for MyBank and
                MyBank Islamic Bank Malaysia account holders.
              </Typography>
            </AboutInfoBox>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AboutSection;
