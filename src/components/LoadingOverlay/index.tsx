import React from "react";
import { Backdrop, CircularProgress, useTheme } from "@mui/material";

interface LoadingOverlayProps {
  loading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ loading }) => {
  const theme = useTheme();

  return (
    <Backdrop
      open={loading}
      sx={{
        position: "absolute",
        zIndex: theme.zIndex.modal - 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        borderRadius: "inherit",
      }}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
};

export default LoadingOverlay;
