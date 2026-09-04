import Link from "next/link";
import { COMPANY } from "@/lib/company";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const WORK = [
  ["Commercial renovation", "Occupied buildings, phased so the tenant keeps working."],
  ["Tenant fit-out", "White box to punch list on a landlord's clock."],
  ["Institutional & public works", "OGS, DASNY, OPWDD scopes run to the spec and the paperwork."],
  ["Site work", "Excavation, grading, and utility coordination."],
  ["Specialty trades", "Electrical, plumbing, HVAC, framing — one contract, one throat to choke."],
  ["Residential", "When it fits the schedule and the crew, we take it."],
];

export default function HomePage() {
  return (
    <>
      <section className="border-b border-[var(--border)] bg-[var(--primary)] text-[var(--primary-foreground)]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            {COMPANY.license}
          </p>
          <h1 className="headline mt-4 max-w-3xl text-5xl font-extrabold sm:text-6xl">
            {COMPANY.tagline}
          </h1>
          <p className="mt-5 max-w-2xl text-lg opacity-80">
            BNZ Builders is a New York general contractor. Commercial renovation, tenant fit-out,
            institutional and public work, site work, and specialty trades — all under one contract.
          </p>
          <p className="mt-4 max-w-2xl text-base font-semibold text-[var(--accent)]">
            {COMPANY.promise}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact">
              <Button variant="accent" size="lg">
                Request an estimate
              </Button>
            </Link>
            <a href={COMPANY.phoneHref}>
              <Button
                variant="outline"
                size="lg"
                className="border-white/25 text-[var(--primary-foreground)]"
              >
                Call {COMPANY.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="headline text-3xl font-extrabold">What we do</h2>
        <p className="mt-2 max-w-2xl text-[var(--muted-foreground)]">
          Permits to punch list. One team accountable for every trade on the job — no
          finger-pointing between subs.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WORK.map(([title, body]) => (
            <Card key={title} className="p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide">{title}</h3>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">{body}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/what-we-do" className="text-sm font-bold underline underline-offset-4">
            See the full scope list →
          </Link>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--muted)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-2">
          <div>
            <h2 className="headline text-3xl font-extrabold">A builder that answers the phone.</h2>
            <p className="mt-4 text-[var(--muted-foreground)]">
              The PM who walks your job and writes the scope is the same PM who runs it, holds the
              subs to the schedule, and closes it out. You get a straight answer in one business
              day, and a budget that holds when scope shifts.
            </p>
          </div>
          <ul className="grid gap-3 self-center">
            {[
              ["Licensed & bonded", "New York State general contractor"],
              ["Fully insured", "General liability and workers comp"],
              ["Direct PM access", "One point of contact, start to finish"],
              ["Vetted trade network", "Subs we have actually worked with, statewide"],
            ].map(([t, s]) => (
              <li key={t} className="rounded-md border border-[var(--border)] bg-[var(--card)] p-4">
                <p className="text-sm font-bold">{t}</p>
                <p className="text-sm text-[var(--muted-foreground)]">{s}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-8 sm:p-10">
          <h2 className="headline text-3xl font-extrabold">Send us the scope.</h2>
          <p className="mt-3 max-w-2xl text-[var(--muted-foreground)]">
            Plans, a scope of work, or a plain description of what you need. We come back with a
            straight answer inside one business day.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact">
              <Button variant="accent" size="lg">
                Request an estimate
              </Button>
            </Link>
            <a href={COMPANY.phoneHref}>
              <Button variant="outline" size="lg">
                {COMPANY.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
