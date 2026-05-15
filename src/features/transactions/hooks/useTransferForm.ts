import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetAccountsQuery } from "@/features/accounts/store/accountsApi";
import { useTransferMutation } from "../store/transactionsApi";
import { useToast } from "@/utils/snackbarUtils";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { notificationsApi } from "@/features/notifications/store/notificationsApi";
import {
  ITransferForm,
  transferSchema,
} from "../validations/transferValidation";

const defaultValues: ITransferForm = {
  fromAccountNumber: "",
  toAccountNumber: "",
  amount: "" as unknown as number,
};

export const useTransferForm = () => {
  const [transfer, { isLoading, isSuccess, error, reset: resetMutation }] =
    useTransferMutation();
  const {
    data: accountsData,
    isFetching: isFetchingAccounts,
    error: accountsError,
  } = useGetAccountsQuery();
  const toast = useToast();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [transferData, setTransferData] = useState<ITransferForm | null>(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ITransferForm>({
    resolver: yupResolver(transferSchema),
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    if (isSuccess && user) {
      toast.success("Transfer successful!");
      reset(defaultValues);
      resetMutation();
      setTransferData(null);
      dispatch(notificationsApi.util.invalidateTags(["Notification"]));
    }
    if (error) {
      const apiError = error as any;
      toast.error(apiError.data?.message || "Transfer failed.");
    }
  }, [isSuccess, error, reset, resetMutation, toast, user, dispatch]);

  const onSubmit = (values: ITransferForm) => {
    setTransferData(values);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setTransferData(null);
  };

  const handleConfirmTransfer = () => {
    if (transferData) {
      transfer({ ...transferData, amount: Number(transferData.amount) });
      setOpenConfirm(false);
      // Note: transferData is NOT cleared here — kept alive so useEffect can read it if needed
    }
  };

  return {
    control,
    register,
    handleSubmit,
    errors,
    isDirty,
    isValid,
    isLoading,
    isFetchingAccounts,
    accountsError,
    accounts: accountsData?.data || [],
    openConfirm,
    transferData,
    onSubmit,
    handleCloseConfirm,
    handleConfirmTransfer,
  };
};
