export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface Preferences {
  theme: string;
  language: string;
  notifications: boolean;
}

export interface NextOfKin {
  name: string;
  phone: string;
  relationship: string;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  applicationStatus: string;
  isVerified: boolean;
  isProfileComplete: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  accountType: string;
  age: number;
  dateOfBirth: string;
  educationLevel: string;
  employerName: string;
  employmentType: string;
  identityNumber: string;
  job: string;
  maritalStatus: string;
  nationality: string;
  purposeOfAccount: string;
  residencyStatus: string;
  salary: string;
  status: string;
  address: Address;
  preferences: Preferences;
  nextOfKin: NextOfKin;
}

// Enums for dropdown fields
export type MaritalStatus = "single" | "married" | "divorced" | "widowed";
export type EducationLevel = "none" | "primary" | "secondary" | "diploma" | "degree" | "postgraduate";
export type ResidencyStatus = "citizen" | "permanent resident" | "foreigner";
export type EmploymentType = "salaried" | "self-employed" | "unemployed" | "retired" | "student";
export type SalaryRange = "<1000" | "1000-2999" | "3000-4999" | "5000-6999" | "7000-9999" | "10000+";
export type AccountType = "savings" | "current" | "fixed deposit";
export type PurposeOfAccount = "savings" | "salary credit" | "investment" | "business" | "education" | "travel" | "others";
export type NextOfKinRelationship = "parent" | "spouse" | "child" | "sibling" | "relative" | "friend" | "other";

// Editable fields only
export interface UpdateProfileRequest {
  name?: string;
  phoneNumber?: string;
  address?: Address;
  preferences?: Preferences;
  nextOfKin?: NextOfKin;
  identityNumber?: string;
  dateOfBirth?: string;
  age?: number;
  nationality?: string;
  maritalStatus?: MaritalStatus;
  educationLevel?: EducationLevel;
  residencyStatus?: ResidencyStatus;
  job?: string;
  employerName?: string;
  employmentType?: EmploymentType;
  salary?: SalaryRange;
  accountType?: AccountType;
  purposeOfAccount?: PurposeOfAccount;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
  errors?: string[] | null;
  meta?: any;
}

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
  errors: null | string[];
  meta: any;
}
