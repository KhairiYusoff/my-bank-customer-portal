import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { PRODUCTS, Product } from "@constants/products";

const ProductsSection: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography variant="h4" align="center" fontWeight={600} gutterBottom>
        Choose the Account That Fits You
      </Typography>
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
        {PRODUCTS.map((product: Product, idx) => {
          const gradients = [
            "linear-gradient(135deg, #FF7E5F 0%, #FD3A69 100%)",
            "linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)",
            "linear-gradient(135deg, #5EFCE8 0%, #736EFE 100%)",
          ];
          const bg = gradients[idx % gradients.length];
          return (
            <Grid item xs={12} md={4} key={idx}>
              <Card
                elevation={6}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  background: bg,
                  color: "common.white",
                  borderRadius: 3,
                  "&:hover": {
                    transform: "translateY(-8px)",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {product.title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="inherit"
                    gutterBottom
                    sx={{ opacity: 0.9, mb: 2 }}
                  >
                    {product.subtitle}
                  </Typography>
                  <List dense>
                    {product.benefits.map((benefit, i) => (
                      <ListItem key={i} disableGutters>
                        <ListItemIcon
                          sx={{ minWidth: 28, color: "common.white" }}
                        >
                          <CheckCircleIcon color="inherit" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={benefit}
                          primaryTypographyProps={{ color: "common.white" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <Box sx={{ textAlign: "center", pb: 3 }}>
                  <Button
                    href={`/apply?type=${product.type.toLowerCase()}`}
                    variant="contained"
                    color="primary"
                    sx={{
                      px: 5,
                      py: 1.5,
                      borderRadius: 3,
                      backgroundColor: "common.white",
                      color: "primary.main",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                      boxShadow: 3,
                    }}
                  >
                    Apply for {product.type}
                  </Button>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default ProductsSection;
