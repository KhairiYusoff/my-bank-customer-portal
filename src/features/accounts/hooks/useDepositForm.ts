import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetAccountsQuery, useDepositMutation } from "../store/accountsApi";
import { useToast } from "@/utils/snackbarUtils";
import { useAppSelector } from "@/app/hooks";
import { notificationService } from "@/features/notifications/services/notificationService";
import {
  depositSchema,
  type IDepositForm,
} from "../validations/accountValidation";

export const useDepositForm = () => {
  const {
    data: accountsResponse,
    isLoading: isLoadingAccounts,
    isFetching: isFetchingAccounts,
  } = useGetAccountsQuery();
  const [
    deposit,
    { isLoading, isSuccess, isError, error, reset: resetMutation },
  ] = useDepositMutation();
  const toast = useToast();
  const user = useAppSelector((state) => state.auth.user);
  const [depositData, setDepositData] = useState<IDepositForm | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<IDepositForm>({
    resolver: yupResolver(depositSchema),
    mode: "onChange",
    defaultValues: { accountNumber: "", amount: 0, description: "" },
  });

  useEffect(() => {
    if (isSuccess && depositData && user) {
      toast.success("Deposit successful!");

      notificationService
        .createTransactionNotification({
          userId: user.id,
          type: "deposit",
          amount: depositData.amount,
          accountNumber: depositData.accountNumber,
        })
        .catch(console.error);

      reset();
      resetMutation();
      setDepositData(null);
    }
    if (isError) {
      const apiError = error as any;
      toast.error(apiError.data?.message || "Deposit failed.");
    }
  }, [
    isSuccess,
    isError,
    error,
    reset,
    resetMutation,
    toast,
    depositData,
    user,
  ]);

  const onSubmit = (data: IDepositForm) => {
    setDepositData(data);
    deposit(data);
  };

  return {
    control,
    handleSubmit,
    errors,
    isDirty,
    isValid,
    isLoading,
    isLoadingAccounts,
    isFetchingAccounts,
    accountsResponse,
    onSubmit,
  };
};
