import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FROM = "Upstream Waitlist <hello@upstreamcv.com>";
const TO = "hello@upstreamcv.com";

const MAX = {
  name: 200,
  email: 200,
  company: 200,
  companyType: 120,
  companyTypeOther: 120,
  cameras: 80,
  context: 2000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Per-IP rate limit: 5 submissions per 10 minutes per IP. Map lives on the
// module — survives across requests on a warm instance but resets on cold
// start. That's fine for an unannounced waitlist; if traffic ever warrants
// a sturdier guard we switch to Turnstile.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function takeIpToken(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface Submission {
  name: string;
  email: string;
  company: string;
  companyType: string;
  companyTypeOther: string;
  cameras: string;
  context: string;
}

export async function POST(req: Request) {
  // Honeypot + payload parse. Bots that fill every field land here; humans
  // never see the trap input so it stays empty.
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;
  if (typeof raw._hp === "string" && raw._hp.trim().length > 0) {
    // Silently accept so bots don't learn the trap.
    return Response.json({ ok: true });
  }

  const s: Submission = {
    name: String(raw.name ?? "").trim(),
    email: String(raw.email ?? "").trim(),
    company: String(raw.company ?? "").trim(),
    companyType: String(raw.companyType ?? "").trim(),
    companyTypeOther: String(raw.companyTypeOther ?? "").trim(),
    cameras: String(raw.cameras ?? "").trim(),
    context: String(raw.context ?? "").trim(),
  };

  if (!s.name || s.name.length > MAX.name) {
    return Response.json({ error: "Name required." }, { status: 400 });
  }
  if (!s.email || s.email.length > MAX.email || !EMAIL_RE.test(s.email)) {
    return Response.json({ error: "Valid email required." }, { status: 400 });
  }
  if (!s.company || s.company.length > MAX.company) {
    return Response.json({ error: "Company required." }, { status: 400 });
  }
  if (!s.companyType || s.companyType.length > MAX.companyType) {
    return Response.json({ error: "Company type required." }, { status: 400 });
  }
  if (s.companyTypeOther.length > MAX.companyTypeOther) {
    return Response.json({ error: "Company type too long." }, { status: 400 });
  }
  if (s.companyType === "Other" && !s.companyTypeOther) {
    return Response.json(
      { error: "Tell us your company type." },
      { status: 400 },
    );
  }
  if (s.cameras.length > MAX.cameras) {
    return Response.json({ error: "Cameras too long." }, { status: 400 });
  }
  if (s.context.length > MAX.context) {
    return Response.json({ error: "Context too long." }, { status: 400 });
  }

  const ip = clientIp(req);
  if (!takeIpToken(ip)) {
    return Response.json(
      { error: "Too many submissions. Try again in a few minutes." },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[waitlist] RESEND_API_KEY missing");
    return Response.json({ error: "Mail service unavailable." }, { status: 503 });
  }

  const userAgent = req.headers.get("user-agent") ?? "unknown";
  const subject = `Waitlist · ${s.company} · ${s.name}`;
  const companyTypeDisplay =
    s.companyType === "Other" && s.companyTypeOther
      ? `Other: ${s.companyTypeOther}`
      : s.companyType;

  const html = `<!doctype html>
<html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#111;max-width:640px;margin:0 auto;padding:24px;">
  <h2 style="margin:0 0 4px;font-size:18px;">New waitlist submission</h2>
  <div style="color:#888;font-size:12px;margin-bottom:20px;">${escapeHtml(new Date().toISOString())}</div>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:14px;">
    <tr><td style="padding:6px 12px 6px 0;color:#888;width:140px;vertical-align:top;">Name</td><td style="padding:6px 0;"><strong>${escapeHtml(s.name)}</strong></td></tr>
    <tr><td style="padding:6px 12px 6px 0;color:#888;vertical-align:top;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(s.email)}">${escapeHtml(s.email)}</a></td></tr>
    <tr><td style="padding:6px 12px 6px 0;color:#888;vertical-align:top;">Company</td><td style="padding:6px 0;">${escapeHtml(s.company)}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;color:#888;vertical-align:top;">Company type</td><td style="padding:6px 0;">${escapeHtml(companyTypeDisplay) || "<em>not given</em>"}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;color:#888;vertical-align:top;">Cameras</td><td style="padding:6px 0;">${escapeHtml(s.cameras) || "<em>not given</em>"}</td></tr>
  </table>
  ${
    s.context
      ? `<div style="margin-top:20px;"><div style="color:#888;font-size:12px;margin-bottom:6px;">CONTEXT</div><div style="padding:12px 14px;background:#f5f5f0;border-radius:8px;white-space:pre-wrap;font-size:14px;line-height:1.55;">${escapeHtml(s.context)}</div></div>`
      : ""
  }
  <div style="margin-top:24px;padding-top:16px;border-top:1px solid #eee;color:#aaa;font-size:11px;">
    IP ${escapeHtml(ip)} · UA ${escapeHtml(userAgent.slice(0, 200))}
  </div>
</body></html>`;

  const text = [
    `New waitlist submission`,
    new Date().toISOString(),
    ``,
    `Name:     ${s.name}`,
    `Email:    ${s.email}`,
    `Company:  ${s.company}`,
    `Type:     ${companyTypeDisplay || "(not given)"}`,
    `Cameras:  ${s.cameras || "(not given)"}`,
    ``,
    s.context ? `Context:\n${s.context}` : "(no context)",
    ``,
    `--`,
    `IP ${ip}`,
    `UA ${userAgent.slice(0, 200)}`,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: s.email,
      subject,
      html,
      text,
    });

    if (result.error) {
      console.error("[waitlist] resend error", result.error);
      return Response.json({ error: "Mail send failed." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[waitlist] unexpected", err);
    return Response.json({ error: "Mail send failed." }, { status: 502 });
  }
}
