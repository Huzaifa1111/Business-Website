import type { Metadata } from "next";
import { getContactInfo } from "@/lib/api/contact";
import { getSEO } from "@/lib/api/seo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/ui/ContactForm";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEO("contact");
  if (!seo) return { title: "Contact Us" };

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
    },
  };
}

const socialIcons: Record<string, React.ReactNode> = {
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
};

const daysOrder: Array<keyof import("@/lib/types").BusinessHours> = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const dayLabels: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export default async function ContactPage() {
  const contact = await getContactInfo();
  const { address, phones, email, businessHours, mapEmbedUrl, socialLinks } =
    contact;

  return (
    <>
      {/* ── Page Hero ── */}
      <PageHero
        eyebrow="Get In Touch"
        heading="Let's Start the Conversation"
        subheading="No sales pitch — just an honest discussion about your business. Our team responds within 24 hours."
      />

      {/* ── Main contact layout ── */}
      <section
        aria-label="Contact information and form"
        className="section-padding bg-white"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* ── Left: contact details ── */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Address */}
              <Reveal direction="left">
                <ContactInfoBlock
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20" aria-hidden="true">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                  }
                  label="Office Address"
                >
                  <address className="not-italic text-sm text-neutral-600 leading-relaxed">
                    {address.street}
                    <br />
                    {address.city}, {address.state} {address.postalCode}
                    <br />
                    {address.country}
                  </address>
                </ContactInfoBlock>
              </Reveal>

              {/* Phones */}
              <Reveal direction="left" delay={60}>
                <ContactInfoBlock
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012 .9h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  }
                  label="Phone Numbers"
                >
                  <ul className="flex flex-col gap-1.5" role="list">
                    {phones.map((p) => (
                      <li key={p.number} className="flex items-center justify-between text-sm">
                        <span className="text-neutral-500">{p.label}</span>
                        <a
                          href={`tel:${p.number.replace(/\s/g, "")}`}
                          className="font-medium text-neutral-800 hover:text-primary-600 transition-colors"
                        >
                          {p.number}
                        </a>
                      </li>
                    ))}
                  </ul>
                </ContactInfoBlock>
              </Reveal>

              {/* Email */}
              <Reveal direction="left" delay={120}>
                <ContactInfoBlock
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  }
                  label="Email"
                >
                  <a
                    href={`mailto:${email}`}
                    className="text-sm font-medium text-neutral-800 hover:text-primary-600 transition-colors break-all"
                  >
                    {email}
                  </a>
                </ContactInfoBlock>
              </Reveal>

              {/* Business Hours */}
              <Reveal direction="left" delay={180}>
                <ContactInfoBlock
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  }
                  label="Business Hours"
                >
                  <ul className="flex flex-col gap-1.5" role="list">
                    {daysOrder.map((day) => {
                      const hours = businessHours[day];
                      const isClosed = hours === "Closed";
                      return (
                        <li
                          key={day}
                          className="flex items-center justify-between text-xs"
                        >
                          <span className="text-neutral-500 capitalize">
                            {dayLabels[day]}
                          </span>
                          <span
                            className={`font-medium ${isClosed ? "text-neutral-400" : "text-neutral-700"}`}
                          >
                            {hours}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </ContactInfoBlock>
              </Reveal>

              {/* Social Links */}
              {Object.keys(socialLinks).length > 0 && (
                <Reveal direction="left" delay={240}>
                  <ContactInfoBlock
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20" aria-hidden="true">
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                      </svg>
                    }
                    label="Follow Us"
                  >
                    <div className="flex flex-wrap gap-2">
                      {(
                        Object.entries(socialLinks) as [string, string][]
                      )
                        .filter(([, url]) => Boolean(url))
                        .map(([platform, url]) => (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Follow us on ${platform}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-100 text-neutral-600 hover:bg-primary-600 hover:text-white transition-all duration-200 capitalize"
                          >
                            {socialIcons[platform] ?? null}
                            {platform}
                          </a>
                        ))}
                    </div>
                  </ContactInfoBlock>
                </Reveal>
              )}
            </div>

            {/* ── Right: contact form ── */}
            <Reveal className="lg:col-span-3" direction="right" delay={60}>
              <div className="rounded-3xl border border-neutral-200 bg-white shadow-card p-8 lg:p-10">
                <h2
                  className="text-2xl font-bold text-neutral-900 mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Send us a message
                </h2>
                <p className="text-neutral-500 text-sm mb-8">
                  Fill out the form below and a consultant will be in touch within 24 hours.
                </p>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Map ── */}
      <section aria-label="Office location map" className="bg-neutral-100">
        <div className="relative w-full" style={{ height: 420 }}>
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="420"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Apex Consulting Group — New York Office"
            aria-label="Google Maps showing our New York office at 1221 Avenue of the Americas"
          />
        </div>
      </section>
    </>
  );
}

/* ── Helper sub-component ── */
function ContactInfoBlock({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div
        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-primary-600"
        style={{
          background: "linear-gradient(135deg, var(--color-primary-50), var(--color-primary-100))",
        }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
          {label}
        </p>
        {children}
      </div>
    </div>
  );
}
