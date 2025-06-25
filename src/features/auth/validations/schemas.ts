import * as yup from 'yup';

// Define form data types
export type ApplicationFormData = {
  name: string;
  email: string;
  phoneNumber: string;
};

export const applicationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  phoneNumber: yup
    .string()
    .matches(
      /^\+?[0-9\s-]{10,20}$/,
      'Please enter a valid phone number (e.g., +60123456789)'
    )
    .required('Phone number is required'),
}) as yup.ObjectSchema<ApplicationFormData>;

export type LoginFormData = {
  email: string;
  password: string;
};

export const loginSchema = yup.object<LoginFormData>().shape({
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required')
    .trim()
    .transform((value: string) => value.toLowerCase()),
  password: yup.string().required('Password is required'),
});

// Register extends ApplicationFormData with password fields
export type RegisterFormData = ApplicationFormData & {
  password: string;
  confirmPassword: string;
};

export const registerSchema = yup.object<RegisterFormData>().shape({
  name: yup.string().required('Full name is required').trim(),
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required')
    .trim()
    .transform((value: string) => value.toLowerCase()),
  phoneNumber: yup
    .string()
    .matches(
      /^\+?[0-9\s-]+$/,
      'Phone number can only contain numbers, spaces, and hyphens'
    )
    .required('Phone number is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

// Additional form types
export type ForgotPasswordFormData = {
  email: string;
};

export const forgotPasswordSchema = yup.object<ForgotPasswordFormData>().shape({
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required')
    .trim()
    .transform((value: string) => value.toLowerCase()),
});

// Reset password form data
export type ResetPasswordFormData = {
  password: string;
  confirmPassword: string;
};

export const resetPasswordSchema = yup.object<ResetPasswordFormData>().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

// Export all schemas as a single object for easy importing
export const authSchemas = {
  application: applicationSchema,
  login: loginSchema,
  register: registerSchema,
  forgotPassword: forgotPasswordSchema,
  resetPassword: resetPasswordSchema,
} as const;

// Helper type for form validation
export type InferType<T> = T extends yup.ObjectSchema<infer U> ? U : never;

export type AuthValidationType = keyof typeof authSchemas;
