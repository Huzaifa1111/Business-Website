interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  heading,
  subheading,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest text-primary-600 uppercase">
          <span className="block w-6 h-px bg-primary-600" />
          {eyebrow}
          <span className="block w-6 h-px bg-primary-600" />
        </span>
      )}
      <h2
        id={id}
        className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {heading}
      </h2>
      {subheading && (
        <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed">
          {subheading}
        </p>
      )}
      <div className="divider mt-1" />
    </div>
  );
}
