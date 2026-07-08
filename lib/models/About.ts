import mongoose, { Schema } from "mongoose";

const OverviewSectionSchema = new Schema({
  heading: { type: String, required: true },
  body: { type: String, required: true },
  imageUrl: { type: String },
  foundedYear: { type: Number, required: true },
});

const MissionSectionSchema = new Schema({
  heading: { type: String, required: true },
  statement: { type: String, required: true },
});

const VisionSectionSchema = new Schema({
  heading: { type: String, required: true },
  statement: { type: String, required: true },
});

const ValueItemSchema = new Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const ValuesSectionSchema = new Schema({
  heading: { type: String, required: true },
  subheading: { type: String, required: true },
  items: [ValueItemSchema],
});

const TeamMemberSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String, required: true },
  avatarUrl: { type: String },
  linkedinUrl: { type: String },
  email: { type: String },
});

const AboutHeroSectionSchema = new Schema({
  eyebrow: { type: String, required: true },
  heading: { type: String, required: true },
  subheading: { type: String, required: true },
});

const AboutContentSchema = new Schema({
  hero: AboutHeroSectionSchema,
  overview: OverviewSectionSchema,
  mission: MissionSectionSchema,
  vision: VisionSectionSchema,
  values: ValuesSectionSchema,
  teamMembers: [TeamMemberSchema],
}, { timestamps: true });

export const About = mongoose.models.About || mongoose.model("About", AboutContentSchema);
