// ─── Notification Icons (emoji) ───────────────────────────────────────────────

export const notificationIconMap: Record<string, string> = {
  transfer: "💸",
  deposit: "💰",
  withdraw: "💳",
  airdrop: "🎁",
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
  default: "text.secondary",
};

export function getNotificationColor(type: string): string {
  return notificationColorMap[type] ?? notificationColorMap.default;
}
