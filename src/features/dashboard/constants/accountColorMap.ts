export type AccountColorScheme = "success" | "primary" | "warning";

export function getAccountColorScheme(accountType: string): AccountColorScheme {
  switch (accountType.toLowerCase()) {
    case "savings":
      return "success";
    case "current":
      return "primary";
    case "fixed deposit":
    case "fixed_deposit":
      return "warning";
    default:
      return "primary";
  }
}

export function formatAccountType(accountType: string): string {
  return accountType.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}
