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

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
  errors: null | string[];
  meta: any;
}
