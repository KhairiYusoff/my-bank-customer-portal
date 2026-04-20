import { BaseResponse } from "@/types/api";

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

export type ApplyResponse = BaseResponse<ApplyResponseData>;

export interface CompleteProfileRequest {
  password: string;
  identityNumber: string;
  dateOfBirth: string; // ISO date string for the API
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
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
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

export interface CompleteProfileResponseData {
  userId: string;
  message: string;
  nextSteps: string[];
}

export type CompleteProfileResponse = BaseResponse<CompleteProfileResponseData>;
