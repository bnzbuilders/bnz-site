import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AgentLane } from "@/lib/agents";

/** The lane card that sits at the top of every agent workspace. */
export function RoleLock({ agent }: { agent: AgentLane }) {
  return (
    <Card className="mb-6">
      <div className="flex flex-wrap items-start justify-between gap-4 p-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-extrabold">{agent.name}</h2>
            <Badge variant="accent">Role locked</Badge>
          </div>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            {agent.role}
            {agent.reportsTo ? ` · reports to ${agent.reportsTo}` : ""}
          </p>
        </div>
      </div>
      <div className="grid gap-5 border-t border-[var(--border)] p-5 sm:grid-cols-2">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted-foreground)]">
            Owns
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            {agent.owns.map((o) => (
              <li key={o}>· {o}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted-foreground)]">
            Out of lane
          </p>
          <ul className="mt-2 space-y-1 text-sm text-[var(--muted-foreground)]">
            {agent.neverDoes.map((n) => (
              <li key={n}>· {n}</li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
