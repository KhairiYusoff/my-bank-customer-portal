import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Slider,
} from "@mui/material";
import {
  FilterList as FilterIcon,
} from "@mui/icons-material";
import type { ExpenseCategory, PaymentMethod } from "../../types/expense";
import type { Account } from "@/features/accounts/types/account";

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  filters: any;
  setFilters: (filters: any) => void;
  categories: ExpenseCategory[];
  paymentMethods: PaymentMethod[];
  accounts: Account[];
}

const FilterDialog: React.FC<FilterDialogProps> = ({
  open,
  onClose,
  filters,
  setFilters,
  categories,
  paymentMethods,
  accounts,
}) => {
  const handleReset = () => {
    setFilters({
      search: '',
      category: '',
      paymentMethod: '',
      account: '',
      dateFrom: '',
      dateTo: '',
      minAmount: 0,
      maxAmount: 10000,
      sortBy: 'date',
      sortOrder: 'desc',
    });
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 }
      }}
    >
      <DialogTitle sx={{ 
        backgroundColor: 'rgba(0, 80, 158, 0.05)',
        borderBottom: 1,
        borderColor: 'divider',
        pb: 2
      }}>
        <Box display="flex" alignItems="center">
          <FilterIcon sx={{ mr: 2, color: '#00509e' }} />
          <Typography variant="h6" sx={{ color: '#00509e', fontWeight: 600 }}>
            Advanced Filters
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Date Range */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom sx={{ color: '#00509e', fontWeight: 600 }}>
              Date Range
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="From Date"
                  type="date"
                  fullWidth
                  size="small"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="To Date"
                  type="date"
                  fullWidth
                  size="small"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Payment Method and Account */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom sx={{ color: '#00509e', fontWeight: 600 }}>
              Filters
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Payment Method</InputLabel>
                  <Select
                    value={filters.paymentMethod}
                    label="Payment Method"
                    onChange={(e) => setFilters({...filters, paymentMethod: e.target.value})}
                  >
                    <MenuItem value="">All Methods</MenuItem>
                    {paymentMethods.map((method) => (
                      <MenuItem key={method.value} value={method.value}>
                        {method.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Account</InputLabel>
                  <Select
                    value={filters.account}
                    label="Account"
                    onChange={(e) => setFilters({...filters, account: e.target.value})}
                  >
                    <MenuItem value="">All Accounts</MenuItem>
                    {accounts.map((account) => (
                      <MenuItem key={account._id} value={account._id}>
                        {account.accountNumber}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          {/* Amount Range */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom sx={{ color: '#00509e', fontWeight: 600 }}>
              Amount Range: RM{filters.minAmount} - RM{filters.maxAmount}
            </Typography>
            <Box sx={{ px: 2 }}>
              <Slider
                value={[filters.minAmount, filters.maxAmount]}
                onChange={(e, newValue) => {
                  const valueArray = Array.isArray(newValue) ? newValue : [newValue, newValue];
                  setFilters({...filters, minAmount: valueArray[0], maxAmount: valueArray[1]});
                }}
                valueLabelDisplay="auto"
                min={0}
                max={10000}
                step={100}
                marks={[
                  { value: 0, label: 'RM0' },
                  { value: 2500, label: 'RM2.5K' },
                  { value: 5000, label: 'RM5K' },
                  { value: 7500, label: 'RM7.5K' },
                  { value: 10000, label: 'RM10K' },
                ]}
                sx={{
                  color: '#00509e',
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#00509e',
                  },
                }}
              />
            </Box>
          </Grid>

          {/* Sort Options */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom sx={{ color: '#00509e', fontWeight: 600 }}>
              Sort Options
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={filters.sortBy}
                    label="Sort By"
                    onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                  >
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="amount">Amount</MenuItem>
                    <MenuItem value="category">Category</MenuItem>
                    <MenuItem value="description">Description</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Sort Order</InputLabel>
                  <Select
                    value={filters.sortOrder}
                    label="Sort Order"
                    onChange={(e) => setFilters({...filters, sortOrder: e.target.value})}
                  >
                    <MenuItem value="desc">Newest First</MenuItem>
                    <MenuItem value="asc">Oldest First</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleReset} variant="outlined" color="secondary">
          Reset
        </Button>
        <Button onClick={onClose} variant="contained" startIcon={<FilterIcon />}>
          Apply Filters
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterDialog;
