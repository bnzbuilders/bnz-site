import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, checkPasscode, issueSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const passcode = String(form.get("passcode") ?? "");
  const next = String(form.get("next") ?? "/app");
  const safeNext = next.startsWith("/app") ? next : "/app";

  if (!checkPasscode(passcode)) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.search = `?error=1&next=${encodeURIComponent(safeNext)}`;
    return NextResponse.redirect(url, { status: 303 });
  }

  const url = req.nextUrl.clone();
  url.pathname = safeNext;
  url.search = "";
  const res = NextResponse.redirect(url, { status: 303 });
  res.cookies.set(SESSION_COOKIE, await issueSession(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 12,
  });
  return res;
}
