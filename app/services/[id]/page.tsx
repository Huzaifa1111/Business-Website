import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServiceById, getServices } from "@/lib/api/services";
import { getSEO } from "@/lib/api/seo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const service = await getServiceById(params.id);
  if (!service) return { title: "Service Not Found" };

  // We could have specific SEO for each service, but for now we'll just use the service details
  return {
    title: `${service.title} | Our Services`,
    description: service.description,
  };
}

export default async function SingleServicePage({
  params,
}: {
  params: { id: string };
}) {
  const service = await getServiceById(params.id);

  if (!service) {
    notFound();
  }

  return (
    <>
      {/* ── Page Hero ── */}
      <PageHero
        eyebrow="Our Service"
        heading={service.title}
        subheading={service.description}
      />

      {/* ── Service Details ── */}
      <section className="section-padding bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left side: Icon and Features */}
            <Reveal direction="left">
              <div
                className="rounded-3xl p-8 lg:p-12 flex flex-col gap-8 shadow-card"
                style={{
                  background:
                    "linear-gradient(145deg, var(--color-primary-50), var(--color-primary-100))",
                }}
              >
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-sm flex-shrink-0">
                    {service.icon}
                  </div>
                  <h2
                    className="text-3xl font-bold text-neutral-900"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Key Features
                  </h2>
                </div>

                {service.features && service.features.length > 0 && (
                  <ul className="flex flex-col gap-4">
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-4 text-neutral-700 font-medium"
                      >
                        <div className="w-6 h-6 rounded-full bg-primary-200 text-primary-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M4 7l2 2 4-4"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>

            {/* Right side: Detailed Description and CTA */}
            <Reveal direction="right" delay={60}>
              <div className="flex flex-col gap-6">
                <h3
                  className="text-2xl font-bold text-neutral-900"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  About this service
                </h3>
                <p className="text-neutral-600 leading-relaxed text-lg">
                  {service.description}
                </p>

                <div className="pt-6 mt-2 border-t border-neutral-100 flex gap-4">
                  <Button href="/contact" size="lg">
                    Request Consultation
                  </Button>
                  <Button href="/services" variant="outline" size="lg">
                    View All Services
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-16 bg-neutral-50 border-t border-neutral-100">
        <Container className="text-center">
          <Reveal>
            <h2
              className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to transform your business?
            </h2>
            <p className="text-neutral-500 mb-8 max-w-xl mx-auto">
              Get in touch with our team to discuss how {service.title} can help you achieve your goals.
            </p>
            <Button href="/contact" size="lg">
              Get in Touch
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
