import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = { title: "Projects" };

/**
 * Marketing view only. No dollar figures, no PO values, no job costs — that
 * lives behind /app. Scope descriptions only.
 */
const PROJECTS = [
  {
    name: "545 Vienna Street — Bathroom Renovation",
    region: "Finger Lakes, NY",
    type: "Institutional renovation",
    status: "In progress",
    body: "Full bathroom renovation in an occupied state-operated facility. Demolition, plumbing rough, tile and finishes, phased around daily operations.",
  },
  {
    name: "Indian Trail — Patch & Paint",
    region: "Maybrook, NY",
    type: "Institutional / residential program",
    status: "In progress",
    body: "Interior patch and paint of an occupied residence. Zero-VOC coatings, owner-selected colors, protection and sequencing so residents stay in place through the work.",
  },
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="headline text-4xl font-extrabold">Projects</h1>
      <p className="mt-3 max-w-2xl text-[var(--muted-foreground)]">
        Current work across {COMPANY.serviceArea}. References and a full project list are available
        on request — ask when you send your scope.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <Card key={p.name} className="p-6">
            <div className="flex items-center gap-2">
              <Badge variant="accent">{p.status}</Badge>
              <Badge variant="muted">{p.type}</Badge>
            </div>
            <h2 className="mt-3 text-lg font-extrabold">{p.name}</h2>
            <p className="text-sm font-semibold text-[var(--muted-foreground)]">{p.region}</p>
            <p className="mt-3 text-sm text-[var(--muted-foreground)]">{p.body}</p>
          </Card>
        ))}
      </div>

      <div className="mt-12 rounded-lg border border-dashed border-[var(--border)] p-6">
        <p className="text-sm font-bold">Want a reference on a job like yours?</p>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Tell us the building type and county and we will put you in touch with the owner.
        </p>
        <div className="mt-4">
          <Link href="/contact">
            <Button variant="accent">Request an estimate</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
