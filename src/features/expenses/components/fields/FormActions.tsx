import React from "react";
import { Button, Divider, Stack, Grid } from "@mui/material";
import { Receipt as ExpenseIcon } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

interface FormActionsProps {
  isDirty: boolean;
  isValid: boolean;
  isLoading: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({
  isDirty,
  isValid,
  isLoading,
  onCancel,
  onSubmit,
}) => {
  return (
    <Grid item xs={12}>
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button
          variant="outlined"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={!isDirty || !isValid || isLoading}
          startIcon={
            isLoading ? (
              <CircularProgress size={20} />
            ) : (
              <ExpenseIcon />
            )
          }
          onClick={onSubmit}
        >
          {isLoading ? "Creating..." : "Create Expense"}
        </Button>
      </Stack>
    </Grid>
  );
};

export default FormActions;
