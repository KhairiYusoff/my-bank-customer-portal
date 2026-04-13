import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Warning as WarningIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import type { Expense } from "../../types/expense";

interface DeleteExpenseDialogProps {
  open: boolean;
  onClose: () => void;
  expense: Expense | null;
  isLoading: boolean;
  error: any;
  onDeleteExpense: (id: string) => Promise<boolean>;
}

const DeleteExpenseDialog: React.FC<DeleteExpenseDialogProps> = ({
  open,
  onClose,
  expense,
  isLoading,
  error,
  onDeleteExpense,
}) => {
  const handleDelete = async () => {
    if (!expense) return;

    const success = await onDeleteExpense(expense._id);
    if (success) {
      onClose();
    }
  };

  if (!expense) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 2 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <WarningIcon color="warning" />
          <Typography variant="h6">Delete Expense</Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.data?.message || "Failed to delete expense. Please try again."}
          </Alert>
        )}

        <Box sx={{ py: 1 }}>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to delete this expense?
          </Typography>
          
          <Box sx={{ 
            mt: 2, 
            p: 2, 
            bgcolor: 'background.paper',
            border: 1,
            borderColor: 'divider',
            borderRadius: 1
          }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Expense Details:
            </Typography>
            <Typography variant="body2">
              <strong>Description:</strong> {expense.description}
            </Typography>
            <Typography variant="body2">
              <strong>Amount:</strong> RM{expense.amount.toFixed(2)}
            </Typography>
            <Typography variant="body2">
              <strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
              <strong>Category:</strong> {expense.category}
            </Typography>
            {expense.subCategory && (
              <Typography variant="body2">
                <strong>Subcategory:</strong> {expense.subCategory}
              </Typography>
            )}
          </Box>

          <Typography variant="body2" color="warning.main" sx={{ mt: 2 }}>
            <strong>Note:</strong> This action cannot be undone. The expense will be marked as deleted and removed from your active expenses list.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          onClick={onClose} 
          startIcon={<CancelIcon />}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleDelete} 
          variant="contained" 
          color="error"
          startIcon={isLoading ? <CircularProgress size={20} /> : <DeleteIcon />}
          disabled={isLoading}
        >
          {isLoading ? 'Deleting...' : 'Delete Expense'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteExpenseDialog;
