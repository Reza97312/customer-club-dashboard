export function formatCurrency(
  amount: string | number | null | undefined,
): string {
  if (amount === null || amount === undefined) {
    return "۰";
  }

  const numberAmount = Number(amount);

  if (isNaN(numberAmount)) {
    return "۰";
  }

  return numberAmount.toLocaleString("fa-IR");
}
