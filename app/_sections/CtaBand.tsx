import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { CtaSection as CtaSectionType } from "@/lib/types";

interface Props {
  data: CtaSectionType;
}

export function CtaBand({ data }: Props) {
  const textColor = data.textColor || "#ffffff";
  const accentColor = data.accentColor || "#4f46e5";

  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden py-20 lg:py-24"
      style={{
        background: `linear-gradient(135deg, ${accentColor} 0%, var(--color-primary-800) 60%, var(--color-primary-950) 100%)`,
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-15"
          style={{ background: `radial-gradient(circle, ${textColor} 0%, transparent 70%)` }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-15" />
      </div>

      <Container className="relative z-10 text-center">
        <Reveal>
          <h2
            id="cta-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold max-w-3xl mx-auto leading-tight mb-5"
            style={{ fontFamily: "var(--font-display)", color: textColor }}
          >
            {data.heading}
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: textColor, opacity: 0.8 }}>
            {data.subheading}
          </p>
        </Reveal>

        <Reveal delay={160}>
          <Button
            href={data.buttonLink}
            variant="secondary"
            size="lg"
            className="shadow-lg hover:shadow-xl"
            style={{ color: accentColor }}
          >
            {data.buttonText}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </Reveal>

        {/* Supporting trust badge */}
        <Reveal delay={240}>
          <p className="mt-6 text-sm" style={{ color: textColor, opacity: 0.7 }}>
            No commitment required · Response within 24 hours
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
