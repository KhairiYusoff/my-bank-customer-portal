import * as yup from "yup";

// Define form data types
export type ApplicationFormData = {
  name: string;
  email: string;
  phoneNumber: string;
};

export const applicationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(
      /^\+?[0-9\s-]{10,20}$/,
      "Please enter a valid phone number (e.g., +60123456789)"
    )
    .required("Phone number is required"),
}) as yup.ObjectSchema<ApplicationFormData>;

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

// Register extends ApplicationFormData with password fields
export type RegisterFormData = ApplicationFormData & {
  password: string;
  confirmPassword: string;
};

export const registerSchema = yup.object<RegisterFormData>().shape({
  name: yup.string().required("Full name is required").trim(),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .trim()
    .transform((value: string) => value.toLowerCase()),
  phoneNumber: yup
    .string()
    .matches(
      /^\+?[0-9\s-]+$/,
      "Phone number can only contain numbers, spaces, and hyphens"
    )
    .required("Phone number is required"),
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

export type CompleteProfileFormData = {
  // Personal Information
  password: string;
  confirmPassword: string;
  identityNumber: string;
  dateOfBirth: Date | null;
  age: number;
  nationality: string;
  maritalStatus: "single" | "married" | "divorced" | "widowed";
  educationLevel:
    | "none"
    | "primary"
    | "secondary"
    | "diploma"
    | "degree"
    | "postgraduate";
  residencyStatus: "citizen" | "permanent resident" | "foreigner";

  // Address
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };

  // Employment & Financial
  job: string;
  employerName: string;
  employmentType:
    | "salaried"
    | "self-employed"
    | "unemployed"
    | "retired"
    | "student";
  salary:
    | "<1000"
    | "1000-2999"
    | "3000-4999"
    | "5000-6999"
    | "7000-9999"
    | "10000+";
  accountType: "savings" | "current" | "fixed deposit";
  purposeOfAccount:
    | "savings"
    | "salary credit"
    | "investment"
    | "business"
    | "education"
    | "travel"
    | "other";

  // Next of Kin
  nextOfKin: {
    name: string;
    phone: string;
    relationship:
      | "parent"
      | "spouse"
      | "child"
      | "sibling"
      | "relative"
      | "friend"
      | "other";
  };
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

export const completeProfileSchema = yup
  .object<CompleteProfileFormData>()
  .shape({
    // Personal Information
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
    identityNumber: yup
      .string()
      .required("Identity number is required")
      .matches(/^\d{12}$/, "Must be a valid 12-digit identity number"),
    dateOfBirth: yup
      .date()
      .required("Date of birth is required")
      .max(new Date(), "Date of birth cannot be in the future")
      .test("age", "You must be at least 18 years old", function (value) {
        if (!value) return false;
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        return age >= 18;
      }),
    age: yup
      .number()
      .required("Age is required")
      .min(18, "You must be at least 18 years old")
      .max(100, "Please enter a valid age"),
    nationality: yup.string().required("Nationality is required"),
    maritalStatus: yup
      .string()
      .oneOf(
        ["single", "married", "divorced", "widowed"],
        "Invalid marital status"
      )
      .required("Marital status is required"),
    educationLevel: yup
      .string()
      .oneOf(
        ["none", "primary", "secondary", "diploma", "degree", "postgraduate"],
        "Invalid education level"
      )
      .required("Education level is required"),
    residencyStatus: yup
      .string()
      .oneOf(
        ["citizen", "permanent resident", "foreigner"],
        "Invalid residency status"
      )
      .required("Residency status is required"),

    // Address
    address: yup.object().shape({
      street: yup.string().required("Street address is required"),
      city: yup.string().required("City is required"),
      state: yup.string().required("State is required"),
      postalCode: yup.string().required("Postal code is required"),
    }),

    // Employment & Financial
    job: yup.string().required("Job title is required"),
    employerName: yup.string().required("Employer name is required"),
    employmentType: yup
      .string()
      .oneOf(
        ["salaried", "self-employed", "unemployed", "retired", "student"],
        "Invalid employment type"
      )
      .required("Employment type is required"),
    salary: yup
      .string()
      .oneOf(
        ["<1000", "1000-2999", "3000-4999", "5000-6999", "7000-9999", "10000+"],
        "Please select a salary range"
      )
      .required("Salary range is required"),
    accountType: yup
      .string()
      .oneOf(["savings", "current", "fixed deposit"], "Invalid account type")
      .required("Account type is required"),
    purposeOfAccount: yup
      .string()
      .oneOf(
        [
          "savings",
          "salary credit",
          "investment",
          "business",
          "education",
          "travel",
          "other",
        ],
        "Please select a purpose"
      )
      .required("Purpose of account is required"),

    // Next of Kin
    nextOfKin: yup.object().shape({
      name: yup.string().required("Next of kin's name is required"),
      phone: yup
        .string()
        .required("Next of kin's phone number is required")
        .matches(
          /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,15}$/,
          "Please enter a valid phone number"
        ),
      relationship: yup
        .string()
        .oneOf(
          [
            "parent",
            "spouse",
            "child",
            "sibling",
            "relative",
            "friend",
            "other",
          ],
          "Please specify your relationship to this person"
        )
        .required("Relationship is required"),
    }),
  });

// Export all schemas as a single object for easy importing
export const authSchemas = {
  application: applicationSchema,
  login: loginSchema,
  register: registerSchema,
  forgotPassword: forgotPasswordSchema,
  resetPassword: resetPasswordSchema,
  completeProfile: completeProfileSchema,
} as const;

// Helper type for form validation
export type InferType<T> = T extends yup.ObjectSchema<infer U> ? U : never;

export type AuthValidationType = keyof typeof authSchemas;
