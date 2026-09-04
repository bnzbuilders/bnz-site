import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = { title: "Process" };

const STEPS = [
  {
    n: "01",
    title: "Walk and scope",
    body: "Your PM walks the site, takes the field dimensions, and writes the scope in plain language — including what is not in it.",
  },
  {
    n: "02",
    title: "Takeoff and price",
    body: "Quantities off the drawings, real unit rates, labor burden and prevailing wage where it applies, allowances called out by name. No mystery lump sums.",
  },
  {
    n: "03",
    title: "Buy out the trades",
    body: "RFQs go to subs we have worked with. Current insurance and W-9 on file before anyone sets foot on site.",
  },
  {
    n: "04",
    title: "Build",
    body: "One schedule. Weekly updates from the same PM. Change orders priced and signed before the work happens, not after.",
  },
  {
    n: "05",
    title: "Close out",
    body: "Punch list walked with you, final inspections, warranties, as-builts, and lien waivers. Then we are gone.",
  },
];

export default function ProcessPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="headline text-4xl font-extrabold">How a BNZ job runs</h1>
      <p className="mt-3 text-[var(--muted-foreground)]">{COMPANY.promise}</p>

      <ol className="mt-12 space-y-8">
        {STEPS.map((s) => (
          <li key={s.n} className="flex gap-6 border-b border-[var(--border)] pb-8 last:border-0">
            <span className="headline text-3xl font-extrabold text-[var(--accent)]">{s.n}</span>
            <div>
              <h2 className="text-lg font-extrabold">{s.title}</h2>
              <p className="mt-2 text-[var(--muted-foreground)]">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link href="/contact">
          <Button variant="accent" size="lg">
            Start with a walk-through
          </Button>
        </Link>
        <a href={COMPANY.phoneHref} className="text-sm font-bold">
          {COMPANY.phone}
        </a>
      </div>
    </div>
  );
}
