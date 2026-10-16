"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string[]>>;
  values?: { name: string; email: string; message: string };
};

const schema = z.object({
  name: z.string().trim().min(1, "Please add your name.").max(100),
  email: z.email("That email doesn't look right."),
  message: z
    .string()
    .trim()
    .min(10, "A little more detail, please (10+ characters).")
    .max(5000, "Please keep it under 5,000 characters."),
});

const MIN_FILL_MS = 3000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;

// Best-effort per-instance limiter. Serverless instances don't share memory, so this
// stops casual abuse only; swap in Upstash/Vercel KV if spam becomes a problem.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  // Bots fill the hidden field or submit instantly. Pretend success so they don't adapt.
  const startedAt = Number(formData.get("startedAt"));
  if (formData.get("website") || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "success" };
  }

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values,
    };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return {
      status: "error",
      message: "You've sent a few messages already. Please try again later.",
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form is not configured: set RESEND_API_KEY and CONTACT_TO_EMAIL.");
    return {
      status: "error",
      message: "The contact form isn't working right now. Please reach out on LinkedIn instead.",
      values,
    };
  }

  const { name, email, message } = parsed.data;
  const { error } = await new Resend(apiKey).emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again, or reach out on LinkedIn.",
      values,
    };
  }

  return { status: "success" };
}
