"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const OPS = [
  { href: "/app", label: "Dashboard" },
  { href: "/app/projects", label: "Projects" },
  { href: "/app/estimates", label: "Estimates" },
  { href: "/app/procurement", label: "Procurement / RFQs" },
  { href: "/app/subs", label: "Subs + Compliance" },
  { href: "/app/books", label: "Books / Job Cost" },
  { href: "/app/inbox", label: "Inbox & Drafts" },
];

const AGENTS = [
  { href: "/app/sara", label: "Sara — PM command center" },
  { href: "/app/emma", label: "Emma — books & subs" },
  { href: "/app/taylor", label: "Taylor — estimating" },
];

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "block rounded-md px-3 py-2 text-sm font-semibold",
        active
          ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
          : "text-[var(--primary-foreground)]/70 hover:bg-white/10 hover:text-[var(--primary-foreground)]"
      )}
    >
      {label}
    </Link>
  );
}

export function AppNav() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/app" ? pathname === "/app" : pathname.startsWith(href));

  return (
    <nav className="grid gap-6">
      <div className="grid gap-1">
        <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-[var(--primary-foreground)]/40">
          Ops
        </p>
        {OPS.map((l) => (
          <NavLink key={l.href} {...l} active={isActive(l.href)} />
        ))}
      </div>
      <div className="grid gap-1">
        <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-[var(--primary-foreground)]/40">
          Agents
        </p>
        {AGENTS.map((l) => (
          <NavLink key={l.href} {...l} active={isActive(l.href)} />
        ))}
      </div>
    </nav>
  );
}
