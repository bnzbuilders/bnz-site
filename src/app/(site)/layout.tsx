import Link from "next/link";
import { COMPANY } from "@/lib/company";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/what-we-do", label: "What We Do" },
  { href: "/process", label: "Process" },
  { href: "/projects", label: "Projects" },
  { href: "/ops-suite", label: "Ops Suite" },
  { href: "/contact", label: "Contact" },
];

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="headline text-lg font-extrabold">BNZ</span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
              Builders INC
            </span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-sm font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={COMPANY.phoneHref} className="hidden text-sm font-bold sm:block">
              {COMPANY.phone}
            </a>
            <Link href="/contact">
              <Button variant="accent" size="sm">
                Request Estimate
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-[var(--border)] bg-[var(--primary)] text-[var(--primary-foreground)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
          <div>
            <p className="headline text-lg font-extrabold">{COMPANY.legalName}</p>
            <p className="mt-2 text-sm opacity-70">{COMPANY.license}.</p>
            <p className="mt-1 text-sm opacity-70">Serving {COMPANY.serviceArea}.</p>
          </div>
          <div className="text-sm">
            <p className="text-[11px] font-bold uppercase tracking-wide opacity-60">Contact</p>
            <p className="mt-2">
              <a href={COMPANY.phoneHref} className="font-bold text-[var(--accent)]">
                {COMPANY.phone}
              </a>
            </p>
            <p className="mt-1 opacity-70">{COMPANY.officeEmail}</p>
            <p className="mt-1 opacity-70">
              {COMPANY.pmName} · {COMPANY.pmEmail}
            </p>
          </div>
          <div className="text-sm">
            <p className="text-[11px] font-bold uppercase tracking-wide opacity-60">Site</p>
            <ul className="mt-2 space-y-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="opacity-70 hover:opacity-100">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-5 text-xs opacity-60">
            © {new Date().getFullYear()} {COMPANY.legalName}. {COMPANY.license}.
          </div>
        </div>
      </footer>
    </div>
  );
}
