import React from "react";
import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";
import { AccountBalance as AccountBalanceIcon } from "@mui/icons-material";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description }) => {
  return (
    <Card>
      <CardContent sx={{ textAlign: "center", py: 6 }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            mx: "auto",
            mb: 2,
            bgcolor: "action.hover",
          }}
        >
          {icon}
        </Avatar>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
