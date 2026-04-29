import React, { useState } from "react";
import { Box, Container, Typography, Avatar, Tab } from "@mui/material";
import { ExpensesPaper, TabsContainer } from "./components/styles";
import {
  Receipt as ExpenseIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { LoadingOverlay } from "@/components";
import { usePageLoading } from "@/hooks";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  CreateTab,
  ListTab,
  AnalyticsTab,
  FilterDialog,
  ExpenseDetailsDialog,
  EditExpenseDialog,
  DeleteExpenseDialog,
} from "./components";
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
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const ExpensesPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(
    null,
  );
  const [editExpenseId, setEditExpenseId] = useState<string | null>(null);
  const [deleteExpenseId, setDeleteExpenseId] = useState<string | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleViewExpense = (expenseId: string) => {
    setSelectedExpenseId(expenseId);
  };

  const handleCloseExpenseDetails = () => {
    setSelectedExpenseId(null);
  };

  const handleEditExpense = (expenseId: string) => {
    setEditExpenseId(expenseId);
  };

  const handleCloseEditExpense = () => {
    setEditExpenseId(null);
  };

  const handleDeleteExpense = (expenseId: string) => {
    setDeleteExpenseId(expenseId);
  };

  const handleCloseDeleteExpense = () => {
    setDeleteExpenseId(null);
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
    expenses,
    singleExpense,
    editExpense,
    isLoading,
    isSuccess,
    error,
    isExpensesLoading,
    isSingleExpenseLoading,
    isEditExpenseLoading,
    expensesError,
    singleExpenseError,
    isUpdateExpenseLoading,
    updateExpenseError,
    isDeleteExpenseLoading,
    deleteExpenseError,
    onConfirm,
    onUpdateExpense,
    onDeleteExpense,
  } = useExpenseActions(
    expenseData,
    filters,
    selectedExpenseId || undefined,
    editExpenseId || undefined,
  );

  const pageLoading = usePageLoading(isExpensesLoading);

  const handleConfirm = async () => {
    const ok = await onConfirm();
    if (ok) onCloseConfirm();
  };

  return (
    <DashboardLayout>
      <LoadingOverlay loading={pageLoading} />
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box display="flex" alignItems="center" mb={3}>
            <Avatar
              sx={{ bgcolor: "primary.main", mr: 3, width: 56, height: 56 }}
            >
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
        <ExpensesPaper>
          <TabsContainer value={tabValue} onChange={handleTabChange}>
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
            />
          </TabsContainer>

          {/* Tab Panels */}
          <Box>
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
                onConfirm={handleConfirm}
                onCancel={onCancel}
                onCloseConfirm={onCloseConfirm}
              />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <ListTab
                categories={categories}
                paymentMethods={paymentMethods}
                accounts={accounts}
                expenses={expenses}
                filters={filters}
                setFilters={updateFilters}
                onFilterDialogOpen={openFilterDialog}
                isLoading={isExpensesLoading}
                error={expensesError}
                onViewExpense={handleViewExpense}
                onEditExpense={handleEditExpense}
                onDeleteExpense={handleDeleteExpense}
              />
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <AnalyticsTab />
            </TabPanel>
          </Box>
        </ExpensesPaper>

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

        {/* Expense Details Dialog */}
        <ExpenseDetailsDialog
          open={!!selectedExpenseId}
          onClose={handleCloseExpenseDetails}
          expense={singleExpense || null}
          isLoading={isSingleExpenseLoading}
          error={singleExpenseError}
        />

        <EditExpenseDialog
          open={!!editExpenseId}
          onClose={handleCloseEditExpense}
          expense={editExpense || null}
          isLoading={isEditExpenseLoading}
          error={updateExpenseError}
          onUpdateExpense={onUpdateExpense}
          categories={categories}
          paymentMethods={paymentMethods}
        />

        {/* Delete Expense Dialog */}
        <DeleteExpenseDialog
          open={!!deleteExpenseId}
          onClose={handleCloseDeleteExpense}
          expense={expenses.find((e) => e._id === deleteExpenseId) || null}
          isLoading={isDeleteExpenseLoading}
          error={deleteExpenseError}
          onDeleteExpense={onDeleteExpense}
        />
      </Container>
    </DashboardLayout>
  );
};

export default ExpensesPage;
