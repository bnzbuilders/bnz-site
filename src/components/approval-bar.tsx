"use client";

import { Button } from "@/components/ui/button";

/**
 * Approve / Send are deliberately inert in this pass. Nothing in this app is
 * allowed to reach a client, a sub, or QuickBooks until a human wires the
 * integration AND presses one of these on a real draft.
 */
export function ApprovalBar({ what = "draft" }: { what?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-[var(--border)] bg-[var(--muted)] px-5 py-3">
      <Button variant="outline" size="sm" disabled title="Not wired up yet">
        Save {what}
      </Button>
      <Button variant="default" size="sm" disabled title="Not wired up yet">
        Approve
      </Button>
      <Button variant="accent" size="sm" disabled title="Not wired up yet">
        Send
      </Button>
      <span className="text-xs text-[var(--muted-foreground)]">
        Draft only. Nothing sends until a human approves and the integration is connected.
      </span>
    </div>
  );
}
