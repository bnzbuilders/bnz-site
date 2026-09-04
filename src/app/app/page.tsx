import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Stat } from "@/components/stat";
import { ProjectCard } from "@/components/project-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDashboardCounts, getLiveProjects } from "@/lib/data";
import { AGENT_LIST } from "@/lib/agents";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [projects, counts] = await Promise.all([getLiveProjects(), getDashboardCounts()]);

  return (
    <>
      <PageHeader
        title="Sara's desk"
        subtitle="Two live jobs. What needs a decision today, and nothing that needs one tomorrow."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Open estimates" value={String(counts.openEstimates)} href="/app/estimates" hint="Taylor's board" />
        <Stat label="RFQs waiting" value={String(counts.rfqsWaiting)} href="/app/procurement" hint="Drafted or sent, no quote back" />
        <Stat label="Unpaid bills" value={String(counts.unpaidBills)} href="/app/books" hint="Emma's payables" />
        <Stat label="Missing COIs" value={String(counts.missingCois)} href="/app/subs" hint="Sub compliance gaps" />
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wide">Live jobs</h2>
          <Link href="/app/projects" className="text-sm font-semibold underline underline-offset-4">
            All projects
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.code} project={p} />
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide">Waiting on a human</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <Link href="/app/inbox" className="hover:underline">
                Drafts pending approval
              </Link>
              <Badge variant={counts.pendingDrafts ? "accent" : "muted"}>{counts.pendingDrafts}</Badge>
            </li>
            <li className="flex items-center justify-between">
              <Link href="/app/inbox" className="hover:underline">
                Unread mail
              </Link>
              <Badge variant={counts.unreadMail ? "accent" : "muted"}>{counts.unreadMail}</Badge>
            </li>
          </ul>
          <p className="mt-4 text-xs text-[var(--muted-foreground)]">
            Gmail is not connected yet. These counts stay at zero until a human wires it up.
          </p>
        </Card>

        <Card className="p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide">Back office</h2>
          <ul className="mt-3 space-y-3">
            {AGENT_LIST.map((a) => (
              <li key={a.key}>
                <Link href={a.href} className="text-sm font-extrabold hover:underline">
                  {a.name}
                </Link>
                <p className="text-sm text-[var(--muted-foreground)]">{a.role}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
