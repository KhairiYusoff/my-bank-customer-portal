import * as yup from 'yup';
import type {
  MaritalStatus as MaritalStatusType,
  EducationLevel as EducationLevelType,
  ResidencyStatus as ResidencyStatusType,
  EmploymentType as EmploymentTypeType,
  SalaryRange as SalaryRangeType,
  AccountType as AccountTypeType,
  PurposeOfAccount as PurposeOfAccountType,
  NextOfKinRelationship as NextOfKinRelationshipType,
  UpdateProfileRequest
} from '@features/dashboard/types/profile';
// Import enums as values
import * as ProfileEnums from '@features/dashboard/types/profile';

export const profileFormSchema = yup.object({
  name: yup.string().min(2).max(100).optional(),
  phoneNumber: yup.string().min(7).max(20).optional(),
  identityNumber: yup.string().max(30).optional(),
  dateOfBirth: yup.string().optional(),
  age: yup.number().min(18).max(100).optional(),
  nationality: yup.string().optional(),
  maritalStatus: yup.mixed<MaritalStatusType>().oneOf(["single", "married", "divorced", "widowed"]).optional(),
  educationLevel: yup.mixed<EducationLevelType>().oneOf(["none", "primary", "secondary", "diploma", "degree", "postgraduate"]).optional(),
  residencyStatus: yup.mixed<ResidencyStatusType>().oneOf(["citizen", "permanent resident", "foreigner"]).optional(),
  job: yup.string().optional(),
  employerName: yup.string().optional(),
  employmentType: yup.mixed<EmploymentTypeType>().oneOf(["salaried", "self-employed", "unemployed", "retired", "student"]).optional(),
  salary: yup.mixed<SalaryRangeType>().oneOf(["<1000", "1000-2999", "3000-4999", "5000-6999", "7000-9999", "10000+"]).optional(),
  accountType: yup.mixed<AccountTypeType>().oneOf(["savings", "current", "fixed deposit"]).optional(),
  purposeOfAccount: yup.mixed<PurposeOfAccountType>().oneOf(["savings", "salary credit", "investment", "business", "education", "travel", "others"]).optional(),
  address: yup.object({
    street: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    postalCode: yup.string().required(),
  }).optional(),
  preferences: yup.object({
    theme: yup.string().optional(),
    language: yup.string().optional(),
    notifications: yup.boolean().optional(),
  }).optional(),
  nextOfKin: yup.object({
    name: yup.string().required(),
    phone: yup.string().required(),
    relationship: yup.mixed<NextOfKinRelationshipType>().oneOf(["parent", "spouse", "child", "sibling", "relative", "friend", "other"]).required(),
  }).optional(),
}) as yup.ObjectSchema<UpdateProfileRequest>;
