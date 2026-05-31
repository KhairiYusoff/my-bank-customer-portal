import * as yup from "yup";

export interface IDepositForm {
  accountNumber: string;
  amount: number | "";
  memo?: string;
}

export interface IWithdrawForm {
  accountNumber: string;
  amount: number | "";
}

export const depositSchema: yup.ObjectSchema<IDepositForm> = yup
  .object()
  .shape({
    accountNumber: yup.string().required("Account is required"),
    amount: yup
      .number()
      .typeError("Amount must be a number")
      .positive("Amount must be positive")
      .required("Amount is required"),
    memo: yup.string().max(255),
  });

export const withdrawSchema: yup.ObjectSchema<IWithdrawForm> = yup
  .object()
  .shape({
    accountNumber: yup.string().required("Account is required"),
    amount: yup
      .number()
      .typeError("Amount must be a number")
      .positive("Amount must be positive")
      .required("Amount is required"),
  });
