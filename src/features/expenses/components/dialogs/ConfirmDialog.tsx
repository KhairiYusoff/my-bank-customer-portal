import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { Check as CheckIcon } from "@mui/icons-material";
import type { FormValues } from "../expense-form";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  expenseData: FormValues | null;
  categories: Array<{ value: string; label: string }>;
  selectedAccount?: {
    accountNumber: string;
    accountType: string;
  };
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  isLoading,
  expenseData,
  categories,
  selectedAccount,
}) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 }
      }}
    >
      <DialogTitle>Confirm Expense</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to create this expense?
        </DialogContentText>
        {expenseData && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              Amount: <strong>RM{expenseData.amount.toFixed(2)}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Category: <strong>{categories.find(c => c.value === expenseData.category)?.label}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description: <strong>{expenseData.description}</strong>
            </Typography>
            {selectedAccount && (
              <Typography variant="body2" color="text.secondary">
                Account: <strong>{selectedAccount.accountNumber}</strong>
              </Typography>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : <CheckIcon />}
        >
          {isLoading ? "Creating..." : "Create Expense"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
