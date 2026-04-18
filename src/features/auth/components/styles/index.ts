import { Box, styled } from "@mui/material";

export const SectionBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
}));
