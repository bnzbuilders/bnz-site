import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  subtitle,
  right,
  className,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 flex flex-wrap items-end justify-between gap-3", className)}>
      <div>
        <h1 className="headline text-2xl font-extrabold">{title}</h1>
        {subtitle ? (
          <p className="mt-1 max-w-2xl text-sm text-[var(--muted-foreground)]">{subtitle}</p>
        ) : null}
      </div>
      {right}
    </div>
  );
}
