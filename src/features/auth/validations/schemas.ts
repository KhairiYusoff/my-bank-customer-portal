import * as yup from "yup";

export type LoginFormData = {
  email: string;
  password: string;
};

export const loginSchema = yup.object<LoginFormData>().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .trim()
    .transform((value: string) => value.toLowerCase()),
  password: yup.string().required("Password is required"),
});

// Additional form types
export type ForgotPasswordFormData = {
  email: string;
  newPassword: string;
};

export const forgotPasswordSchema = yup.object<ForgotPasswordFormData>().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .trim()
    .transform((value: string) => value.toLowerCase()),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

// Reset password form data
export type ResetPasswordFormData = {
  password: string;
  confirmPassword: string;
};

export const resetPasswordSchema = yup.object<ResetPasswordFormData>().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

// Export all schemas as a single object for easy importing
export const authSchemas = {
  login: loginSchema,
  forgotPassword: forgotPasswordSchema,
  resetPassword: resetPasswordSchema,
} as const;

// Helper type for form validation
export type InferType<T> = T extends yup.ObjectSchema<infer U> ? U : never;

export type AuthValidationType = keyof typeof authSchemas;
