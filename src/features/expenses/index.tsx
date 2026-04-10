import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Receipt as ExpenseIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import DashboardLayout from "@/layouts/DashboardLayout";
import CreateTab from "./components/tabs/CreateTab";
import ListTab from "./components/tabs/ListTab";
import AnalyticsTab from "./components/tabs/AnalyticsTab";
import FilterDialog from "./components/dialogs/FilterDialog";
import { useExpenseFilters } from "./hooks/useExpenseFilters";
import { useExpenseForm } from "./hooks/useExpenseForm";
import { useExpenseActions } from "./hooks/useExpenseActions";

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
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const {
    filterDialogOpen,
    filters,
    openFilterDialog,
    closeFilterDialog,
    updateFilters,
    resetFilters,
  } = useExpenseFilters();

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    isDirty,
    isValid,
    openConfirm,
    expenseData,
    onSubmit,
    onCancel,
    onCloseConfirm,
    errors,
  } = useExpenseForm();

  const {
    accounts,
    categories,
    paymentMethods,
    isLoading,
    isSuccess,
    error,
    onConfirm,
  } = useExpenseActions(expenseData);

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
              <CreateTab
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
                errors={errors}
                onSubmit={onSubmit}
                onConfirm={onConfirm}
                onCancel={onCancel}
                onCloseConfirm={onCloseConfirm}
              />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <ListTab
                categories={categories}
                paymentMethods={paymentMethods}
                accounts={accounts}
                filters={filters}
                setFilters={updateFilters}
                onFilterDialogOpen={openFilterDialog}
              />
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <AnalyticsTab />
            </TabPanel>
          </Box>
        </Paper>

        {/* Filter Dialog */}
        <FilterDialog
          open={filterDialogOpen}
          onClose={closeFilterDialog}
          filters={filters}
          setFilters={updateFilters}
          categories={categories}
          paymentMethods={paymentMethods}
          accounts={accounts}
        />
      </Container>
    </DashboardLayout>
  );
};

export default ExpensesPage;
