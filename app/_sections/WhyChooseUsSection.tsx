import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { WhyChooseUsSection as WhyChooseUsSectionType } from "@/lib/types";

interface Props {
  data: WhyChooseUsSectionType;
}

export function WhyChooseUsSection({ data }: Props) {
  // Show max 4 items on home page — all 6 can live on a full features page
  const displayItems = data.items.slice(0, 4);

  return (
    <section
      aria-labelledby="why-us-heading"
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, var(--color-primary-950) 0%, var(--color-primary-800) 100%)" }}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, var(--color-accent-400) 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      </div>

      <Container className="relative z-10">
        <Reveal>
          <SectionHeading
            id="why-us-heading"
            eyebrow="Why Apex"
            heading={data.heading}
            subheading={data.subheading}
            className="[&_h2]:text-white [&_p]:text-primary-200 [&_span]:text-primary-300 [&_span.block]:bg-primary-400"
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {displayItems.map((item, i) => (
            <Reveal key={item.title} delay={i * 90} direction="up">
              <div className="flex gap-5 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                {/* Icon badge */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                  aria-hidden="true"
                >
                  {item.icon}
                </div>
                <div>
                  <h3
                    className="text-lg font-bold text-white mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-primary-200 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
