import { useState } from "react";
import { Phone, Mail, Instagram, Send, CheckCircle2 } from "lucide-react";
import { z } from "zod";

const interests = [
  "Residential Buying",
  "Residential Selling",
  "Commercial Real Estate",
  "Presale Projects",
  "Investment Opportunity",
  "General Consultation",
] as const;

const methods = ["Phone", "Email", "Text Message"] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  interest: z.enum(interests),
  message: z.string().trim().min(1, "Please add a short message").max(2000),
  method: z.enum(methods),
});

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      interest: String(fd.get("interest") || "") as (typeof interests)[number],
      message: String(fd.get("message") || ""),
      method: String(fd.get("method") || "") as (typeof methods)[number],
    };
    const result = schema.safeParse(data);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const i of result.error.issues) {
        const k = String(i.path[0] ?? "");
        if (k && !next[k]) next[k] = i.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  return (
    <section id="contact" className="bg-cream py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="gold-divider" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">Contact</span>
          </div>
          <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl text-navy text-balance">
            Book a Real Estate Consultation
          </h2>
          <p className="mt-5 text-muted-foreground text-pretty">
            Whether you are buying, selling, investing, exploring commercial real estate, or reviewing presale opportunities, contact Eric directly to discuss your next step.
          </p>

          <ul className="mt-8 space-y-4">
            <li>
              <a href="tel:+17788388993" className="group flex items-start gap-4 rounded-2xl border border-border bg-background p-5 hover:border-gold transition-colors">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold"><Phone className="h-5 w-5" /></span>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Phone</p>
                  <p className="font-medium text-navy group-hover:text-gold">(778) 838-8993</p>
                </div>
              </a>
            </li>
            <li>
              <a href="mailto:erickim.realtor@outlook.com" className="group flex items-start gap-4 rounded-2xl border border-border bg-background p-5 hover:border-gold transition-colors">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold"><Mail className="h-5 w-5" /></span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Email</p>
                  <p className="font-medium text-navy group-hover:text-gold break-all">erickim.realtor@outlook.com</p>
                </div>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/erickim.realtor" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 rounded-2xl border border-border bg-background p-5 hover:border-gold transition-colors">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold"><Instagram className="h-5 w-5" /></span>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Instagram</p>
                  <p className="font-medium text-navy group-hover:text-gold">@erickim.realtor</p>
                </div>
              </a>
            </li>
          </ul>
        </div>

        <div className="rounded-3xl bg-background border border-border p-6 md:p-10 shadow-elegant">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <CheckCircle2 className="h-14 w-14 text-gold" />
              <h3 className="mt-5 font-display text-2xl text-navy">Inquiry Received</h3>
              <p className="mt-2 text-muted-foreground max-w-md">
                Thank you. Eric will follow up directly regarding your inquiry.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" name="name" error={errors.name} required />
                <Field label="Email" name="email" type="email" error={errors.email} required />
              </div>
              <Field label="Phone" name="phone" type="tel" error={errors.phone} />

              <div>
                <Label>I&apos;m interested in</Label>
                <select name="interest" defaultValue={interests[5]} className={inputCls}>
                  {interests.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>

              <div>
                <Label required>Message</Label>
                <textarea name="message" rows={5} maxLength={2000} className={inputCls} placeholder="Tell Eric about your goals, timeline, or questions..." />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>

              <div>
                <Label>Preferred Contact Method</Label>
                <div className="flex flex-wrap gap-2">
                  {methods.map((m, idx) => (
                    <label key={m} className="cursor-pointer">
                      <input type="radio" name="method" value={m} defaultChecked={idx === 0} className="peer sr-only" />
                      <span className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm peer-checked:bg-navy peer-checked:text-navy-foreground peer-checked:border-navy transition-colors">
                        {m}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-navy px-7 py-4 text-sm font-medium text-navy-foreground hover:bg-navy/90 transition">
                Send Inquiry <Send className="h-4 w-4" />
              </button>
              <p className="text-xs text-center text-muted-foreground">
                Eric will follow up directly regarding your inquiry.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition";

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs uppercase tracking-[0.16em] text-charcoal font-medium mb-1.5">
      {children}
      {required && <span className="text-gold ml-1">*</span>}
    </label>
  );
}

function Field({
  label, name, type = "text", error, required,
}: { label: string; name: string; type?: string; error?: string; required?: boolean }) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <input type={type} name={name} maxLength={255} className={inputCls} />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
