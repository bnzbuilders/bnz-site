import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = { title: "What We Do" };

const SCOPES = [
  {
    title: "Commercial renovation",
    body: "Interior gut and rebuild, storefront, common areas, MEP upgrades. We phase around an occupied building so the tenant keeps operating.",
    bullets: ["Demolition and abatement coordination", "Framing, drywall, finishes", "MEP rough and trim", "Punch list and close-out documents"],
  },
  {
    title: "Tenant fit-out",
    body: "Landlord work letters and tenant improvements on a fixed date. Delivered clean, inspected, and ready for furniture.",
    bullets: ["Permit filing and expediting", "Ceilings, lighting, flooring", "Data and low voltage coordination", "TCO / sign-off support"],
  },
  {
    title: "Institutional and public works",
    body: "State and authority work — OGS, DASNY, OPWDD. Prevailing wage, submittals, and the paperwork trail these jobs actually run on.",
    bullets: ["Prevailing wage payrolls", "Submittals and RFIs", "Phasing around residents and staff", "PO and change order discipline"],
  },
  {
    title: "Site work",
    body: "Excavation, grading, drainage, and utility coordination sequenced with the building trades.",
    bullets: ["Sitework and grading", "Concrete flatwork", "Utility coordination", "Restoration"],
  },
  {
    title: "Specialty trades under one contract",
    body: "Electrical, plumbing, HVAC, framing, and finishes — managed by us, not handed back to you as a coordination problem.",
    bullets: ["Single contract, single schedule", "Vetted subs with current COIs", "One PM holding the dates", "Payment and lien waiver tracking"],
  },
  {
    title: "Residential",
    body: "Additions, whole-home renovation, and repairs when the scope fits our crews and schedule.",
    bullets: ["Kitchens and baths", "Additions", "Full renovations", "Repairs and restoration"],
  },
];

export default function WhatWeDoPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="headline text-4xl font-extrabold">What we do</h1>
      <p className="mt-3 max-w-2xl text-[var(--muted-foreground)]">
        {COMPANY.legalName} is a {COMPANY.license.toLowerCase()}. We self-perform where it makes
        sense and manage the rest — one contract, one schedule, one PM.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {SCOPES.map((s) => (
          <Card key={s.title} className="p-6">
            <h2 className="text-sm font-bold uppercase tracking-wide">{s.title}</h2>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">{s.body}</p>
            <ul className="mt-4 space-y-1 text-sm">
              {s.bullets.map((b) => (
                <li key={b}>· {b}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-3">
        <Link href="/contact">
          <Button variant="accent" size="lg">
            Request an estimate
          </Button>
        </Link>
        <a href={COMPANY.phoneHref} className="text-sm font-bold">
          or call {COMPANY.phone}
        </a>
      </div>
    </div>
  );
}
