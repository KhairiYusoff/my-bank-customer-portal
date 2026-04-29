import React from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import { TableHeaderCell } from "../styles";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Receipt as ExpenseIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import type {
  ExpenseCategory,
  PaymentMethod,
  Expense,
  ExpenseFilters,
} from "../../types/expense";
import type { Account } from "@/features/accounts/types/account";

interface ListTabProps {
  categories: ExpenseCategory[];
  paymentMethods: PaymentMethod[];
  accounts: Account[];
  expenses: Expense[];
  filters: ExpenseFilters;
  setFilters: (filters: ExpenseFilters) => void;
  onFilterDialogOpen: () => void;
  isLoading: boolean;
  error: any;
  onViewExpense: (expenseId: string) => void;
  onEditExpense: (expenseId: string) => void;
  onDeleteExpense: (expenseId: string) => void;
}

const ListTab: React.FC<ListTabProps> = ({
  categories,
  paymentMethods,
  accounts,
  expenses,
  filters,
  setFilters,
  onFilterDialogOpen,
  isLoading,
  error,
  onViewExpense,
  onEditExpense,
  onDeleteExpense,
}) => {
  const isError = !!error;

  return (
    <Box sx={{ p: 3 }}>
      {/* Search and Filter Bar */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <TextField
          placeholder="Search expenses..."
          size="small"
          value={filters.search || ""}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          sx={{ minWidth: 250 }}
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
            ),
          }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            value={filters.category || ""}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
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
          <Select
            label="Sort By"
            value={filters.sortBy || "date"}
            onChange={(e) =>
              setFilters({
                ...filters,
                sortBy: e.target.value as
                  | "date"
                  | "amount"
                  | "category"
                  | undefined,
              })
            }
          >
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="amount">Amount</MenuItem>
            <MenuItem value="category">Category</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          startIcon={<FilterIcon />}
          onClick={onFilterDialogOpen}
        >
          More Filters
        </Button>
      </Box>

      {/* Data Table */}
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ borderRadius: 2 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Account</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isError ? (
              <TableRow>
                <TableCell colSpan={7} sx={{ textAlign: "center", py: 8 }}>
                  <Typography color="error">
                    Error loading expenses. Please try again.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : !expenses?.length ? (
              <TableRow>
                <TableCell colSpan={7} sx={{ textAlign: "center", py: 8 }}>
                  <Box>
                    <ExpenseIcon
                      sx={{ fontSize: 48, color: "text.secondary", mb: 2 }}
                    />
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      gutterBottom
                    >
                      No Expenses Found
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 3 }}
                    >
                      Start by creating your first expense using the Create
                      Expense tab.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              expenses.map((expense) => (
                <TableRow key={expense._id}>
                  <TableCell>
                    {new Date(expense.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>RM{expense.amount.toLocaleString()}</TableCell>
                  <TableCell>{expense.account.accountNumber}</TableCell>
                  <TableCell>
                    <Typography
                      component="span"
                      sx={{
                        color:
                          expense.status === "active"
                            ? "success.main"
                            : expense.status === "pending"
                              ? "warning.main"
                              : "error.main",
                        fontWeight: 600,
                      }}
                    >
                      {expense.status}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => onEditExpense(expense._id)}
                        color="primary"
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => onViewExpense(expense._id)}
                      >
                        View
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => onDeleteExpense(expense._id)}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListTab;
