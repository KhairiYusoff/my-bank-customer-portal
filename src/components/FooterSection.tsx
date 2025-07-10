import React from "react";
import { Box, Container, Typography, Link, Divider } from "@mui/material";

const FooterSection: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {"All rights reserved. Copyright © "}
          <Link color="inherit" href="#">
            MyBank Berhad
          </Link>{" "}
          {new Date().getFullYear()}
          {". "}
          202301005555 (98765-W)
        </Typography>
      </Container>
    </Box>
  );
};

export default FooterSection;
