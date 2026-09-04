import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { RoleLock } from "@/components/role-lock";
import { ApprovalBar } from "@/components/approval-bar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AGENTS } from "@/lib/agents";
import { getDashboardCounts, getLiveProjects } from "@/lib/data";
import { formatCents } from "@/lib/money";

export const dynamic = "force-dynamic";
export const metadata = { title: "Sara" };

export default async function SaraPage() {
  const [projects, counts] = await Promise.all([getLiveProjects(), getDashboardCounts()]);

  return (
    <>
      <PageHeader
        title="Sara — PM command center"
        subtitle="Projects, schedule, client comms, routing. Sara approves; she does not price and she does not keep the books."
      />

      <RoleLock agent={AGENTS.sara} />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide">Jobs on her desk</h2>
          <ul className="mt-3 space-y-3">
            {projects.map((p) => (
              <li key={p.code} className="flex items-baseline justify-between gap-3">
                <div>
                  <Link href={`/app/projects/${p.code}`} className="font-semibold hover:underline">
                    {p.name}
                  </Link>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    {p.poNumber ? `PO ${p.poNumber}` : "No PO"} · budget {formatCents(p.budgetCents)}
                  </p>
                </div>
                <Badge variant="muted">{p.code}</Badge>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide">Routing</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <span>Pricing, takeoff, go/no-go → <Link href="/app/taylor" className="font-semibold underline underline-offset-4">Taylor</Link></span>
              <Badge variant="muted">{counts.openEstimates} open</Badge>
            </li>
            <li className="flex items-center justify-between">
              <span>Books, bills, COIs, sub outreach → <Link href="/app/emma" className="font-semibold underline underline-offset-4">Emma</Link></span>
              <Badge variant="muted">{counts.unpaidBills} bills</Badge>
            </li>
            <li className="flex items-center justify-between">
              <span>Collections / lien → Richard Lexington (outside this app)</span>
              <Badge variant="outline">manual</Badge>
            </li>
          </ul>
          <p className="mt-4 text-xs text-[var(--muted-foreground)]">
            Anything about brand, personal projects, or another company does not belong in here.
          </p>
        </Card>
      </div>

      <Card className="mt-6">
        <div className="p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide">Client update — draft</h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Pick one job. A client update never mentions another client&apos;s job or its numbers.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="sara-job">Job</Label>
              <select
                id="sara-job"
                name="job"
                className="h-10 rounded-md border border-[var(--input)] bg-[var(--card)] px-3 text-sm"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a job
                </option>
                {projects.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.code} — {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="sara-to">To</Label>
              <Input id="sara-to" name="to" placeholder="owner / client contact" />
            </div>
          </div>

          <div className="mt-4 grid gap-1.5">
            <Label htmlFor="sara-points">What happened this week</Label>
            <Textarea id="sara-points" rows={4} placeholder="Crew days, inspections, deliveries, blockers." />
          </div>

          <div className="mt-4 grid gap-1.5">
            <Label htmlFor="sara-draft">Draft output</Label>
            <Textarea
              id="sara-draft"
              rows={8}
              readOnly
              className="bg-[var(--muted)]"
              defaultValue={
                "Draft appears here once the agent is wired up.\n\nNothing is generated in this pass — the Approve / Send buttons below are inert on purpose."
              }
            />
          </div>
        </div>
        <ApprovalBar what="update" />
      </Card>
    </>
  );
}
