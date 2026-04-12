import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  CircularProgress,
  Divider,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import type { Expense, UpdateExpenseRequest } from "../../types/expense";

interface EditExpenseDialogProps {
  open: boolean;
  onClose: () => void;
  expense: Expense | null;
  isLoading: boolean;
  error: any;
  onUpdateExpense: (id: string, data: UpdateExpenseRequest) => Promise<boolean>;
  categories: any[];
  paymentMethods: any[];
}

const EditExpenseDialog: React.FC<EditExpenseDialogProps> = ({
  open,
  onClose,
  expense,
  isLoading,
  error,
  onUpdateExpense,
  categories,
  paymentMethods,
}) => {
  const [formData, setFormData] = React.useState<UpdateExpenseRequest>({});
  const [tagsInput, setTagsInput] = React.useState("");
  const [merchantData, setMerchantData] = React.useState({
    name: "",
    location: "",
    receiptNumber: "",
  });

  // Reset form when expense changes
  useEffect(() => {
    if (expense) {
      setFormData({
        amount: expense.amount,
        category: expense.category,
        subCategory: expense.subCategory || undefined,
        description: expense.description,
        date: expense.date ? new Date(expense.date).toISOString().split('T')[0] : '',
        paymentMethod: expense.paymentMethod,
        notes: expense.notes || '',
        tags: expense.tags || [],
      });
      setTagsInput((expense.tags || []).join(", "));
      setMerchantData({
        name: expense.merchant?.name || "",
        location: expense.merchant?.location || "",
        receiptNumber: expense.merchant?.receiptNumber || "",
      });
    }
  }, [expense]);

  const handleInputChange = (field: keyof UpdateExpenseRequest, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTagsChange = (value: string) => {
    setTagsInput(value);
    const tags = value.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0);
    handleInputChange("tags", tags);
  };

  const handleMerchantChange = (field: string, value: string) => {
    setMerchantData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    const updatedMerchant = { ...merchantData, [field]: value };
    const hasMerchantData = updatedMerchant.name || updatedMerchant.location || updatedMerchant.receiptNumber;
    
    handleInputChange("merchant", hasMerchantData ? updatedMerchant : undefined);
  };

  const handleSubmit = async () => {
    if (!expense) return;

    // Prepare update data (only include changed fields)
    const updateData: UpdateExpenseRequest = {};
    
    // Compare with original expense and only include changed fields
    if (formData.amount !== expense.amount) {
      updateData.amount = formData.amount;
    }
    if (formData.category !== expense.category) {
      updateData.category = formData.category;
    }
    if (formData.subCategory !== expense.subCategory) {
      updateData.subCategory = formData.subCategory;
    }
    if (formData.description !== expense.description) {
      updateData.description = formData.description;
    }
    if (formData.date !== new Date(expense.date).toISOString().split('T')[0]) {
      updateData.date = formData.date;
    }
    if (formData.paymentMethod !== expense.paymentMethod) {
      updateData.paymentMethod = formData.paymentMethod;
    }
    if (formData.notes !== (expense.notes || '')) {
      updateData.notes = formData.notes;
    }
    if (JSON.stringify(formData.tags || []) !== JSON.stringify(expense.tags || [])) {
      updateData.tags = formData.tags;
    }
    
    // Check merchant changes
    const currentMerchant = expense.merchant || { name: '', location: '', receiptNumber: '' };
    const newMerchant = merchantData;
    const merchantChanged = 
      newMerchant.name !== currentMerchant.name ||
      newMerchant.location !== currentMerchant.location ||
      newMerchant.receiptNumber !== currentMerchant.receiptNumber;
    
    if (merchantChanged) {
      const hasNewMerchantData = newMerchant.name || newMerchant.location || newMerchant.receiptNumber;
      updateData.merchant = hasNewMerchantData ? newMerchant : undefined;
    }

    const success = await onUpdateExpense(expense._id, updateData);
    if (success) {
      onClose();
    }
  };

  const getSubCategories = () => {
    const selectedCategory = categories.find(cat => cat.name === formData.category);
    return selectedCategory?.subCategories || [];
  };

  if (!expense) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pb: 2 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <EditIcon color="primary" />
          <Typography variant="h6">Edit Expense</Typography>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px" color="error.main">
            <Typography variant="body1">Error loading expense data.</Typography>
          </Box>
        ) : (
          <Box>
            <Grid container spacing={3}>
              {/* Amount */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Amount"
                  type="number"
                  value={formData.amount || ''}
                  onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
                  fullWidth
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>RM</Typography>,
                  }}
                />
              </Grid>

              {/* Date */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Date"
                  type="date"
                  value={formData.date || ''}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              {/* Category */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category || ''}
                    label="Category"
                    onChange={(e) => {
                      handleInputChange('category', e.target.value);
                      // Reset subcategory when category changes
                      handleInputChange('subCategory', '');
                    }}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category._id} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* SubCategory */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Subcategory</InputLabel>
                  <Select
                    value={formData.subCategory || ''}
                    label="Subcategory"
                    onChange={(e) => handleInputChange('subCategory', e.target.value)}
                    disabled={!formData.category}
                  >
                    {getSubCategories().map((subCategory: string) => (
                      <MenuItem key={subCategory} value={subCategory}>
                        {subCategory}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Payment Method */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Payment Method</InputLabel>
                  <Select
                    value={formData.paymentMethod || ''}
                    label="Payment Method"
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                  >
                    {paymentMethods.map((method) => (
                      <MenuItem key={method._id} value={method.name}>
                        {method.name?.replace('_', ' ').toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                />
              </Grid>

              {/* Tags */}
              <Grid item xs={12}>
                <TextField
                  label="Tags (comma-separated)"
                  value={tagsInput}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  fullWidth
                  helperText="Enter tags separated by commas (e.g., lunch, work, urgent)"
                />
                {formData.tags && formData.tags.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {formData.tags.map((tag, index) => (
                        <Chip key={index} label={tag} size="small" />
                      ))}
                    </Stack>
                  </Box>
                )}
              </Grid>

              {/* Notes */}
              <Grid item xs={12}>
                <TextField
                  label="Notes"
                  value={formData.notes || ''}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  fullWidth
                  multiline
                  rows={3}
                  helperText="Optional additional notes about this expense"
                />
              </Grid>

              {/* Merchant Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Merchant Information (Optional)
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Merchant Name"
                      value={merchantData.name}
                      onChange={(e) => handleMerchantChange('name', e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Location"
                      value={merchantData.location}
                      onChange={(e) => handleMerchantChange('location', e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Receipt Number"
                      value={merchantData.receiptNumber}
                      onChange={(e) => handleMerchantChange('receiptNumber', e.target.value)}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} startIcon={<CancelIcon />} disabled={isLoading}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          startIcon={<SaveIcon />}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditExpenseDialog;
