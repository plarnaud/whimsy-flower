import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatLine(label: string, value?: string) {
  if (!value) return "";
  return `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.INQUIRE_TO_EMAIL;
  const fromEmail =
    process.env.INQUIRE_FROM_EMAIL || "Whimsy Flower <inquire@whimsyflower.com>";

  if (!apiKey || !toEmail) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const occasion = String(body.occasion || "").trim();
  const date = String(body.date || "").trim();
  const budget = String(body.budget || "").trim();
  const referralSource = String(body.referralSource || "").trim();
  const notes = String(body.notes || "").trim();
  const website = String(body.website || "").trim();

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !occasion || !date || !budget) {
    return NextResponse.json(
      { error: "Name, email, occasion, date, and budget are required." },
      { status: 400 }
    );
  }

  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>New inquiry from ${escapeHtml(name)}</h2>
      ${formatLine("Email", email)}
      ${formatLine("Phone", phone)}
      ${formatLine("Occasion", occasion)}
      ${formatLine("Date", date)}
      ${formatLine("Budget", budget)}
      ${formatLine("How they heard about us", referralSource)}
      ${formatLine("Additional notes", notes)}
    </div>
  `;

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `New inquiry from ${name}`,
      reply_to: email,
      html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    // Server log only (visible in Vercel function logs); the visitor still
    // sees the generic message below.
    console.error("Resend error:", response.status, errorText);
    const errorMessage =
      process.env.NODE_ENV !== "production" && errorText
        ? `Resend error (${response.status}): ${errorText}`
        : "We could not send your inquiry. Please try again.";
    return NextResponse.json(
      { error: errorMessage },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
