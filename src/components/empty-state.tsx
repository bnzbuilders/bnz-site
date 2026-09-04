import { Card } from "@/components/ui/card";

/**
 * Empty means empty. We show the zero, not a fake row — an invented number is
 * worse than a blank screen.
 */
export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <Card className="border-dashed p-8 text-center">
      <p className="text-sm font-semibold">{title}</p>
      {hint ? <p className="mt-1 text-sm text-[var(--muted-foreground)]">{hint}</p> : null}
    </Card>
  );
}
