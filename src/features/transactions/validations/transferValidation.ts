import * as yup from "yup";

export interface ITransferForm {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number | "";
  memo?: string;
}

export const transferSchema: yup.ObjectSchema<ITransferForm> = yup
  .object()
  .shape({
    fromAccountNumber: yup.string().required("From Account Number is required"),
    toAccountNumber: yup.string().required("To Account Number is required"),
    amount: yup
      .number()
      .typeError("Amount must be a number")
      .positive("Amount must be positive")
      .required("Amount is required"),
    memo: yup.string().max(255).optional(),
  });
