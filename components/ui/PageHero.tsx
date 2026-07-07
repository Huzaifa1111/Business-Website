import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";

interface PageHeroProps {
  eyebrow: string;
  heading: string;
  subheading: string;
  badge?: string;
}

/**
 * Shared inner-page hero used by About, Services, Contact.
 * Lighter than the home hero — no illustration, just centered text on a gradient.
 */
export function PageHero({ eyebrow, heading, subheading, badge }: PageHeroProps) {
  return (
    <section
      aria-label="Page header"
      className="relative overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-20"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, var(--color-primary-50) 0%, #fff 60%)",
          }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, var(--color-primary-300) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, var(--color-accent-300) 0%, transparent 70%)",
          }}
        />
      </div>

      <Container className="relative z-10 text-center">
        {badge && (
          <div className="flex justify-center mb-5">
            <Badge variant="primary">{badge}</Badge>
          </div>
        )}

        <Reveal>
          <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest text-primary-600 uppercase mb-4">
            <span className="block w-6 h-px bg-primary-600" aria-hidden="true" />
            {eyebrow}
            <span className="block w-6 h-px bg-primary-600" aria-hidden="true" />
          </span>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight max-w-4xl mx-auto mt-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {heading}
          </h1>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-5 text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            {subheading}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
