import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetAccountsQuery, useDepositMutation } from "../store/accountsApi";
import { useToast } from "@/utils/snackbarUtils";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { notificationsApi } from "@/features/notifications/store/notificationsApi";
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
  const dispatch = useAppDispatch();
  const [depositData, setDepositData] = useState<IDepositForm | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<IDepositForm>({
    resolver: yupResolver(depositSchema) as any,
    mode: "onChange",
    defaultValues: {
      accountNumber: "",
      amount: "",
      memo: "",
    },
  });

  useEffect(() => {
    if (isSuccess && depositData && user) {
      toast.success("Deposit successful!");

      dispatch(notificationsApi.util.invalidateTags(["Notification"]));

      reset({
        accountNumber: "",
        amount: "",
        memo: "",
      });
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
    const payload = { ...data, amount: Number(data.amount) };
    setDepositData(payload);
    deposit(payload);
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
