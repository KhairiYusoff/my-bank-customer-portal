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

export interface IRequestAccountForm {
  accountType: "current" | "business" | "fixed_deposit";
  branch: string;
  amount: number | "";
  lockPeriod?: 1 | 3 | 6 | 12;
  linkedAccount?: string;
  companyRegistrationDoc?: string;
}

export const requestAccountSchema: yup.ObjectSchema<IRequestAccountForm> = yup
  .object()
  .shape({
    accountType: yup
      .string()
      .oneOf(["current", "business", "fixed_deposit"], "Invalid account type")
      .required("Account type is required"),
    branch: yup.string().required("Branch is required"),
    amount: yup
      .number()
      .typeError("Amount must be a number")
      .positive("Amount must be positive")
      .required("Amount is required"),
    lockPeriod: yup
      .number()
      .oneOf([1, 3, 6, 12], "Lock period must be 1, 3, 6, or 12 months")
      .when("accountType", {
        is: "fixed_deposit",
        then: (schema) => schema.required("Lock period is required for Fixed Deposit"),
        otherwise: (schema) => schema.optional(),
      }) as yup.Schema<1 | 3 | 6 | 12 | undefined>,
    linkedAccount: yup
      .string()
      .when("accountType", {
        is: "fixed_deposit",
        then: (schema) => schema.required("Linked account is required for Fixed Deposit"),
        otherwise: (schema) => schema.optional(),
      }),
    companyRegistrationDoc: yup
      .string()
      .when("accountType", {
        is: "business",
        then: (schema) => schema.required("Company registration document is required for Business Account"),
        otherwise: (schema) => schema.optional(),
      }),
  });
