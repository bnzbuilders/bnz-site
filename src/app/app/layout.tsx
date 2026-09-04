import Link from "next/link";
import type { Metadata } from "next";
import { AppNav } from "@/components/app-nav";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: { default: "Ops", template: "%s · BNZ Ops" },
  robots: { index: false, follow: false },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="shrink-0 bg-[var(--primary)] p-4 text-[var(--primary-foreground)] md:sticky md:top-0 md:h-screen md:w-64 md:overflow-y-auto">
        <div className="mb-6 flex items-center justify-between px-3 pt-2">
          <Link href="/app" className="flex items-baseline gap-2">
            <span className="headline text-lg font-extrabold">BNZ</span>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Ops</span>
          </Link>
        </div>

        <AppNav />

        <div className="mt-8 border-t border-white/10 px-3 pt-4 text-xs opacity-60">
          <p>Internal. Nothing here is public.</p>
          <form action="/api/auth/logout" method="post" className="mt-3">
            <Button type="submit" variant="ghost" size="sm" className="px-0 text-[var(--primary-foreground)]">
              Sign out
            </Button>
          </form>
          <p className="mt-3">
            <Link href="/" className="underline underline-offset-4">
              Public site
            </Link>
          </p>
        </div>
      </aside>

      <div className="flex-1 bg-[var(--background)]">
        <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
      </div>
    </div>
  );
}
