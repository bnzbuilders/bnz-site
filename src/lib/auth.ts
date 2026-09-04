export const SESSION_COOKIE = "bnz_app_session";
const MAX_AGE_MS = 1000 * 60 * 60 * 12; // 12h

/**
 * Web Crypto, not node:crypto — this module is imported by middleware, which
 * runs on the edge runtime.
 */
function secret() {
  return process.env.APP_SESSION_SECRET || "dev-only-insecure-secret";
}

async function hmac(message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Length-independent compare so a wrong guess leaks nothing useful. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Signed cookie value: "<issuedAt>.<hmac>". Boring on purpose. */
export async function issueSession(): Promise<string> {
  const issued = String(Date.now());
  return `${issued}.${await hmac(issued)}`;
}

export async function verifySession(value: string | undefined): Promise<boolean> {
  if (!value) return false;
  const [issued, sig] = value.split(".");
  if (!issued || !sig) return false;
  if (!safeEqual(sig, await hmac(issued))) return false;
  const age = Date.now() - Number(issued);
  return Number.isFinite(age) && age >= 0 && age < MAX_AGE_MS;
}

export function checkPasscode(input: string): boolean {
  return safeEqual(input, process.env.APP_PASSCODE || "bnz-office");
}
