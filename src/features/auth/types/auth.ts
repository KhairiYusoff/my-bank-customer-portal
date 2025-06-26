import { BaseResponse } from "@/types/api";

export interface CompleteProfileFormData {
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
}

export interface CompleteProfileRequest
  extends Omit<CompleteProfileFormData, "dateOfBirth" | "confirmPassword"> {
  dateOfBirth: string; // ISO date string for the API
}

export interface CompleteProfileResponseData {
  userId: string;
  message: string;
  nextSteps: string[];
}

export type CompleteProfileResponse = BaseResponse<CompleteProfileResponseData>;

export interface ApplyRequest {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface ApplyResponseData {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  isVerified: boolean;
  applicationStatus: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
}

export interface LoginResponseData {
  user: User;
}

export type LoginResponse = BaseResponse<LoginResponseData>;

export type ApplyResponse = BaseResponse<ApplyResponseData>;

export interface ValidationError {
  type: string;
  msg: string;
  path: string;
  location: string;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]> | ValidationError[];
  statusCode?: number;
}
