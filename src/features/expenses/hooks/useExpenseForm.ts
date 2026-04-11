import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { expenseSchema } from "../validations/expenseValidation";
import type { FormValues } from "../components/expense-form";

export const useExpenseForm = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [expenseData, setExpenseData] = useState<FormValues | null>(null);

  // Form hooks
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isDirty, isValid, errors },
  } = useForm<FormValues>({
    resolver: yupResolver(expenseSchema as any),
    mode: "onChange",
    defaultValues: {
      amount: undefined,
      date: new Date().toISOString().split('T')[0],
      category: "",
      subCategory: "",
      description: "",
      merchant: {
        name: "",
        location: "",
        receiptNumber: "",
      },
    },
  });

  const onSubmit = (values: FormValues) => {
    setExpenseData(values);
    setOpenConfirm(true);
  };

  const onCancel = () => {
    setOpenConfirm(false);
    setExpenseData(null);
  };

  const onCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return {
    // Form state
    control,
    register,
    handleSubmit,
    watch,
    reset,
    isDirty,
    isValid,
    errors,
    
    // Dialog state
    openConfirm,
    expenseData,
    
    // Actions
    onSubmit,
    onCancel,
    onCloseConfirm,
  };
};
