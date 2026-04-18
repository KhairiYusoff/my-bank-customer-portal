import React from "react";
import { Stack, Typography } from "@mui/material";
import { DashboardOutlined as DashboardIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { QuickActionsPaper, QuickActionButton } from "./styles";
import { quickActions } from "../constants/quickActions";

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <QuickActionsPaper>
      <Typography variant="h6" sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
        <DashboardIcon />
        Quick Actions
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        {quickActions.map((action) => (
          <QuickActionButton
            key={action.path}
            variant="contained"
            startIcon={<action.IconComponent />}
            onClick={() => navigate(action.path)}
          >
            {action.label}
          </QuickActionButton>
        ))}
      </Stack>
    </QuickActionsPaper>
  );
};

export default QuickActions;
