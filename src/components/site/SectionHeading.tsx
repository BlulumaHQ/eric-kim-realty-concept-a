type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "center" }: Props) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow && (
        <div
          className={`flex items-center gap-3 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="gold-divider" />
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
            {eyebrow}
          </span>
          <span className="gold-divider" />
        </div>
      )}
      <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl text-navy text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-muted-foreground text-pretty">
          {description}
        </p>
      )}
    </div>
  );
}
