import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Paper,
  Avatar,
  Tabs,
  Tab,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
} from "@mui/material";
import {
  Receipt as ExpenseIcon,
  AccountBalance as AccountBalanceIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import DashboardLayout from "@/layouts/DashboardLayout";
import ExpenseForm, { FormValues } from "../components/ExpenseForm";
import { useGetAccountsQuery } from "@/features/accounts/store/accountsApi";
import { useGetCategoriesQuery, useGetPaymentMethodsQuery, useCreateExpenseMutation } from "../store/expensesApi";
import { expenseSchema } from "../validations/expenseValidation";
import { useToast } from "@/utils/snackbarUtils";
import { useAppSelector } from "@/app/hooks";
import { notificationService } from "@/features/notifications/services/notificationService";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`expense-tabpanel-${index}`}
      aria-labelledby={`expense-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const ExpensesPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
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
  const [createExpense, { isLoading, isSuccess, error, reset: resetMutation }] =
    useCreateExpenseMutation();
  const {
    data: accountsData,
    isLoading: isAccountsLoading,
    error: accountsError,
  } = useGetAccountsQuery();
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery();
  const {
    data: paymentMethodsData,
    isLoading: isPaymentMethodsLoading,
    error: paymentMethodsError,
  } = useGetPaymentMethodsQuery();
  const toast = useToast();
  const user = useAppSelector((state) => state.auth.user);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [expenseData, setExpenseData] = useState<FormValues | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(expenseSchema as any),
    mode: "onChange",
    defaultValues: {
      amount: undefined as any,
      category: "",
      subCategory: "",
      description: "",
      date: new Date().toISOString().split("T")[0], // Today's date
      paymentMethod: "",
      account: "",
      notes: "",
      tags: [],
      merchant: {
        name: "",
        location: "",
        receiptNumber: "",
      },
    },
  });

  // Show success notification
  useEffect(() => {
    if (isSuccess) {
      toast.success("Expense created successfully!");
      resetMutation();
      reset();
      setExpenseData(null);
      
      // Send notification
      if (user) {
        notificationService.createNotification({
          recipientId: user.id,
          recipientRole: "customer",
          title: "Expense Created",
          message: "Your expense has been recorded successfully.",
          type: "system",
        });
      }
    }
  }, [isSuccess, toast, resetMutation, reset, user]);

  // Handle API errors
  useEffect(() => {
    if (error) {
      const errorMessage = error as any;
      toast.error(errorMessage.data?.message || "Failed to create expense. Please try again.");
    }
  }, [error, toast]);

  const onSubmit = (values: FormValues) => {
    setExpenseData(values);
    setOpenConfirm(true);
  };

  const onConfirm = async () => {
    if (!expenseData) return;

    try {
      await createExpense(expenseData).unwrap();
      setOpenConfirm(false);
    } catch (error) {
      // Error is handled in the useEffect above
    }
  };

  const onCancel = () => {
    reset();
  };

  const onCloseConfirm = () => {
    setOpenConfirm(false);
    setExpenseData(null);
  };

  // Loading states
  const isLoadingData = isAccountsLoading || isCategoriesLoading || isPaymentMethodsLoading;
  const hasDataError = accountsError || categoriesError || paymentMethodsError;

  if (isLoadingData) {
    return (
      <DashboardLayout>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <Box textAlign="center">
              <CircularProgress size={60} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Loading expense data...
              </Typography>
            </Box>
          </Box>
        </Container>
      </DashboardLayout>
    );
  }

  if (hasDataError) {
    return (
      <DashboardLayout>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <Alert severity="error" sx={{ width: "100%" }}>
              Failed to load expense data. Please refresh the page and try again.
            </Alert>
          </Box>
        </Container>
      </DashboardLayout>
    );
  }

  const accounts = accountsData?.data || [];
  const categories = categoriesData?.data || [];
  const paymentMethods = paymentMethodsData?.data || [];

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box display="flex" alignItems="center" mb={3}>
            <Avatar sx={{ bgcolor: "primary.main", mr: 3, width: 56, height: 56 }}>
              <ExpenseIcon sx={{ fontSize: 28 }} />
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                Expense Management
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Track, manage, and analyze your expenses efficiently
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Tabs */}
        <Paper 
          sx={{ 
            borderRadius: 3, 
            boxShadow: '0 8px 32px rgba(0, 80, 158, 0.08)',
            overflow: 'hidden'
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              backgroundColor: 'rgba(0, 80, 158, 0.02)',
              '& .MuiTab-root': {
                minHeight: 64,
                fontSize: '0.95rem',
                fontWeight: 500,
                textTransform: 'none',
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: '#00509e',
                  fontWeight: 600,
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#00509e',
                height: 3,
              },
            }}
          >
            <Tab 
              icon={<ExpenseIcon sx={{ mr: 1 }} />} 
              label="Create Expense" 
              iconPosition="start"
            />
            <Tab 
              icon={<FilterIcon sx={{ mr: 1 }} />} 
              label="Expense List" 
              iconPosition="start"
            />
            <Tab 
              icon={<SearchIcon sx={{ mr: 1 }} />} 
              label="Analytics" 
              iconPosition="start"
              disabled
            />
          </Tabs>

          {/* Tab Panels */}
          <Box sx={{ p: 0 }}>
            <TabPanel value={tabValue} index={0}>
              {accounts.length === 0 ? (
                <Card elevation={0} sx={{ textAlign: "center", py: 8 }}>
                  <AccountBalanceIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    No Accounts Available
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    You need at least one account to create expenses. Contact support to open an account.
                  </Typography>
                  <Button variant="contained" href="/contact-us">
                    Contact Support
                  </Button>
                </Card>
              ) : (
                <ExpenseForm
                  accounts={accounts}
                  categories={categories}
                  paymentMethods={paymentMethods}
                  isLoading={isLoading}
                  isDirty={isDirty}
                  isValid={isValid}
                  openConfirm={openConfirm}
                  expenseData={expenseData}
                  control={control}
                  register={register}
                  handleSubmit={handleSubmit}
                  watch={watch}
                  errors={{}}
                  onSubmit={onSubmit}
                  onConfirm={onConfirm}
                  onCancel={onCancel}
                  onCloseConfirm={onCloseConfirm}
                />
              )}
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Box sx={{ p: 3 }}>
                {/* Search and Filter Bar */}
                <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                  <TextField
                    placeholder="Search expenses..."
                    size="small"
                    sx={{ minWidth: 250 }}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>Category</InputLabel>
                    <Select label="Category">
                      <MenuItem value="">All Categories</MenuItem>
                      {categories.map((cat) => (
                        <MenuItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select label="Sort By">
                      <MenuItem value="date">Date</MenuItem>
                      <MenuItem value="amount">Amount</MenuItem>
                      <MenuItem value="category">Category</MenuItem>
                    </Select>
                  </FormControl>
                  <Button 
                    variant="outlined" 
                    startIcon={<FilterIcon />}
                    onClick={() => setFilterDialogOpen(true)}
                  >
                    More Filters
                  </Button>
                </Box>

                {/* Data Table */}
                <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                  <Table>
                    <TableHead sx={{ backgroundColor: 'rgba(0, 80, 158, 0.05)' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: '#00509e' }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#00509e' }}>Description</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#00509e' }}>Category</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#00509e' }}>Amount</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#00509e' }}>Account</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#00509e' }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#00509e' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* Placeholder data - will be replaced with API data */}
                      <TableRow>
                        <TableCell colSpan={7} sx={{ textAlign: 'center', py: 8 }}>
                          <Box>
                            <ExpenseIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                              No Expenses Found
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                              Start by creating your first expense using the Create Expense tab.
                            </Typography>
                            <Button 
                              variant="contained" 
                              onClick={() => setTabValue(0)}
                              startIcon={<ExpenseIcon />}
                            >
                              Create Your First Expense
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Box sx={{ p: 3, textAlign: 'center', py: 8 }}>
                <SearchIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Analytics Coming Soon
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Advanced expense analytics and reporting features will be available here.
                </Typography>
              </Box>
            </TabPanel>
          </Box>
        </Paper>

        {/* Filter Dialog */}
        <Dialog 
          open={filterDialogOpen} 
          onClose={() => setFilterDialogOpen(false)}
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
            <Button 
              onClick={() => setFilterDialogOpen(false)}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                // Reset filters
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
              }}
              variant="outlined"
              color="secondary"
            >
              Reset
            </Button>
            <Button 
              onClick={() => setFilterDialogOpen(false)}
              variant="contained"
              startIcon={<FilterIcon />}
            >
              Apply Filters
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </DashboardLayout>
  );
};

export default ExpensesPage;
