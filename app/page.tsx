import type { Metadata } from "next";
import { getHomeContent } from "@/lib/api/home";
import { getServices } from "@/lib/api/services";
import { getSEO } from "@/lib/api/seo";
import { HeroSection } from "./_sections/HeroSection";
import { IntroSection } from "./_sections/IntroSection";
import { FeaturedServicesSection } from "./_sections/FeaturedServicesSection";
import { WhyChooseUsSection } from "./_sections/WhyChooseUsSection";
import { TestimonialsSection } from "./_sections/TestimonialsSection";
import { CtaBand } from "./_sections/CtaBand";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEO("home");
  if (!seo) return { title: "Apex Consulting Group" };
  
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

export default async function HomePage() {
  const [home, services] = await Promise.all([getHomeContent(), getServices()]);
  const featuredServices = services.filter((s) => s.isFeatured).slice(0, 3);

  return (
    <>
      {home.hero.isVisible && <HeroSection data={home.hero} />}
      {home.intro.isVisible && <IntroSection data={home.intro} />}
      <FeaturedServicesSection services={featuredServices} />
      {home.whyChooseUs.isVisible && <WhyChooseUsSection data={home.whyChooseUs} />}
      {home.testimonials.isVisible && <TestimonialsSection data={home.testimonials} />}
      {home.cta.isVisible && <CtaBand data={home.cta} />}
    </>
  );
}
