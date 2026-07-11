import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { IntroSection as IntroSectionType } from "@/lib/types";

interface Props {
  data: IntroSectionType;
}

export function IntroSection({ data }: Props) {
  const textColor = data.textColor || "#252118";
  const accentColor = data.accentColor || "#4f46e5";

  return (
    <section
      aria-labelledby="intro-heading"
      className="section-padding bg-neutral-50 relative overflow-hidden"
      style={{ color: textColor }}
    >
      {/* Subtle background accent */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            `radial-gradient(ellipse at 80% 50%, ${accentColor}1A 0%, transparent 70%)`,
        }}
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text column */}
          <div>
            <Reveal direction="left">
              <SectionHeading
                id="intro-heading"
                eyebrow="Who We Are"
                heading={data.heading}
                align="left"
              />
            </Reveal>
            <Reveal delay={100} direction="left">
              <p className="mt-6 leading-relaxed text-lg" style={{ color: textColor, opacity: 0.8 }}>
                {data.body}
              </p>
            </Reveal>
          </div>

          {/* Stats column */}
          <Reveal direction="right" delay={150}>
            <div className="grid grid-cols-2 gap-4">
              {data.statsItems.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-card border border-neutral-100 flex flex-col gap-1 card-hover"
                >
                  <span
                    className="text-4xl font-bold bg-clip-text text-transparent"
                    style={{ 
                      fontFamily: "var(--font-display)", 
                      backgroundImage: `linear-gradient(to right, ${textColor}, ${accentColor})` 
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-sm font-medium leading-snug" style={{ color: textColor, opacity: 0.7 }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
