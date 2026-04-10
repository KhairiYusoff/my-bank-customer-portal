import React from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import {
  Search as SearchIcon,
} from "@mui/icons-material";

const AnalyticsTab: React.FC = () => {
  return (
    <Box sx={{ p: 3, textAlign: 'center', py: 8 }}>
      <SearchIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Analytics Coming Soon
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Advanced expense analytics and reporting features will be available here.
      </Typography>
    </Box>
  );
};

export default AnalyticsTab;
