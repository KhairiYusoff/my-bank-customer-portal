import { useState } from "react";
import type { ExpenseFilters } from "../types/expense";

export const useExpenseFilters = () => {
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState<ExpenseFilters>({
    search: '',
    category: '',
    paymentMethod: '',
    dateFrom: '',
    dateTo: '',
    minAmount: 0,
    maxAmount: 10000,
    sortBy: 'date',
    sortOrder: 'desc',
  });

  const openFilterDialog = () => {
    setFilterDialogOpen(true);
  };

  const closeFilterDialog = () => {
    setFilterDialogOpen(false);
  };

  const updateFilters = (newFilters: Partial<ExpenseFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      paymentMethod: '',
      dateFrom: '',
      dateTo: '',
      minAmount: 0,
      maxAmount: 10000,
      sortBy: 'date',
      sortOrder: 'desc',
    });
  };

  return {
    filterDialogOpen,
    filters,
    openFilterDialog,
    closeFilterDialog,
    updateFilters,
    resetFilters,
  };
};
