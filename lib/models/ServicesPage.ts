import mongoose, { Schema } from "mongoose";

const ServicesHeroSectionSchema = new Schema({
  eyebrow: { type: String, required: true },
  heading: { type: String, required: true },
  subheading: { type: String, required: true },
});

const ProcessStepSchema = new Schema({
  step: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const ServicesProcessSectionSchema = new Schema({
  eyebrow: { type: String, required: true },
  heading: { type: String, required: true },
  subheading: { type: String, required: true },
  steps: [ProcessStepSchema],
});

const ServicesCtaSectionSchema = new Schema({
  heading: { type: String, required: true },
  subheading: { type: String, required: true },
  primaryButtonText: { type: String, required: true },
  primaryButtonLink: { type: String, required: true },
  secondaryButtonText: { type: String, required: true },
  secondaryButtonLink: { type: String, required: true },
});

const ServicesPageContentSchema = new Schema(
  {
    hero: ServicesHeroSectionSchema,
    process: ServicesProcessSectionSchema,
    cta: ServicesCtaSectionSchema,
  },
  { timestamps: true }
);

export const ServicesPage =
  mongoose.models.ServicesPage ||
  mongoose.model("ServicesPage", ServicesPageContentSchema);
