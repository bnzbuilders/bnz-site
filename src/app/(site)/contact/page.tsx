import type { Metadata } from "next";
import { EstimateForm } from "./estimate-form";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1fr_1.2fr]">
      <div>
        <h1 className="headline text-4xl font-extrabold">Let&apos;s scope your project.</h1>
        <p className="mt-4 text-[var(--muted-foreground)]">
          Send plans, a scope of work, or a plain description of what you need. You will hear back
          from {COMPANY.pmName} — the PM who would run the job — inside one business day.
        </p>

        <dl className="mt-8 space-y-4 text-sm">
          <div>
            <dt className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted-foreground)]">
              Phone
            </dt>
            <dd className="mt-1">
              <a href={COMPANY.phoneHref} className="text-lg font-extrabold">
                {COMPANY.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted-foreground)]">
              Office
            </dt>
            <dd className="mt-1 font-semibold">{COMPANY.officeEmail}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted-foreground)]">
              Project Manager
            </dt>
            <dd className="mt-1 font-semibold">
              {COMPANY.pmName} · {COMPANY.pmEmail}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted-foreground)]">
              Service area
            </dt>
            <dd className="mt-1 font-semibold">{COMPANY.serviceArea}</dd>
          </div>
        </dl>
      </div>

      <div>
        <EstimateForm />
      </div>
    </div>
  );
}
