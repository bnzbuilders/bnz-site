import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { EmptyState } from "@/components/empty-state";
import { getProjectByCode } from "@/lib/data";
import { formatCents, formatDate, pctOfBudget } from "@/lib/money";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const project = await getProjectByCode(code.toUpperCase());
  if (!project) notFound();

  const pct = pctOfBudget(project.spentCents, project.budgetCents);

  return (
    <>
      <PageHeader
        title={project.name}
        subtitle={`${project.client}${project.poNumber ? ` · PO ${project.poNumber}` : ""}${
          project.address ? ` · ${project.address}` : ""
        }`}
        right={<Badge variant="accent">{project.status}</Badge>}
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted-foreground)]">
            PO budget
          </p>
          <p className="mt-2 text-2xl font-extrabold tabular-nums">{formatCents(project.budgetCents)}</p>
        </Card>
        <Card className="p-5">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted-foreground)]">
            Posted cost
          </p>
          <p className="mt-2 text-2xl font-extrabold tabular-nums">{formatCents(project.spentCents)}</p>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">Documents on file only</p>
        </Card>
        <Card className="p-5">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted-foreground)]">
            Remaining
          </p>
          <p className="mt-2 text-2xl font-extrabold tabular-nums">
            {formatCents(project.budgetCents - project.spentCents)}
          </p>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
            {pct === null ? "—" : `${pct}% of budget posted`}
          </p>
        </Card>
      </div>

      {project.caps.length > 0 ? (
        <Card className="mt-6 p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide">Spend caps</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {project.caps.map((c) => (
              <li key={c.id} className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-semibold">{c.label}</span>
                <span className="font-extrabold tabular-nums">{formatCents(c.capCents)}</span>
                {c.note ? (
                  <span className="w-full text-xs text-[var(--muted-foreground)]">{c.note}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      <div className="mt-6">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide">
          Job-cost ledger — {project.code} only
        </h2>
        {project.costs.length === 0 ? (
          <EmptyState
            title="No posted cost on this job."
            hint="That is the real number. Post a line only when a receipt or invoice is in hand."
          />
        ) : (
          <Card>
            <Table>
              <THead>
                <TR>
                  <TH>Date</TH>
                  <TH>Vendor</TH>
                  <TH>Category</TH>
                  <TH>Description</TH>
                  <TH>Doc</TH>
                  <TH className="text-right">Amount</TH>
                </TR>
              </THead>
              <TBody>
                {project.costs.map((c) => (
                  <TR key={c.id}>
                    <TD className="whitespace-nowrap">{formatDate(c.incurredOn)}</TD>
                    <TD className="font-semibold">{c.vendor}</TD>
                    <TD>{c.category}</TD>
                    <TD>{c.description}</TD>
                    <TD>{c.docRef ?? "—"}</TD>
                    <TD className="text-right font-extrabold tabular-nums">
                      {formatCents(c.amountCents)}
                    </TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </Card>
        )}
      </div>

      {project.notes.length > 0 ? (
        <Card className="mt-6 p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide">Job rules & notes</h2>
          <ul className="mt-3 space-y-3 text-sm">
            {project.notes.map((n) => (
              <li key={n.id}>
                <p>{n.body}</p>
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                  {n.author} · {formatDate(n.createdAt)}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide">RFQs on this job</h2>
          {project.rfqs.length === 0 ? (
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">None yet.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {project.rfqs.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-2">
                  <span>
                    {r.trade}
                    {r.sub ? ` · ${r.sub.name}` : ""}
                  </span>
                  <Badge variant="muted">{r.status}</Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card className="p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide">Bills on this job</h2>
          {project.bills.length === 0 ? (
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">None posted.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {project.bills.map((b) => (
                <li key={b.id} className="flex items-center justify-between gap-2">
                  <span>
                    {b.vendor} {b.invoiceNumber ? `· ${b.invoiceNumber}` : ""}
                  </span>
                  <span className="font-extrabold tabular-nums">{formatCents(b.amountCents)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
