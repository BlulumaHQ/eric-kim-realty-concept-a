import { useState } from "react";
import { Phone, Mail, Instagram, Send, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { useI18n } from "@/lib/i18n";

const interestKeys = [
  "ct.interest.resBuy",
  "ct.interest.resSell",
  "ct.interest.commercial",
  "ct.interest.presale",
  "ct.interest.investment",
  "ct.interest.general",
] as const;

const methodKeys = ["ct.method.phone", "ct.method.email", "ct.method.text"] as const;

export function ContactSection() {
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const schema = z.object({
    name: z.string().trim().min(1, t("val.name")).max(100),
    email: z.string().trim().email(t("val.email")).max(255),
    phone: z.string().trim().max(40).optional().or(z.literal("")),
    interest: z.string().min(1),
    message: z.string().trim().min(1, t("val.message")).max(2000),
    method: z.string().min(1),
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      interest: String(fd.get("interest") || ""),
      message: String(fd.get("message") || ""),
      method: String(fd.get("method") || ""),
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
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">{t("ct.eyebrow")}</span>
          </div>
          <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl text-navy text-balance">
            {t("ct.title")}
          </h2>
          <p className="mt-5 text-muted-foreground text-pretty">{t("ct.desc")}</p>

          <ul className="mt-8 space-y-4">
            <li>
              <a href="tel:+17788388993" className="group flex items-start gap-4 rounded-2xl border border-border bg-background p-5 hover:border-gold transition-colors">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold"><Phone className="h-5 w-5" /></span>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{t("ct.phone")}</p>
                  <p className="font-medium text-navy group-hover:text-gold">(778) 838-8993</p>
                </div>
              </a>
            </li>
            <li>
              <a href="mailto:erickim.realtor@outlook.com" className="group flex items-start gap-4 rounded-2xl border border-border bg-background p-5 hover:border-gold transition-colors">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold"><Mail className="h-5 w-5" /></span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{t("ct.email")}</p>
                  <p className="font-medium text-navy group-hover:text-gold break-all">erickim.realtor@outlook.com</p>
                </div>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/erickim.realtor" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 rounded-2xl border border-border bg-background p-5 hover:border-gold transition-colors">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold"><Instagram className="h-5 w-5" /></span>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{t("ct.instagram")}</p>
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
              <h3 className="mt-5 font-display text-2xl text-navy">{t("ct.received")}</h3>
              <p className="mt-2 text-muted-foreground max-w-md">{t("ct.thanks")}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={t("ct.fullName")} name="name" error={errors.name} required />
                <Field label={t("ct.email")} name="email" type="email" error={errors.email} required />
              </div>
              <Field label={t("ct.phoneLabel")} name="phone" type="tel" error={errors.phone} />

              <div>
                <Label>{t("ct.interest")}</Label>
                <select name="interest" defaultValue={t(interestKeys[5])} className={inputCls}>
                  {interestKeys.map((k) => <option key={k} value={t(k)}>{t(k)}</option>)}
                </select>
              </div>

              <div>
                <Label required>{t("ct.message")}</Label>
                <textarea name="message" rows={5} maxLength={2000} className={inputCls} placeholder={t("ct.placeholder")} />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>

              <div>
                <Label>{t("ct.preferred")}</Label>
                <div className="flex flex-wrap gap-2">
                  {methodKeys.map((k, idx) => (
                    <label key={k} className="cursor-pointer">
                      <input type="radio" name="method" value={t(k)} defaultChecked={idx === 0} className="peer sr-only" />
                      <span className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm peer-checked:bg-navy peer-checked:text-navy-foreground peer-checked:border-navy transition-colors">
                        {t(k)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-navy px-7 py-4 text-sm font-medium text-navy-foreground hover:bg-navy/90 transition">
                {t("ct.send")} <Send className="h-4 w-4" />
              </button>
              <p className="text-xs text-center text-muted-foreground">{t("ct.followNote")}</p>
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
