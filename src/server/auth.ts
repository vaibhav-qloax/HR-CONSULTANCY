import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Minimal single-administrator authentication.
 *
 * - ADMIN_PASSWORD: the admin password (use a long, random value).
 * - ADMIN_SESSION_SECRET: at least 32 random characters used to sign
 *   session cookies.
 *
 * Every admin page, server action and route handler calls `requireAdmin`
 * or `isAdmin` on the server. Hiding UI is never relied upon for security.
 * For multiple staff accounts, replace this with a proper identity provider.
 */

export const SESSION_COOKIE = "qloax_admin";
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET;
  return s && s.length >= 32 ? s : null;
}

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.length >= 12 && secret());
}

function sign(payload: string, key: string) {
  return createHmac("sha256", key).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function checkPassword(candidate: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !adminConfigured()) return false;
  return safeEqual(candidate, expected);
}

export function createSessionToken(nowSeconds: number) {
  const key = secret();
  if (!key) throw new Error("ADMIN_SESSION_SECRET is not configured");
  const payload = Buffer.from(JSON.stringify({ sub: "admin", exp: nowSeconds + SESSION_TTL_SECONDS })).toString(
    "base64url",
  );
  return `${payload}.${sign(payload, key)}`;
}

export function verifySessionToken(token: string | undefined, nowSeconds: number) {
  const key = secret();
  if (!key || !token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  if (!safeEqual(signature, sign(payload, key))) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { exp?: number };
    return typeof data.exp === "number" && data.exp > nowSeconds;
  } catch {
    return false;
  }
}

export async function setSessionCookie() {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, createSessionToken(Math.floor(Date.now() / 1000)), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function isAdmin() {
  const jar = await cookies();
  return verifySessionToken(jar.get(SESSION_COOKIE)?.value, Math.floor(Date.now() / 1000));
}

/** Use at the top of every admin page and server action. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
