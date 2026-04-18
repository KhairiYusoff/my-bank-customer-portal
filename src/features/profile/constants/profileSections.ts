import {
  Person as PersonIcon,
  Home as AddressIcon,
  Work as WorkIcon,
  AccountBalance as AccountIcon,
  Settings as SettingsIcon,
  ContactPhone as ContactIcon,
} from "@mui/icons-material";
import type { SvgIconComponent } from "@mui/icons-material";
import PersonalInfoForm from "../components/PersonalInfoForm";
import AddressForm from "../components/AddressForm";
import EmploymentForm from "../components/EmploymentForm";
import AccountDetailsForm from "../components/AccountDetailsForm";
import PreferencesForm from "../components/PreferencesForm";
import NextOfKinForm from "../components/NextOfKinForm";
import type { ProfileColorScheme } from "../components/styles";

export type { ProfileColorScheme };

export interface ProfileSectionConfig {
  id: string;
  title: string;
  IconComponent: SvgIconComponent;
  colorScheme: ProfileColorScheme;
  FormComponent: React.ComponentType<{ control: any; editMode: boolean }>;
}

export const profileSections: ProfileSectionConfig[] = [
  {
    id: "personal",
    title: "Personal Information",
    IconComponent: PersonIcon,
    colorScheme: "primary",
    FormComponent: PersonalInfoForm,
  },
  {
    id: "address",
    title: "Address",
    IconComponent: AddressIcon,
    colorScheme: "info",
    FormComponent: AddressForm,
  },
  {
    id: "employment",
    title: "Employment & Financial",
    IconComponent: WorkIcon,
    colorScheme: "success",
    FormComponent: EmploymentForm,
  },
  {
    id: "account",
    title: "Account Details",
    IconComponent: AccountIcon,
    colorScheme: "warning",
    FormComponent: AccountDetailsForm,
  },
  {
    id: "nextofkin",
    title: "Next of Kin",
    IconComponent: ContactIcon,
    colorScheme: "secondary",
    FormComponent: NextOfKinForm,
  },
  {
    id: "preferences",
    title: "Preferences",
    IconComponent: SettingsIcon,
    colorScheme: "primary",
    FormComponent: PreferencesForm,
  },
];
