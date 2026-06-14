import type { SvgIconComponent } from "@mui/icons-material";
import {
  SwapHoriz as TransferIcon,
  Add as DepositIcon,
  Remove as WithdrawIcon,
  AddShoppingCart as ApplyIcon,
} from "@mui/icons-material";

export interface QuickAction {
  label: string;
  path: string;
  IconComponent: SvgIconComponent;
}

export const quickActions: QuickAction[] = [
  { label: "Transfer Money", path: "/transfer", IconComponent: TransferIcon },
  { label: "Deposit", path: "/deposit", IconComponent: DepositIcon },
  { label: "Withdraw", path: "/withdraw", IconComponent: WithdrawIcon },
  { label: "Apply for New Product", path: "/apply-new-product", IconComponent: ApplyIcon },
];
