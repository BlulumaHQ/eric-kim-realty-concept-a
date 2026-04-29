type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  invert?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
  invert = false,
}: Props) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div
          className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}
        >
          <span className="h-px w-10 bg-gold" />
          <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-gold">
            {eyebrow}
          </span>
          {center && <span className="h-px w-10 bg-gold" />}
        </div>
      )}
      <h2
        className={`mt-5 font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.1] text-balance ${
          invert ? "text-navy-foreground" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-pretty text-lg leading-relaxed ${
            invert ? "text-navy-foreground/75" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
