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
  textColor?: string;
  accentColor?: string;
  badgeText?: string;
}

export interface IntroSection {
  isVisible: boolean;
  heading: string;
  body: string;
  textColor?: string;
  accentColor?: string;
  statsItems: Array<{ value: string; label: string }>;
}

export interface WhyChooseUsItem {
  icon: string;
  title: string;
  description: string;
}

export interface WhyChooseUsSection {
  textColor?: string;
  accentColor?: string;
  isVisible: boolean;
  heading: string;
  subheading: string;
  items: WhyChooseUsItem[];
}

export interface CtaSection {
  textColor?: string;
  accentColor?: string;
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
  textColor?: string;
  accentColor?: string;
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
  textColor?: string;
  accentColor?: string;
  heading: string;
  body: string;
  imageUrl?: string;
  foundedYear: number;
}

export interface MissionSection {
  textColor?: string;
  accentColor?: string;
  heading: string;
  statement: string;
}

export interface VisionSection {
  textColor?: string;
  accentColor?: string;
  heading: string;
  statement: string;
}

export interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

export interface ValuesSection {
  textColor?: string;
  accentColor?: string;
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

export interface AboutHeroSection {
  textColor?: string;
  accentColor?: string;
  eyebrow: string;
  heading: string;
  subheading: string;
}

export interface AboutContent {
  hero: AboutHeroSection;
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

export interface ServicesHeroSection {
  textColor?: string;
  accentColor?: string;
  eyebrow: string;
  heading: string;
  subheading: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServicesProcessSection {
  textColor?: string;
  accentColor?: string;
  eyebrow: string;
  heading: string;
  subheading: string;
  steps: ProcessStep[];
}

export interface ServicesCtaSection {
  textColor?: string;
  accentColor?: string;
  heading: string;
  subheading: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
}

export interface ServicesPageContent {
  hero: ServicesHeroSection;
  process: ServicesProcessSection;
  cta: ServicesCtaSection;
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

export interface ContactHeroSection {
  textColor?: string;
  accentColor?: string;
  eyebrow: string;
  heading: string;
  subheading: string;
}

export interface ContactFormSection {
  textColor?: string;
  accentColor?: string;
  heading: string;
  subheading: string;
}

export interface ContactInfo {
  hero: ContactHeroSection;
  form: ContactFormSection;
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

