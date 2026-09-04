import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCents, pctOfBudget } from "@/lib/money";

type ProjectSummary = {
  code: string;
  name: string;
  client: string;
  poNumber: string | null;
  budgetCents: number;
  spentCents: number;
  status: string;
};

export function ProjectCard({ project }: { project: ProjectSummary }) {
  const pct = pctOfBudget(project.spentCents, project.budgetCents);
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link href={`/app/projects/${project.code}`} className="text-base font-extrabold hover:underline">
            {project.name}
          </Link>
          <p className="mt-0.5 text-sm text-[var(--muted-foreground)]">
            {project.client}
            {project.poNumber ? ` · PO ${project.poNumber}` : ""}
          </p>
        </div>
        <Badge variant="muted">{project.status}</Badge>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
        <div>
          <dt className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted-foreground)]">
            Budget
          </dt>
          <dd className="mt-1 font-extrabold tabular-nums">{formatCents(project.budgetCents)}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted-foreground)]">
            Posted cost
          </dt>
          <dd className="mt-1 font-extrabold tabular-nums">{formatCents(project.spentCents)}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted-foreground)]">
            Of budget
          </dt>
          <dd className="mt-1 font-extrabold tabular-nums">{pct === null ? "—" : `${pct}%`}</dd>
        </div>
      </dl>

      <p className="mt-3 text-xs text-[var(--muted-foreground)]">
        Posted cost is documents only. Nothing is estimated or accrued here.
      </p>
    </Card>
  );
}
