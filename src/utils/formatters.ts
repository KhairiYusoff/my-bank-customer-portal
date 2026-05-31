export const formatCurrency = (amount: number): string =>
  `RM ${amount.toLocaleString("en-MY", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export const formatDateTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  return (
    date.toLocaleDateString("en-MY", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) +
    ", " +
    date.toLocaleTimeString("en-MY", { hour: "2-digit", minute: "2-digit" })
  );
};
