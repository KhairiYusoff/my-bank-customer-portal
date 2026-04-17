import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { HeaderIconAvatar } from "./styles";

type ColorScheme = "primary" | "success" | "error";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  colorScheme: ColorScheme;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon,
  colorScheme,
}) => {
  const theme = useTheme();
  const gradient = theme.palette.gradients[colorScheme];

  return (
    <Paper
      sx={{
        p: 4,
        mb: 4,
        background: gradient,
        color: "white",
        borderRadius: 3,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <HeaderIconAvatar>{icon}</HeaderIconAvatar>
        <Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            {title}
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default PageHeader;
