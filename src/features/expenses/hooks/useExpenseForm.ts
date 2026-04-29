import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  expenseSchema,
  getExpenseDefaultValues,
} from "../validations/expenseValidation";
import type { FormValues } from "../components/expense-form";

export const useExpenseForm = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [expenseData, setExpenseData] = useState<FormValues | null>(null);

  // Form hooks
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid, errors },
  } = useForm<FormValues>({
    resolver: yupResolver(expenseSchema as any),
    mode: "onTouched",
    defaultValues: getExpenseDefaultValues(),
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

  const resetForm = () => {
    reset(getExpenseDefaultValues());
  };

  return {
    // Form state
    control,
    handleSubmit,
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
    resetForm,
  };
};
