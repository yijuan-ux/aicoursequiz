import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const webhookUrl = process.env.ZAPIER_WEBHOOK_URL;
  if (!webhookUrl) return res.status(503).json({ error: "Lead delivery is not configured" });
  const { firstName, lastName, phone, email, course, match, consent } = req.body ?? {};
  if (![firstName, lastName, phone, email, course, match].every((value) => typeof value === "string" && value.trim())) return res.status(400).json({ error: "Missing required lead information" });
  if (consent !== true) return res.status(400).json({ error: "Consent is required" });
  try {
    const response = await fetch(webhookUrl, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ firstName, lastName, phone, email, course, match, consent, source: "AI Course Quiz" }) });
    if (!response.ok) throw new Error("Webhook delivery failed");
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: "We could not save your details. Please try again." });
  }
}
