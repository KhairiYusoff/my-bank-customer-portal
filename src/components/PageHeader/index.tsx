import React from "react";
import { Box, Typography, Paper, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { alpha, styled } from "@mui/material/styles";

type ColorScheme = "primary" | "success" | "error";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  colorScheme: ColorScheme;
}

const HeaderIconAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.2),
  width: 56,
  height: 56,
  marginRight: theme.spacing(2),
}));

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
