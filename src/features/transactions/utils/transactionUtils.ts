import type { ChipProps } from "@mui/material/Chip";
import type { TransactionHistory } from "../types/transfer";

// ─── Type chip color ──────────────────────────────────────────────────────────

export function getTransactionTypeColor(
  type: string,
  direction?: string,
): ChipProps["color"] {
  switch (type) {
    case "deposit":
      return "success";
    case "airdrop":
      return "warning";
    case "withdrawal":
      return "error";
    case "transfer":
      return direction === "debit" ? "error" : "success";
    default:
      return "default";
  }
}

// ─── Type chip label ──────────────────────────────────────────────────────────

export function getTransactionTypeLabel(
  type: string,
  direction?: string,
): string {
  switch (type) {
    case "deposit":
      return "Deposit";
    case "airdrop":
      return "Airdrop";
    case "withdrawal":
      return "Withdrawal";
    case "transfer":
      return direction === "debit" ? "Transfer Sent" : "Transfer Received";
    default:
      return type ? type.charAt(0).toUpperCase() + type.slice(1) : "Unknown";
  }
}

// ─── Amount helpers ───────────────────────────────────────────────────────────

export function isOutgoing(tx: TransactionHistory): boolean {
  return (
    tx.type === "withdrawal" ||
    (tx.type === "transfer" && tx.direction === "debit")
  );
}

export function getAmountColor(tx: TransactionHistory): string {
  return isOutgoing(tx) ? "error.main" : "success.main";
}

export function formatTransactionAmount(
  tx: TransactionHistory,
  formatCurrency: (n: number) => string,
): string {
  const prefix = isOutgoing(tx) ? "-" : "+";
  return `${prefix}${formatCurrency(Math.abs(tx.amount))}`;
}
