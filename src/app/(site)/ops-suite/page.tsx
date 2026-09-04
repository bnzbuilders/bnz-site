import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AGENT_LIST } from "@/lib/agents";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = { title: "Ops Suite" };

/**
 * Teaser only. Names the back-office lanes. No live bidding numbers, no job
 * costs, no client names, no pricing that isn't already public.
 */
export default function OpsSuitePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
        Behind the scenes
      </p>
      <h1 className="headline mt-3 text-4xl font-extrabold">The BNZ Ops Suite</h1>
      <p className="mt-3 max-w-2xl text-[var(--muted-foreground)]">
        Small GC, tight back office. Our estimating, books, and sub coordination run on an internal
        system with three lanes — so quotes go out fast, subs stay compliant, and nobody has to
        chase a paper trail on a Friday afternoon.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {AGENT_LIST.map((a) => (
          <Card key={a.key} className="p-6">
            <div className="flex size-10 items-center justify-center rounded-md bg-[var(--primary)] text-lg font-extrabold text-[var(--primary-foreground)]">
              {a.name[0]}
            </div>
            <h2 className="mt-4 text-lg font-extrabold">{a.name}</h2>
            <p className="text-sm font-semibold text-[var(--accent)]">{a.role}</p>
            <ul className="mt-3 space-y-1 text-sm text-[var(--muted-foreground)]">
              {a.owns.slice(0, 3).map((o) => (
                <li key={o}>· {o}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <p className="mt-8 text-sm text-[var(--muted-foreground)]">
        What it means for you: an estimate that comes back fast, subs with current insurance before
        they hit your site, and a PM who is not buried in paperwork when you call.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link href="/contact">
          <Button variant="accent" size="lg">
            Request an estimate
          </Button>
        </Link>
        <a href={COMPANY.phoneHref} className="text-sm font-bold">
          {COMPANY.phone}
        </a>
      </div>
    </div>
  );
}
