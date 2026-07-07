// ─────────────────────────────────────────────
// SEO
// ─────────────────────────────────────────────

export interface SEOFields {
  metaTitle: string;
  metaDescription: string;
  metaKeywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

// ─────────────────────────────────────────────
// Home
// ─────────────────────────────────────────────

export interface HeroSection {
  isVisible: boolean;
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImageUrl?: string;
  badgeText?: string;
}

export interface IntroSection {
  isVisible: boolean;
  heading: string;
  body: string;
  statsItems: Array<{ value: string; label: string }>;
}

export interface WhyChooseUsItem {
  icon: string;
  title: string;
  description: string;
}

export interface WhyChooseUsSection {
  isVisible: boolean;
  heading: string;
  subheading: string;
  items: WhyChooseUsItem[];
}

export interface CtaSection {
  isVisible: boolean;
  heading: string;
  subheading: string;
  buttonText: string;
  buttonLink: string;
  backgroundVariant: "primary" | "accent" | "dark";
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorTitle: string;
  authorCompany: string;
  avatarUrl?: string;
  quote: string;
  rating: number; // 1–5
}

export interface TestimonialsSection {
  isVisible: boolean;
  heading: string;
  subheading: string;
  items: Testimonial[];
}

export interface HomeContent {
  hero: HeroSection;
  intro: IntroSection;
  whyChooseUs: WhyChooseUsSection;
  cta: CtaSection;
  testimonials: TestimonialsSection;
}

// ─────────────────────────────────────────────
// About
// ─────────────────────────────────────────────

export interface OverviewSection {
  heading: string;
  body: string;
  imageUrl?: string;
  foundedYear: number;
}

export interface MissionSection {
  heading: string;
  statement: string;
}

export interface VisionSection {
  heading: string;
  statement: string;
}

export interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

export interface ValuesSection {
  heading: string;
  subheading: string;
  items: ValueItem[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl?: string;
  linkedinUrl?: string;
  email?: string;
}

export interface AboutContent {
  overview: OverviewSection;
  mission: MissionSection;
  vision: VisionSection;
  values: ValuesSection;
  teamMembers: TeamMember[];
}

// ─────────────────────────────────────────────
// Services
// ─────────────────────────────────────────────

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji or icon name/key
  features?: string[];
  ctaText?: string;
  ctaLink?: string;
  order: number;
  isFeatured?: boolean;
}

// ─────────────────────────────────────────────
// Contact
// ─────────────────────────────────────────────

export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}

export interface ContactInfo {
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  phones: Array<{ label: string; number: string }>;
  email: string;
  businessHours: BusinessHours;
  mapEmbedUrl: string;
  socialLinks: SocialLinks;
}
