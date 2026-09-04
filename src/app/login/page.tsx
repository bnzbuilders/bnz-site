import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <Card className="w-full max-w-sm p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
          BNZ Builders INC
        </p>
        <h1 className="headline mt-2 text-2xl font-extrabold">Ops sign-in</h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Office passcode. This is the internal app — not the public site.
        </p>

        <form action="/api/auth/login" method="post" className="mt-6 grid gap-3">
          <input type="hidden" name="next" value={next ?? "/app"} />
          <div className="grid gap-1.5">
            <Label htmlFor="passcode">Passcode</Label>
            <Input id="passcode" name="passcode" type="password" autoFocus required />
          </div>
          {error ? <p className="text-sm text-[var(--destructive)]">Wrong passcode.</p> : null}
          <Button type="submit" variant="accent">
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-xs text-[var(--muted-foreground)]">
          <Link href="/" className="underline underline-offset-4">
            ← Back to buildwithbnz.com
          </Link>
        </p>
      </Card>
    </div>
  );
}
