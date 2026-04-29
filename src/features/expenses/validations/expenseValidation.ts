import * as yup from "yup";

export type ExpenseFormData = {
  amount: number;
  category: string;
  subCategory?: string;
  description: string;
  date: string;
  paymentMethod: string;
  account: string;
  notes?: string;
  tags?: string[];
  merchant?: {
    name?: string;
    location?: string;
    receiptNumber?: string;
  };
};

export const expenseSchema = yup.object().shape({
  amount: yup
    .number()
    .typeError("Amount must be a valid number")
    .min(0.01, "Amount must be greater than 0")
    .max(999999.99, "Amount cannot exceed 999,999.99")
    .test("valid-format", "Amount must be a valid positive number", (value) => {
      if (value === undefined || value === null || isNaN(value)) return false;
      // Check if it's a finite number and greater than 0
      return Number.isFinite(value) && value > 0;
    })
    .required("Amount is required"),
  category: yup.string().required("Category is required").trim(),
  subCategory: yup.string().optional().nullable().trim(),
  description: yup
    .string()
    .min(2, "Description must be at least 2 characters")
    .max(200, "Description cannot exceed 200 characters")
    .required("Description is required")
    .trim(),
  date: yup.string().required("Date is required").trim(),
  paymentMethod: yup.string().required("Payment method is required").trim(),
  account: yup.string().required("Account is required").trim(),
  notes: yup
    .string()
    .max(500, "Notes cannot exceed 500 characters")
    .optional()
    .nullable()
    .trim(),
  tags: yup
    .array()
    .of(yup.string().max(30, "Each tag cannot exceed 30 characters"))
    .max(10, "Maximum 10 tags allowed")
    .optional()
    .nullable(),
  merchant: yup
    .object({
      name: yup
        .string()
        .max(100, "Merchant name cannot exceed 100 characters")
        .optional()
        .nullable()
        .trim(),
      location: yup
        .string()
        .max(200, "Location cannot exceed 200 characters")
        .optional()
        .nullable()
        .trim(),
      receiptNumber: yup
        .string()
        .max(50, "Receipt number cannot exceed 50 characters")
        .optional()
        .nullable()
        .trim(),
    })
    .optional()
    .nullable()
    .default(null),
});

export const getExpenseDefaultValues = (): ExpenseFormData => ({
  amount: undefined as unknown as number,
  category: "",
  subCategory: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
  paymentMethod: "",
  account: "",
  notes: "",
  tags: [],
  merchant: {
    name: "",
    location: "",
    receiptNumber: "",
  },
});
