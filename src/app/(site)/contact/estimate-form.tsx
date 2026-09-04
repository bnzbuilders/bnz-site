"use client";

import { useActionState } from "react";
import { submitEstimateRequest, type EstimateFormState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { COMPANY } from "@/lib/company";

const initial: EstimateFormState = { ok: false };

export function EstimateForm() {
  const [state, action, pending] = useActionState(submitEstimateRequest, initial);

  if (state.ok) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <p className="text-lg font-extrabold">Got it.</p>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          {COMPANY.pmName} will come back to you within one business day. Need it sooner? Call{" "}
          <a href={COMPANY.phoneHref} className="font-bold underline underline-offset-4">
            {COMPANY.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="company">Company</Label>
          <Input id="company" name="company" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" />
        </div>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="location">Project location</Label>
        <Input id="location" name="location" placeholder="County or address" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="scope">Scope</Label>
        <Textarea
          id="scope"
          name="scope"
          rows={6}
          placeholder="What needs to get built, fixed, or finished — and by when."
          required
        />
      </div>

      {state.error ? <p className="text-sm text-[var(--destructive)]">{state.error}</p> : null}

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant="accent" size="lg" disabled={pending}>
          {pending ? "Sending…" : "Request estimate"}
        </Button>
        <span className="text-sm text-[var(--muted-foreground)]">
          No obligation. Straight answer in one business day.
        </span>
      </div>
    </form>
  );
}
