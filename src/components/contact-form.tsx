"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendMessage, type ContactState } from "@/app/actions";

const initialState: ContactState = { status: "idle" };

const field =
  "mt-1.5 w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-fg outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/20 aria-invalid:border-red-500";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, initialState);
  const startedAt = useRef<HTMLInputElement>(null);
  const firstSeen = useRef(0);

  // Stamp when the form became interactive; the server treats instant submits as bots.
  // React resets the form after each submit, so restore the original stamp every time.
  useEffect(() => {
    firstSeen.current ||= Date.now();
    if (startedAt.current) startedAt.current.value = String(firstSeen.current);
  }, [state]);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-accent bg-accent-soft p-8">
        <p className="font-serif text-2xl">Thanks, message sent!</p>
        <p className="mt-2 text-muted">I&apos;ll get back to you soon.</p>
      </div>
    );
  }

  const err = state.fieldErrors ?? {};

  return (
    <form action={action} noValidate className="space-y-5 rounded-2xl border border-line bg-surface p-6 sm:p-8">
      <input ref={startedAt} type="hidden" name="startedAt" />
      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium">Name</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            defaultValue={state.values?.name}
            aria-invalid={!!err.name}
            aria-describedby={err.name ? "name-error" : undefined}
            className={field}
          />
          {err.name && <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{err.name[0]}</p>}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={state.values?.email}
            aria-invalid={!!err.email}
            aria-describedby={err.email ? "email-error" : undefined}
            className={field}
          />
          {err.email && <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{err.email[0]}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={state.values?.message}
          aria-invalid={!!err.message}
          aria-describedby={err.message ? "message-error" : undefined}
          className={`${field} resize-y`}
        />
        {err.message && <p id="message-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{err.message[0]}</p>}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-fg transition hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        <p aria-live="polite" className="text-sm text-red-600 dark:text-red-400">
          {state.status === "error" ? state.message : ""}
        </p>
      </div>
    </form>
  );
}
