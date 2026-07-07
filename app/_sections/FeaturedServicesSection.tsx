import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import type { Service } from "@/lib/types";

interface Props {
  services: Service[];
}

export function FeaturedServicesSection({ services }: Props) {
  if (!services.length) return null;

  return (
    <section
      aria-labelledby="services-heading"
      className="section-padding bg-white"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="services-heading"
            eyebrow="What We Do"
            heading="Our Core Services"
            subheading="End-to-end consulting across strategy, operations, technology, and people — so you never need more than one trusted partner."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 80} direction="up">
              <Card
                hover
                variant="bordered"
                className="h-full flex flex-col group border-neutral-200 hover:border-primary-200 transition-colors duration-300"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-primary-50), var(--color-primary-100))",
                  }}
                  aria-hidden="true"
                >
                  {service.icon}
                </div>

                {/* Title */}
                <h3
                  className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-700 transition-colors duration-200"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {service.title}
                </h3>

                {/* Short description — trim to first 2 sentences */}
                <p className="text-neutral-600 text-sm leading-relaxed flex-1">
                  {service.description.split(". ").slice(0, 2).join(". ")}.
                </p>

                {/* CTA link */}
                {service.ctaLink && (
                  <Link
                    href={service.ctaLink}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors group/link"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn more
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover/link:translate-x-1"
                    >
                      <path
                        d="M2 7h10M8 3l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                )}
              </Card>
            </Reveal>
          ))}
        </div>

        {/* View all services link */}
        <Reveal delay={250}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 underline underline-offset-4 decoration-primary-200 hover:decoration-primary-400 transition-all duration-200"
            >
              View all 6 services
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
