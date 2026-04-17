import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetAccountsQuery, useWithdrawMutation } from "../store/accountsApi";
import { useToast } from "@/utils/snackbarUtils";
import { useAppSelector } from "@/app/hooks";
import { notificationService } from "@/features/notifications/services/notificationService";
import { withdrawSchema, type IWithdrawForm } from "../validations/accountValidation";

export const useWithdrawForm = () => {
  const { data: accountsResponse, isLoading: isLoadingAccounts } = useGetAccountsQuery();
  const [withdraw, { isLoading, isSuccess, isError, error, reset: resetMutation }] = useWithdrawMutation();
  const toast = useToast();
  const user = useAppSelector((state) => state.auth.user);
  const [withdrawData, setWithdrawData] = useState<IWithdrawForm | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<IWithdrawForm>({
    resolver: yupResolver(withdrawSchema),
    mode: "onChange",
    defaultValues: { accountNumber: "", amount: 0 },
  });

  useEffect(() => {
    if (isSuccess && withdrawData && user) {
      toast.success("Withdrawal successful!");

      notificationService.createTransactionNotification({
        userId: user.id,
        type: "withdraw",
        amount: withdrawData.amount,
        accountNumber: withdrawData.accountNumber,
      }).catch(console.error);

      reset();
      resetMutation();
      setWithdrawData(null);
    }
    if (isError) {
      const apiError = error as any;
      toast.error(apiError.data?.message || "Withdrawal failed.");
    }
  }, [isSuccess, isError, error, reset, resetMutation, toast, withdrawData, user]);

  const onSubmit = (data: IWithdrawForm) => {
    setWithdrawData(data);
    withdraw(data);
  };

  return {
    control,
    handleSubmit,
    errors,
    isDirty,
    isValid,
    isLoading,
    isLoadingAccounts,
    accountsResponse,
    onSubmit,
  };
};
