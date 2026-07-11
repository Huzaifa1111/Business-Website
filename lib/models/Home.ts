import mongoose, { Schema, Document } from "mongoose";

const HeroSectionSchema = new Schema({
  isVisible: { type: Boolean, default: true },
  headline: { type: String, required: true },
  subheadline: { type: String, required: true },
  primaryCtaText: { type: String, required: true },
  primaryCtaLink: { type: String, required: true },
  secondaryCtaText: { type: String },
  secondaryCtaLink: { type: String },
  backgroundImageUrl: { type: String },
  textColor: { type: String, default: "#252118" },
  accentColor: { type: String, default: "#4f46e5" },
  badgeText: { type: String },
});

const IntroSectionSchema = new Schema({
  isVisible: { type: Boolean, default: true },
  heading: { type: String, required: true },
  body: { type: String, required: true },
  textColor: { type: String, default: "#252118" },
  accentColor: { type: String, default: "#4f46e5" },
  statsItems: [{
    value: { type: String, required: true },
    label: { type: String, required: true },
  }],
});

const WhyChooseUsItemSchema = new Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const WhyChooseUsSectionSchema = new Schema({
  isVisible: { type: Boolean, default: true },
  heading: { type: String, required: true },
  subheading: { type: String, required: true },
  textColor: { type: String, default: "#ffffff" },
  accentColor: { type: String, default: "#4f46e5" },
  items: [WhyChooseUsItemSchema],
});

const CtaSectionSchema = new Schema({
  isVisible: { type: Boolean, default: true },
  heading: { type: String, required: true },
  subheading: { type: String, required: true },
  buttonText: { type: String, required: true },
  buttonLink: { type: String, required: true },
  backgroundVariant: { type: String, enum: ["primary", "accent", "dark"], required: true },
  textColor: { type: String, default: "#ffffff" },
  accentColor: { type: String, default: "#4f46e5" },
});

const TestimonialSchema = new Schema({
  id: { type: String, required: true },
  authorName: { type: String, required: true },
  authorTitle: { type: String, required: true },
  authorCompany: { type: String, required: true },
  avatarUrl: { type: String },
  quote: { type: String, required: true },
  rating: { type: Number, required: true },
});

const TestimonialsSectionSchema = new Schema({
  isVisible: { type: Boolean, default: true },
  heading: { type: String, required: true },
  subheading: { type: String, required: true },
  textColor: { type: String, default: "#252118" },
  accentColor: { type: String, default: "#4f46e5" },
  items: [TestimonialSchema],
});

const HomeContentSchema = new Schema({
  hero: HeroSectionSchema,
  intro: IntroSectionSchema,
  whyChooseUs: WhyChooseUsSectionSchema,
  cta: CtaSectionSchema,
  testimonials: TestimonialsSectionSchema,
}, { timestamps: true });

export const Home = mongoose.models.Home || mongoose.model("Home", HomeContentSchema);
