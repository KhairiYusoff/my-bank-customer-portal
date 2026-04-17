import React from "react";
import { Box, Typography, Avatar, Paper } from "@mui/material";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon,
  gradient,
}) => {
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
        <Avatar
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            mr: 2,
            width: 56,
            height: 56,
          }}
        >
          {icon}
        </Avatar>
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
