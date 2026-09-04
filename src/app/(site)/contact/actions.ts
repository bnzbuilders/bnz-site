"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  location: z.string().optional(),
  scope: z.string().min(10, "Tell us a little about the scope"),
});

export type EstimateFormState = { ok: boolean; error?: string };

/**
 * Saves the request. It does NOT email anyone — Gmail is stubbed. Sara picks
 * these up in /app/inbox once the integration is wired.
 */
export async function submitEstimateRequest(
  _prev: EstimateFormState,
  formData: FormData
): Promise<EstimateFormState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    company: formData.get("company") || undefined,
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    location: formData.get("location") || undefined,
    scope: formData.get("scope"),
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  }

  await prisma.estimateRequest.create({ data: parsed.data });
  return { ok: true };
}
