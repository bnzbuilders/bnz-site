/** Money helpers. Everything is stored and passed around in integer cents. */

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export function formatCents(cents: number | null | undefined): string {
  if (cents === null || cents === undefined) return "—";
  return usd.format(cents / 100);
}

/** Percent of budget spent, or null when there is no budget to divide by. */
export function pctOfBudget(spentCents: number, budgetCents: number): number | null {
  if (!budgetCents) return null;
  return Math.round((spentCents / budgetCents) * 1000) / 10;
}

export function formatDate(d: Date | null | undefined): string {
  if (!d) return "—";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(d);
}
