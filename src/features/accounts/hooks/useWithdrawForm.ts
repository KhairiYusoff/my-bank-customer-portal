import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetAccountsQuery, useWithdrawMutation } from "../store/accountsApi";
import { useToast } from "@/utils/snackbarUtils";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { notificationsApi } from "@/features/notifications/store/notificationsApi";
import {
  withdrawSchema,
  type IWithdrawForm,
} from "../validations/accountValidation";

export const useWithdrawForm = () => {
  const {
    data: accountsResponse,
    isLoading: isLoadingAccounts,
    isFetching: isFetchingAccounts,
  } = useGetAccountsQuery();
  const [
    withdraw,
    { isLoading, isSuccess, isError, error, reset: resetMutation },
  ] = useWithdrawMutation();
  const toast = useToast();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [withdrawData, setWithdrawData] = useState<IWithdrawForm | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<IWithdrawForm>({
    resolver: yupResolver(withdrawSchema) as any,
    mode: "onChange",
    defaultValues: { accountNumber: "", amount: "" },
  });

  useEffect(() => {
    if (isSuccess && withdrawData && user) {
      toast.success("Withdrawal successful!");

      dispatch(notificationsApi.util.invalidateTags(["Notification"]));

      reset({ accountNumber: "", amount: "" });
      resetMutation();
      setWithdrawData(null);
    }
    if (isError) {
      const apiError = error as any;
      toast.error(apiError.data?.message || "Withdrawal failed.");
    }
  }, [
    isSuccess,
    isError,
    error,
    reset,
    resetMutation,
    dispatch,
    withdrawData,
    user,
  ]);

  const onSubmit = (data: IWithdrawForm) => {
    const payload = { ...data, amount: Number(data.amount) };
    setWithdrawData(payload);
    withdraw(payload);
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
