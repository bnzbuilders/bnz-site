import { PageHeader } from "@/components/page-header";
import { RoleLock } from "@/components/role-lock";
import { ApprovalBar } from "@/components/approval-bar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { AGENTS } from "@/lib/agents";
import { getLiveProjects } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata = { title: "Taylor" };

/** The questions a bid has to survive before it goes out. No number wins on hope. */
const LOWBALL_CHECKS = [
  "Is every line backed by a takeoff quantity, not a feeling?",
  "Labor burden applied — taxes, insurance, comp?",
  "Prevailing wage checked against the schedule for this county and trade?",
  "Are allowances named and capped, or hiding as lump sums?",
  "Access, protection, and off-hours work priced for an occupied building?",
  "Mobilization, dumpsters, permits, and general conditions carried?",
  "Escalation on long-lead material?",
  "Contingency for what the drawings do not show?",
  "Do we have written sub quotes, or are we guessing their number?",
  "If we win at this price, do we still want the job?",
];

const WORKSHEET_COLUMNS = ["Division / trade", "Description", "Qty", "Unit", "Unit cost", "Burden %", "Markup %"];

export default async function TaylorPage() {
  const projects = await getLiveProjects();

  return (
    <>
      <PageHeader
        title="Taylor — estimating"
        subtitle="Takeoff, unit rates, burden, prevailing wage, allowances, go/no-go. Taylor prices; he does not run books or chase subs."
      />

      <RoleLock agent={AGENTS.taylor} />

      <Card>
        <div className="p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide">Bid worksheet</h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            One worksheet per bid. Nothing is pre-filled — a blank cell is honest, a made-up rate is
            not.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="grid gap-1.5">
              <Label htmlFor="t-title">Bid title</Label>
              <Input id="t-title" placeholder="Owner / project" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="t-job">Tie to a job (optional)</Label>
              <select
                id="t-job"
                className="h-10 rounded-md border border-[var(--input)] bg-[var(--card)] px-3 text-sm"
                defaultValue=""
              >
                <option value="">Not tied to a live job</option>
                {projects.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.code}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="t-due">Bid due</Label>
              <Input id="t-due" type="date" />
            </div>
          </div>

          <div className="mt-5">
            <Table>
              <THead>
                <TR>
                  {WORKSHEET_COLUMNS.map((c) => (
                    <TH key={c}>{c}</TH>
                  ))}
                </TR>
              </THead>
              <TBody>
                {[0, 1, 2].map((i) => (
                  <TR key={i}>
                    {WORKSHEET_COLUMNS.map((c) => (
                      <TD key={c}>
                        <Input className="h-9" placeholder="" aria-label={`${c} row ${i + 1}`} />
                      </TD>
                    ))}
                  </TR>
                ))}
              </TBody>
            </Table>
            <p className="mt-3 text-xs text-[var(--muted-foreground)]">
              Rows do not total yet. Totals arrive with the calculation pass — until then no number
              on this screen is a bid.
            </p>
          </div>

          <div className="mt-5 grid gap-1.5">
            <Label htmlFor="t-assumptions">Assumptions, exclusions, allowances</Label>
            <Textarea
              id="t-assumptions"
              rows={5}
              placeholder="What is excluded, what is an allowance, what the drawings do not show."
            />
          </div>
        </div>
        <ApprovalBar what="worksheet" />
      </Card>

      <Card className="mt-6 p-5">
        <h2 className="text-sm font-bold uppercase tracking-wide">Lowball check</h2>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Every one of these gets a yes before a number leaves the office. A bid that needs
          everything to go right is not a bid.
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          {LOWBALL_CHECKS.map((c) => (
            <li key={c} className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 size-4 accent-[var(--accent)]" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="mt-6 p-5">
        <h2 className="text-sm font-bold uppercase tracking-wide">Go / no-go</h2>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Taylor recommends. Sara decides. Bonding capacity and financials stay in this app — they
          never appear on a public page.
        </p>
        <div className="mt-4 grid gap-1.5">
          <Textarea rows={4} placeholder="Fit, risk, schedule, crew availability, why we walk or why we bid." />
        </div>
      </Card>
    </>
  );
}
