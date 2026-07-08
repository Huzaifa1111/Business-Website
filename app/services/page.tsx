import type { Metadata } from "next";
import { getServices, getServicesPageContent } from "@/lib/api/services";
import { getSEO } from "@/lib/api/seo";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEO("services");
  if (!seo) return { title: "Our Services" };
  
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    alternates: { canonical: seo.canonicalUrl },
    openGraph: {
      title: seo.ogTitle || seo.metaTitle,
      description: seo.ogDescription || seo.metaDescription,
      images: seo.ogImage ? [{ url: seo.ogImage }] : [],
    },
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
    }
  };
}

export default async function ServicesPage() {
  const [services, pageContent] = await Promise.all([
    getServices(),
    getServicesPageContent(),
  ]);

  const { hero, process, cta } = pageContent;

  return (
    <>
      {/* ── Page Hero ── */}
      <PageHero
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        subheading={hero.subheading}
      />

      {/* ── Services Grid ── */}
      <section
        aria-labelledby="services-list-heading"
        className="section-padding bg-white"
      >
        <Container>
          <div className="sr-only">
            <h2 id="services-list-heading">Full services listing</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={i * 60} direction="up">
                <article
                  aria-labelledby={`service-${service.id}-title`}
                  className="group h-full flex flex-col rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:border-primary-200 hover:shadow-hover transition-all duration-300"
                >
                  {/* Coloured top band */}
                  <div
                    className="h-2 w-full"
                    style={{
                      background: `linear-gradient(90deg, var(--color-primary-${[600, 500, 700, 600, 500, 700][i % 6]}), var(--color-accent-${[400, 500, 400, 500, 400, 500][i % 6]}))`,
                    }}
                    aria-hidden="true"
                  />

                  <div className="flex flex-col flex-1 p-7 gap-4">
                    {/* Icon + badge row */}
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--color-primary-50), var(--color-primary-100))",
                        }}
                        aria-hidden="true"
                      >
                        {service.icon}
                      </div>
                      {service.isFeatured && (
                        <Badge variant="primary">Featured</Badge>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      id={`service-${service.id}-title`}
                      className="text-xl font-bold text-neutral-900 group-hover:text-primary-700 transition-colors duration-200"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-600 text-sm leading-relaxed flex-1">
                      {service.description}
                    </p>

                    {/* Features list */}
                    {service.features && service.features.length > 0 && (
                      <ul
                        className="flex flex-col gap-1.5 mt-1"
                        aria-label={`${service.title} features`}
                      >
                        {service.features.slice(0, 4).map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2 text-xs text-neutral-600"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              className="flex-shrink-0 mt-0.5 text-primary-500"
                              aria-hidden="true"
                            >
                              <circle cx="7" cy="7" r="7" fill="currentColor" fillOpacity="0.1" />
                              <path
                                d="M4 7l2 2 4-4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* CTA */}
                    {service.ctaLink && service.ctaText && (
                      <div className="mt-auto pt-4 border-t border-neutral-100">
                        <Button
                          href={service.ctaLink}
                          variant="outline"
                          size="sm"
                          className="w-full justify-center"
                        >
                          {service.ctaText}
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M2 7h10M8 3l4 4-4 4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Button>
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Process strip ── */}
      <section
        aria-labelledby="process-heading"
        className="section-padding bg-neutral-50 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none bg-grid-pattern opacity-40"
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <Reveal>
            <SectionHeading
              id="process-heading"
              eyebrow={process.eyebrow}
              heading={process.heading}
              subheading={process.subheading}
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.steps.map(({ step, title, description }, i) => (
              <Reveal key={step} delay={i * 70} direction="up">
                <div className="relative flex flex-col gap-3 p-6 bg-white rounded-2xl border border-neutral-200 shadow-card hover:shadow-hover hover:border-primary-200 transition-all duration-300 card-hover">
                  <span
                    className="text-5xl font-bold text-primary-100 leading-none select-none"
                    aria-hidden="true"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step}
                  </span>
                  <h3
                    className="text-base font-bold text-neutral-900"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Bottom CTA ── */}
      <section
        aria-label="Get started CTA"
        className="py-16 bg-white border-t border-neutral-100"
      >
        <Container className="text-center">
          <Reveal>
            <h2
              className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {cta.heading}
            </h2>
            <p className="text-neutral-500 mb-7 max-w-xl mx-auto">
              {cta.subheading}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href={cta.primaryButtonLink} size="lg">
                {cta.primaryButtonText}
              </Button>
              <Button href={cta.secondaryButtonLink} variant="outline" size="lg">
                {cta.secondaryButtonText}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
