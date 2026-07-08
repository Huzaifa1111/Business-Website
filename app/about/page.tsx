import type { Metadata } from "next";
import { getAboutContent } from "@/lib/api/about";
import { getSEO } from "@/lib/api/seo";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEO("about");
  if (!seo) return { title: "About Us" };
  
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

export default async function AboutPage() {
  const about = await getAboutContent();
  const { overview, mission, vision, values, teamMembers } = about;

  return (
    <>
      {/* ── Page Hero ── */}
      <PageHero
        eyebrow={about.hero.eyebrow}
        heading={about.hero.heading}
        subheading={about.hero.subheading}
        badge={`Founded ${overview.foundedYear}`}
      />

      {/* ── Overview ── */}
      <section
        aria-labelledby="overview-heading"
        className="section-padding bg-white"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Text */}
            <div>
              <Reveal direction="left">
                <SectionHeading
                  id="overview-heading"
                  eyebrow="Overview"
                  heading={overview.heading}
                  align="left"
                />
              </Reveal>
              <Reveal delay={80} direction="left">
                {overview.body.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="mt-5 text-neutral-600 leading-relaxed text-base"
                  >
                    {para}
                  </p>
                ))}
              </Reveal>
            </div>

            {/* Illustration / Timeline panel */}
            <Reveal direction="right" delay={120}>
              <div className="rounded-3xl overflow-hidden shadow-hover">
                <div
                  className="relative p-8 flex flex-col gap-6"
                  style={{
                    background:
                      "linear-gradient(145deg, var(--color-primary-600), var(--color-primary-900))",
                    minHeight: 380,
                  }}
                >
                  {/* Grid overlay */}
                  <div
                    className="absolute inset-0 bg-grid-pattern opacity-15"
                    aria-hidden="true"
                  />
                  {/* Blob */}
                  <div
                    className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-20"
                    style={{
                      background:
                        "radial-gradient(circle, var(--color-accent-400) 0%, transparent 70%)",
                    }}
                    aria-hidden="true"
                  />

                  <p
                    className="relative text-white/70 text-sm font-semibold tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Apex by the numbers
                  </p>

                  <div className="relative grid grid-cols-2 gap-4">
                    {[
                      { v: "2009", l: "Year founded" },
                      { v: "85", l: "Team specialists" },
                      { v: "3", l: "Global offices" },
                      { v: "97%", l: "Client retention" },
                    ].map(({ v, l }) => (
                      <div
                        key={l}
                        className="bg-white/10 rounded-2xl p-5 border border-white/10"
                      >
                        <p
                          className="text-3xl font-bold text-white"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {v}
                        </p>
                        <p className="text-primary-200 text-xs mt-1">{l}</p>
                      </div>
                    ))}
                  </div>

                  <p className="relative text-primary-200 text-sm leading-relaxed">
                    New York · Toronto · London
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Mission + Vision ── */}
      <section
        aria-labelledby="mission-heading"
        className="section-padding bg-neutral-50 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, rgba(99,102,241,0.04) 0%, transparent 60%)",
          }}
        />
        <Container className="relative z-10">
          <Reveal>
            <SectionHeading
              id="mission-heading"
              eyebrow="Purpose"
              heading="Driven by Mission, Guided by Vision"
              subheading="Two simple statements that inform every engagement we take on."
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mission */}
            <Reveal delay={60} direction="up">
              <div className="h-full rounded-3xl p-8 border-2 border-primary-100 bg-white shadow-card hover:shadow-hover hover:border-primary-200 transition-all duration-300 flex flex-col gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-primary-50), var(--color-primary-100))",
                  }}
                  aria-hidden="true"
                >
                  🎯
                </div>
                <h2
                  id="mission-heading"
                  className="text-xl font-bold text-neutral-900"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {mission.heading}
                </h2>
                <p className="text-neutral-600 leading-relaxed">
                  {mission.statement}
                </p>
              </div>
            </Reveal>

            {/* Vision */}
            <Reveal delay={120} direction="up">
              <div
                className="h-full rounded-3xl p-8 flex flex-col gap-4"
                style={{
                  background:
                    "linear-gradient(145deg, var(--color-primary-700), var(--color-primary-950))",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-white/10"
                  aria-hidden="true"
                >
                  🔭
                </div>
                <h3
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {vision.heading}
                </h3>
                <p className="text-primary-200 leading-relaxed">
                  {vision.statement}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Values ── */}
      <section
        aria-labelledby="values-heading"
        className="section-padding bg-white"
      >
        <Container>
          <Reveal>
            <SectionHeading
              id="values-heading"
              eyebrow="Values"
              heading={values.heading}
              subheading={values.subheading}
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 70} direction="up">
                <div className="group h-full flex flex-col items-center text-center p-6 rounded-2xl border border-neutral-200 bg-white hover:border-primary-200 hover:shadow-hover transition-all duration-300 card-hover">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--color-primary-50), var(--color-primary-100))",
                    }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </div>
                  <h3
                    className="text-base font-bold text-neutral-900 mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Team Members ── */}
      {teamMembers.length > 0 && (
        <section
          aria-labelledby="team-heading"
          className="section-padding bg-neutral-50"
        >
          <Container>
            <Reveal>
              <SectionHeading
                id="team-heading"
                eyebrow="The Team"
                heading="The People Behind Apex"
                subheading="Senior practitioners, not junior analysts. Every client engagement is led by a Partner or Director with 15+ years of real-world experience."
              />
            </Reveal>

            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, i) => (
                <Reveal key={member.id} delay={i * 80} direction="up">
                  <Card
                    hover
                    variant="default"
                    className="h-full flex flex-col"
                  >
                    {/* Avatar */}
                    <div className="mb-5">
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-md"
                        style={{
                          background: `linear-gradient(135deg, var(--color-primary-${[600, 500, 700, 600][i % 4]}), var(--color-primary-${[800, 700, 900, 950][i % 4]}))`,
                        }}
                        aria-label={`${member.name} avatar`}
                      >
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    </div>

                    {/* Name + role */}
                    <h3
                      className="text-base font-bold text-neutral-900 leading-snug"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary-600 font-medium mt-0.5 mb-3">
                      {member.role}
                    </p>

                    {/* Bio */}
                    <p className="text-neutral-500 text-xs leading-relaxed flex-1 line-clamp-5">
                      {member.bio}
                    </p>

                    {/* Links */}
                    <div className="mt-4 flex items-center gap-3 pt-4 border-t border-neutral-100">
                      {member.linkedinUrl && (
                        <a
                          href={member.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on LinkedIn`}
                          className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 text-neutral-500 hover:bg-primary-600 hover:text-white transition-all duration-200"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            width="14"
                            height="14"
                            aria-hidden="true"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          aria-label={`Email ${member.name}`}
                          className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 text-neutral-500 hover:bg-primary-600 hover:text-white transition-all duration-200"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            width="14"
                            height="14"
                            aria-hidden="true"
                          >
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── Bottom CTA strip ── */}
      <section
        aria-label="Contact CTA"
        className="py-16 bg-white border-t border-neutral-100"
      >
        <Container className="text-center">
          <Reveal>
            <h2
              className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Want to work with our team?
            </h2>
            <p className="text-neutral-500 mb-7 max-w-xl mx-auto">
              Book a 30-minute discovery call — no pitch, just a real conversation about your business.
            </p>
            <Button href="/contact" size="lg">
              Get in Touch
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
