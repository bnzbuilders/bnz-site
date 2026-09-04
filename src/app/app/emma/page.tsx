import { PageHeader } from "@/components/page-header";
import { RoleLock } from "@/components/role-lock";
import { ApprovalBar } from "@/components/approval-bar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AGENTS } from "@/lib/agents";
import { getBills, getLiveProjects, getSubs } from "@/lib/data";
import { formatCents } from "@/lib/money";
import { quickbooks } from "@/lib/integrations/quickbooks";

export const dynamic = "force-dynamic";
export const metadata = { title: "Emma" };

/**
 * The morning money email is assembled from posted documents only. If a job has
 * no receipts, it says $0.00 — it does not guess, and it never blends two jobs
 * into one number.
 */
function morningMoneyDraft(
  projects: Awaited<ReturnType<typeof getLiveProjects>>,
  unpaidCount: number
) {
  const lines = [
    "Sara,",
    "",
    "Money, as of this morning. Every figure below is off a document on file.",
    "",
  ];

  for (const p of projects) {
    lines.push(`${p.code} — ${p.name}`);
    lines.push(`  PO ${p.poNumber ?? "n/a"} · budget ${formatCents(p.budgetCents)}`);
    lines.push(`  Posted cost: ${formatCents(p.spentCents)}`);
    if (p.costs.length === 0) {
      lines.push("  No receipts posted on this job.");
    } else {
      for (const c of p.costs) {
        lines.push(`  · ${c.vendor} — ${formatCents(c.amountCents)} (${c.category.toLowerCase()})`);
      }
    }
    for (const cap of p.caps) {
      lines.push(`  Cap in force: ${cap.label} — ${formatCents(cap.capCents)}`);
    }
    lines.push("");
  }

  lines.push(`Unpaid bills in the system: ${unpaidCount}.`);
  lines.push("");
  lines.push("Nothing has been paid or sent. Say the word and I'll move.");
  lines.push("");
  lines.push("— Emma");
  return lines.join("\n");
}

export default async function EmmaPage() {
  const [projects, bills, subs] = await Promise.all([getLiveProjects(), getBills(), getSubs()]);
  const unpaid = bills.filter((b) => b.status === "UNPAID" || b.status === "APPROVED").length;
  const missingDocs = subs.flatMap((s) =>
    s.docs.filter((d) => d.status !== "CURRENT").map((d) => ({ sub: s.name, type: d.type }))
  );

  return (
    <>
      <PageHeader
        title="Emma — books & sub outreach"
        subtitle="QuickBooks, receipts, job cost, bills, 1099s, W-9s, COI chase. Emma does not estimate and does not touch brand."
        right={
          <Badge variant={quickbooks.isConfigured() ? "default" : "muted"}>
            QuickBooks {quickbooks.isConfigured() ? "configured" : "not connected"}
          </Badge>
        }
      />

      <RoleLock agent={AGENTS.emma} />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide">Posted cost by job</h2>
          <ul className="mt-3 space-y-3 text-sm">
            {projects.map((p) => (
              <li key={p.code} className="flex items-baseline justify-between gap-3">
                <span>
                  <span className="font-semibold">{p.code}</span>{" "}
                  <span className="text-[var(--muted-foreground)]">
                    · budget {formatCents(p.budgetCents)}
                  </span>
                </span>
                <span className="font-extrabold tabular-nums">{formatCents(p.spentCents)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-[var(--muted-foreground)]">
            Two separate ledgers. There is no combined total on this page by design.
          </p>
        </Card>

        <Card className="p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide">Compliance chase list</h2>
          {missingDocs.length === 0 ? (
            <p className="mt-3 text-sm text-[var(--muted-foreground)]">
              Nothing outstanding — and no subs on file yet.
            </p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {missingDocs.map((d, i) => (
                <li key={`${d.sub}-${d.type}-${i}`} className="flex items-center justify-between gap-2">
                  <span>{d.sub}</span>
                  <Badge variant="accent">{d.type.replace(/_/g, " ")}</Badge>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-xs text-[var(--muted-foreground)]">
            Unpaid or approved bills waiting: <strong>{unpaid}</strong>.
          </p>
        </Card>
      </div>

      <Card className="mt-6">
        <div className="p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide">
            Sara&apos;s morning money email — draft
          </h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Built from posted documents only. Emma drafts it; Sara sends it.
          </p>
          <Textarea
            className="mt-4 bg-[var(--muted)] font-mono text-xs"
            rows={20}
            readOnly
            defaultValue={morningMoneyDraft(projects, unpaid)}
          />
        </div>
        <ApprovalBar what="email" />
      </Card>

      <Card className="mt-6">
        <div className="p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide">Sub outreach — draft</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="grid gap-1.5">
              <Label htmlFor="emma-job">Job</Label>
              <select
                id="emma-job"
                className="h-10 rounded-md border border-[var(--input)] bg-[var(--card)] px-3 text-sm"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a job
                </option>
                {projects.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.code}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="emma-trade">Trade</Label>
              <Input id="emma-trade" placeholder="e.g. painting, plumbing" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="emma-county">County</Label>
              <Input id="emma-county" placeholder="Where the sub needs to be" />
            </div>
          </div>
          <div className="mt-4 grid gap-1.5">
            <Label htmlFor="emma-ask">What we need back</Label>
            <Textarea
              id="emma-ask"
              rows={4}
              placeholder="Scope, walk-through date, quote deadline, insurance requirements."
            />
          </div>
          <div className="mt-4 grid gap-1.5">
            <Label htmlFor="emma-draft">Draft output</Label>
            <Textarea
              id="emma-draft"
              rows={8}
              readOnly
              className="bg-[var(--muted)]"
              defaultValue={
                "Draft appears here once the agent is wired up.\n\nOutreach goes out under Sara Cooper's name and email. Nothing sends from this screen."
              }
            />
          </div>
        </div>
        <ApprovalBar what="outreach" />
      </Card>
    </>
  );
}
