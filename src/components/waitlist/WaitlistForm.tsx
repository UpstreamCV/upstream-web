"use client";

/**
 * Waitlist form — frosted card with editorial inputs. POSTs to a stub
 * endpoint (no backend yet). On success shows a stylized receipt; on
 * failure shows a retry + mailto fallback so a real future POST that
 * fails doesn't strand the user. Inline validation runs on blur for
 * required fields and email shape; the context textarea is capped.
 */

import { useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "@/lib/motion";
import { MagneticButton } from "@/components/atmosphere/MagneticButton";

interface Payload {
  name: string;
  email: string;
  company: string;
  companyType: string;
  companyTypeOther: string;
  cameras: string;
  context: string;
}

type FieldKey = keyof Payload;
type FieldErrors = Partial<Record<FieldKey, string>>;
type Touched = Partial<Record<FieldKey, boolean>>;
type State = "idle" | "submitting" | "done" | "error";

const EMPTY: Payload = {
  name: "",
  email: "",
  company: "",
  companyType: "",
  companyTypeOther: "",
  cameras: "",
  context: "",
};

const REQUIRED: FieldKey[] = ["name", "email", "company", "companyType"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTEXT_MAX = 2000;
const CONTEXT_WARN = 1900;
const ERROR_RED = "#c0473b";

// Company types skew to the verticals that actually run production computer
// vision. "Other" reveals a freeform field (see the form body) and makes that
// freeform value required, so we never force a respondent into a bad fit.
const COMPANY_TYPES = [
  "Manufacturing & industrial",
  "Logistics & warehousing",
  "Retail",
  "Security & surveillance",
  "Agriculture",
  "Healthcare & medical imaging",
  "Autonomous vehicles & ADAS",
  "Robotics",
  "Drones & geospatial",
  "Smart cities & transportation",
  "Construction",
  "CV platform / tooling",
  "Research & academia",
  "Other",
];

function validateField(k: FieldKey, all: Payload): string | undefined {
  const value = all[k];
  if (REQUIRED.includes(k) && !value.trim()) return "Required.";
  if (k === "email" && value.trim() && !EMAIL_RE.test(value.trim())) {
    return "Email needs an @ and a domain.";
  }
  if (k === "companyTypeOther" && all.companyType === "Other" && !value.trim()) {
    return "Required.";
  }
  if (k === "context" && value.length > CONTEXT_MAX) {
    return `Keep it under ${CONTEXT_MAX} characters.`;
  }
  return undefined;
}

function validateAll(v: Payload): FieldErrors {
  const errs: FieldErrors = {};
  (Object.keys(v) as FieldKey[]).forEach((k) => {
    const e = validateField(k, v);
    if (e) errs[k] = e;
  });
  return errs;
}

export function WaitlistForm() {
  const [v, setV] = useState<Payload>(EMPTY);
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Touched>({});
  const formRef = useRef<HTMLFormElement | null>(null);

  const update =
    (k: FieldKey) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const next = e.target.value;
      // Build the would-be next payload so cross-field rules (the "Other"
      // company type) validate against fresh state. Leaving "Other" clears the
      // freeform value so a stale custom type never ships.
      const nextV: Payload = { ...v, [k]: next };
      if (k === "companyType" && next !== "Other") nextV.companyTypeOther = "";
      setV(nextV);
      // Re-validate live only after the user has already left the field once,
      // so errors clear as they fix the problem without nagging mid-typing.
      if (touched[k]) {
        setErrors((prev) => {
          const ne: FieldErrors = { ...prev, [k]: validateField(k, nextV) };
          if (k === "companyType" && next !== "Other") {
            ne.companyTypeOther = undefined;
          }
          return ne;
        });
      }
    };

  const handleBlur = (k: FieldKey) => () => {
    setTouched((prev) => ({ ...prev, [k]: true }));
    setErrors((prev) => ({ ...prev, [k]: validateField(k, v) }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const allTouched: Touched = {};
    (Object.keys(v) as FieldKey[]).forEach((k) => (allTouched[k] = true));
    setTouched(allTouched);

    const errs = validateAll(v);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstInvalid = (Object.keys(v) as FieldKey[]).find((k) => errs[k]);
      if (firstInvalid && formRef.current) {
        const el = formRef.current.elements.namedItem(
          firstInvalid,
        ) as HTMLElement | null;
        el?.focus();
      }
      return;
    }

    setErrors({});
    setState("submitting");

    try {
      const hp =
        formRef.current?.elements.namedItem("_hp") instanceof
        HTMLInputElement
          ? (formRef.current.elements.namedItem("_hp") as HTMLInputElement).value
          : "";
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, _hp: hp }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setState("done");
    } catch {
      setState("error");
    }
  };

  const retry = () => setState("idle");

  const mailtoHref = `mailto:hello@upstreamcv.com?subject=${encodeURIComponent(
    `Waitlist · ${v.company || "no company"}`,
  )}&body=${encodeURIComponent(
    [
      `Name: ${v.name}`,
      `Email: ${v.email}`,
      `Company: ${v.company}`,
      `Company type: ${
        v.companyType === "Other"
          ? `Other: ${v.companyTypeOther}`
          : v.companyType
      }`,
      `Cameras in production: ${v.cameras || "(not given)"}`,
      ``,
      v.context,
    ].join("\n"),
  )}`;

  const contextLen = v.context.length;
  const contextCounterColor =
    contextLen > CONTEXT_MAX
      ? ERROR_RED
      : contextLen > CONTEXT_WARN
        ? "var(--accent-warm)"
        : "var(--ink-faint)";

  return (
    <div className="glass-pane is-static relative overflow-hidden rounded-3xl p-8 md:p-12">
      <AnimatePresence mode="wait" initial={false}>
        {state !== "done" ? (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6, ease: EASE.outQuint }}
            className="relative grid grid-cols-12 gap-x-5 gap-y-7"
          >
            {/* Honeypot — visually hidden, off the tab order. Bots that
                fill every input fill this too; humans never see it. The
                /api/waitlist handler silently 200s when this is non-empty
                so bots don't learn the trap. */}
            <div aria-hidden="true" className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
              <label htmlFor="wf-_hp">Leave this empty</label>
              <input
                id="wf-_hp"
                name="_hp"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                defaultValue=""
              />
            </div>
            <Field
              name="name"
              className="col-span-12 md:col-span-6"
              label="Name"
              value={v.name}
              onChange={update("name")}
              onBlur={handleBlur("name")}
              error={touched.name ? errors.name : undefined}
              required
              placeholder="Jordan Patel"
              autoComplete="name"
            />
            <Field
              name="email"
              className="col-span-12 md:col-span-6"
              label="Work email"
              type="email"
              value={v.email}
              onChange={update("email")}
              onBlur={handleBlur("email")}
              error={touched.email ? errors.email : undefined}
              required
              placeholder="jordan@logistics.co"
              autoComplete="email"
            />
            <Field
              name="company"
              className="col-span-12 md:col-span-6"
              label="Company name"
              value={v.company}
              onChange={update("company")}
              onBlur={handleBlur("company")}
              error={touched.company ? errors.company : undefined}
              required
              placeholder="Northwest Logistics"
              autoComplete="organization"
            />
            <SelectField
              name="companyType"
              className="col-span-12 md:col-span-6"
              label="Company type"
              value={v.companyType}
              onChange={update("companyType")}
              onBlur={handleBlur("companyType")}
              error={touched.companyType ? errors.companyType : undefined}
              required
            >
              <option value="">Select the closest fit</option>
              {COMPANY_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </SelectField>

            <AnimatePresence initial={false}>
              {v.companyType === "Other" ? (
                <motion.div
                  key="companyTypeOther"
                  className="col-span-12"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: EASE.outQuint }}
                >
                  <Field
                    name="companyTypeOther"
                    label="Your company type"
                    value={v.companyTypeOther}
                    onChange={update("companyTypeOther")}
                    onBlur={handleBlur("companyTypeOther")}
                    error={
                      touched.companyTypeOther
                        ? errors.companyTypeOther
                        : undefined
                    }
                    required
                    placeholder="e.g. wildlife monitoring"
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>

            <SelectField
              name="cameras"
              className="col-span-12"
              label="Cameras in production"
              value={v.cameras}
              onChange={update("cameras")}
              onBlur={handleBlur("cameras")}
            >
              <option value="">Pick a range (optional)</option>
              <option>1–10</option>
              <option>10–50</option>
              <option>50–200</option>
              <option>200–1000</option>
              <option>1000+</option>
            </SelectField>

            <TextField
              name="context"
              className="col-span-12"
              label="Any additional info we should know"
              value={v.context}
              onChange={update("context")}
              onBlur={handleBlur("context")}
              error={touched.context ? errors.context : undefined}
              placeholder="Anything that helps us understand your setup: deployment scale, timeline, the problem you most want solved."
              rows={4}
              maxLength={CONTEXT_MAX}
              footer={
                <span
                  className="font-mono text-[10px] tracking-mono"
                  style={{ color: contextCounterColor }}
                >
                  {contextLen}/{CONTEXT_MAX}
                </span>
              }
            />

            {state === "error" ? (
              <div
                role="alert"
                aria-live="polite"
                className="col-span-12 mt-2 rounded-2xl border p-5"
                style={{
                  borderColor: `${ERROR_RED}66`,
                  background: `${ERROR_RED}14`,
                }}
              >
                <p
                  className="font-mono text-[10px] tracking-kicker uppercase"
                  style={{ color: ERROR_RED }}
                >
                  didn&apos;t go through
                </p>
                <p className="mt-3 text-ink leading-relaxed">
                  Something on our side dropped the request. Try again, or
                  email us directly.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-5">
                  <button
                    type="button"
                    onClick={retry}
                    className="inline-flex items-center gap-2 rounded-full bg-creek-deep px-5 py-2.5 text-[13px] font-semibold text-ink transition-all duration-300 hover:translate-y-[-1px] hover:bg-[#3D5731]"
                  >
                    Try again
                  </button>
                  <a
                    href={mailtoHref}
                    className="font-mono text-[11px] tracking-mono uppercase text-ink-soft underline underline-offset-4 hover:text-ink"
                  >
                    hello@upstreamcv.com
                  </a>
                </div>
              </div>
            ) : (
              <div className="col-span-12 mt-2 flex flex-wrap items-center justify-between gap-4">
                <div className="font-mono text-[10px] tracking-mono uppercase text-ink-mute">
                  we&apos;ll take it from here
                </div>
                <MagneticButton
                  type="submit"
                  variant="ghost"
                  disabled={state === "submitting"}
                  ariaLabel="Waitlist"
                  className="text-[14px] font-semibold !px-9 !py-[18px] border-ink/45 hover:border-ink/75"
                >
                  <span>
                    {state === "submitting" ? "Sending…" : "Waitlist"}
                  </span>
                  <span aria-hidden="true" className="font-mono text-sm">
                    →
                  </span>
                </MagneticButton>
              </div>
            )}
          </motion.form>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE.outQuint }}
            className="relative"
          >
            <div className="font-mono text-[10px] tracking-kicker uppercase text-signal-ok">
              ✓ received
            </div>
            <h3
              className="mt-6 font-display text-ink"
              style={{
                fontSize: "clamp(28px, 3.4vw, 48px)",
                lineHeight: 1.1,
                letterSpacing: "-0.022em",
                fontWeight: 400,
              }}
            >
              You&apos;re on the list.
            </h3>
            <p className="mt-6 max-w-[50ch] text-ink-soft" style={{ lineHeight: 1.65 }}>
              Thanks, {v.name.split(" ")[0] || "friend"}. We&apos;ll reach out
              the moment we&apos;re ready to onboard you, your $100 in credits
              and early access waiting. Nothing from us before then.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */

interface FieldBaseProps {
  className?: string;
  label: string;
  error?: string;
  required?: boolean;
}

function FieldLabel({
  label,
  required,
  htmlFor,
}: {
  label: string;
  required?: boolean;
  htmlFor: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-mono text-[10px] tracking-kicker uppercase text-ink-mute"
    >
      {label}
      {required ? <span className="ml-1 text-accent">*</span> : null}
    </label>
  );
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p
      id={id}
      className="mt-2 font-mono text-[10px] tracking-mono"
      style={{ color: ERROR_RED }}
    >
      {error}
    </p>
  );
}

function Field({
  className = "",
  label,
  required,
  type = "text",
  error,
  name,
  ...rest
}: FieldBaseProps & {
  type?: string;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = `wf-${name}`;
  const errorId = `${id}-error`;
  return (
    <div className={`block ${className}`}>
      <FieldLabel label={label} required={required} htmlFor={id} />
      <input
        id={id}
        name={name}
        type={type}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...rest}
        className="wf-field mt-2 w-full text-base text-ink placeholder:text-ink-mute"
      />
      <FieldError id={errorId} error={error} />
    </div>
  );
}

function SelectField({
  className = "",
  label,
  children,
  error,
  name,
  required,
  ...rest
}: FieldBaseProps & {
  children: React.ReactNode;
  name: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = `wf-${name}`;
  const errorId = `${id}-error`;
  return (
    <div className={`block ${className}`}>
      <FieldLabel label={label} required={required} htmlFor={id} />
      <select
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...rest}
        className="wf-field mt-2 w-full appearance-none text-base text-ink"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'><path d='M2 4 l4 4 4-4' fill='none' stroke='rgba(245,241,231,0.6)' stroke-width='1.2'/></svg>\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.9rem center",
          backgroundSize: "10px",
          paddingRight: "2.25rem",
        }}
      >
        {children}
      </select>
      <FieldError id={errorId} error={error} />
    </div>
  );
}

function TextField({
  className = "",
  label,
  error,
  name,
  footer,
  ...rest
}: FieldBaseProps & {
  name: string;
  footer?: React.ReactNode;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = `wf-${name}`;
  const errorId = `${id}-error`;
  return (
    <div className={`block ${className}`}>
      <FieldLabel label={label} htmlFor={id} />
      <textarea
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...rest}
        className="wf-field mt-2 w-full resize-none text-base text-ink placeholder:text-ink-mute"
      />
      <div className="mt-2 flex items-baseline justify-between gap-3">
        <FieldError id={errorId} error={error} />
        {footer ? <div className="ml-auto">{footer}</div> : null}
      </div>
    </div>
  );
}
