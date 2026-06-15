// ─── Notification Icons (emoji) ───────────────────────────────────────────────

export const notificationIconMap: Record<string, string> = {
  transfer: "💸",
  deposit: "💰",
  withdraw: "💳",
  airdrop: "🎁",
  fd_interest_paid: "📈",
  fd_renewed: "🔄",
  fd_settled: "🏁",
  account_opened: "✅",
  account_rejected: "❌",
  default: "📢",
};

export function getNotificationIcon(type: string): string {
  return notificationIconMap[type] ?? notificationIconMap.default;
}

// ─── Notification Colors (MUI color tokens) ───────────────────────────────────

export const notificationColorMap: Record<string, string> = {
  transfer: "info.main",
  deposit: "success.main",
  withdraw: "warning.main",
  airdrop: "secondary.main",
  fd_interest_paid: "success.light",
  fd_renewed: "primary.light",
  fd_settled: "success.main",
  account_opened: "success.main",
  account_rejected: "error.main",
  default: "text.secondary",
};

export function getNotificationColor(type: string): string {
  return notificationColorMap[type] ?? notificationColorMap.default;
}
