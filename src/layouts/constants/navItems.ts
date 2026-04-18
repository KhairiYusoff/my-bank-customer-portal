import type { SvgIconComponent } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";

export interface NavItem {
  text: string;
  path: string;
  IconComponent: SvgIconComponent;
}

export const navItems: NavItem[] = [
  { text: "Dashboard", path: "/dashboard", IconComponent: DashboardIcon },
  { text: "Transfer", path: "/transfer", IconComponent: SyncAltIcon },
  { text: "Deposit", path: "/deposit", IconComponent: AccountBalanceWalletIcon },
  { text: "Withdraw", path: "/withdraw", IconComponent: AttachMoneyIcon },
  { text: "Expenses", path: "/expenses", IconComponent: ReceiptIcon },
  { text: "Profile", path: "/profile", IconComponent: PersonIcon },
  { text: "Contact Us", path: "/contact-us", IconComponent: ContactPhoneIcon },
];
