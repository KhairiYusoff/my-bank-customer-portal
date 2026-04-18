import type {
  UserProfile,
  UpdateProfileRequest,
  MaritalStatus,
  EducationLevel,
  ResidencyStatus,
  EmploymentType,
  SalaryRange,
  AccountType,
  PurposeOfAccount,
  NextOfKinRelationship,
} from "@/features/profile/types/profile";

export function mapUserProfileToUpdateProfile(
  user?: UserProfile
): UpdateProfileRequest {
  if (!user) return {};
  return {
    name: user.name,
    phoneNumber: user.phoneNumber,
    identityNumber: user.identityNumber,
    dateOfBirth: user.dateOfBirth?.slice(0, 10),
    age: user.age,
    nationality: user.nationality,
    maritalStatus: user.maritalStatus as MaritalStatus,
    educationLevel: user.educationLevel as EducationLevel,
    residencyStatus: user.residencyStatus as ResidencyStatus,
    job: user.job,
    employerName: user.employerName,
    employmentType: user.employmentType as EmploymentType,
    salary: user.salary as SalaryRange,
    accountType: user.accountType as AccountType,
    purposeOfAccount: user.purposeOfAccount as PurposeOfAccount,
    address: user.address,
    preferences: user.preferences,
    nextOfKin: user.nextOfKin
      ? {
          ...user.nextOfKin,
          relationship: user.nextOfKin.relationship as NextOfKinRelationship,
        }
      : undefined,
  };
}

export function buildViewDataMap(
  user: UserProfile
): Record<string, Record<string, string | undefined>> {
  return {
    personal: {
      Name: user.name,
      Email: user.email,
      "Phone Number": user.phoneNumber,
      "Identity Number": user.identityNumber,
      "Date of Birth": user.dateOfBirth?.slice(0, 10),
      Age: user.age?.toString(),
      Nationality: user.nationality,
      "Marital Status": user.maritalStatus,
      "Education Level": user.educationLevel,
      "Residency Status": user.residencyStatus,
    },
    address: {
      Street: user.address?.street,
      City: user.address?.city,
      State: user.address?.state,
      "Postal Code": user.address?.postalCode,
    },
    employment: {
      Job: user.job,
      "Employer Name": user.employerName,
      "Employment Type": user.employmentType,
      Salary: user.salary,
    },
    account: {
      "Account Type": user.accountType,
      "Purpose of Account": user.purposeOfAccount,
      "Application Status": user.applicationStatus,
      "Is Verified": user.isVerified ? "Yes" : undefined,
      "Profile Complete": user.isProfileComplete ? "Yes" : undefined,
      Role: user.role,
    },
    nextofkin: {
      Name: user.nextOfKin?.name,
      Phone: user.nextOfKin?.phone,
      Relationship: user.nextOfKin?.relationship,
    },
    preferences: {
      Theme: user.preferences?.theme,
      Language: user.preferences?.language,
      Notifications: user.preferences?.notifications ? "Enabled" : undefined,
    },
  };
}
