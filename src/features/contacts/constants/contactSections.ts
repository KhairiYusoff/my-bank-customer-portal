import { SvgIconComponent } from "@mui/icons-material";
import {
  Phone,
  Email,
  Support as SupportIcon,
} from "@mui/icons-material";

interface ContactItem {
  IconComponent: SvgIconComponent;
  type: string;
  value: string;
  available: string;
}

interface ContactSection {
  title: string;
  description: string;
  IconComponent: SvgIconComponent;
  colorScheme: "primary" | "info";
  contacts: ContactItem[];
}

export const contactSections: ContactSection[] = [
  {
    title: "Consumer Banking",
    description: "General banking services and inquiries",
    IconComponent: Phone,
    colorScheme: "primary",
    contacts: [
      { IconComponent: Phone, type: "Telephone", value: "+603 6204 7788", available: "24/7" },
      { IconComponent: Phone, type: "Premier Card Hotline", value: "+603 6204 7799", available: "24/7" },
      { IconComponent: Email, type: "Email Support", value: "contactus@mybank.com", available: "24-48 hours response" },
    ],
  },
  {
    title: "Preferred Banking",
    description: "Premium banking services for preferred customers",
    IconComponent: SupportIcon,
    colorScheme: "info",
    contacts: [
      { IconComponent: Phone, type: "Local Hotline", value: "1 300 885 300", available: "24/7" },
      { IconComponent: Phone, type: "International", value: "+603 2295 6888", available: "24/7" },
      { IconComponent: Email, type: "Priority Email", value: "preferred@mybank.com", available: "12-24 hours response" },
    ],
  },
];
