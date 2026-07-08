import mongoose, { Schema } from "mongoose";

const ContactHeroSectionSchema = new Schema({
  eyebrow: { type: String, required: true },
  heading: { type: String, required: true },
  subheading: { type: String, required: true },
});

const ContactFormSectionSchema = new Schema({
  heading: { type: String, required: true },
  subheading: { type: String, required: true },
});

const AddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

const PhoneSchema = new Schema({
  label: { type: String, required: true },
  number: { type: String, required: true },
});

const BusinessHoursSchema = new Schema({
  monday: { type: String, required: true },
  tuesday: { type: String, required: true },
  wednesday: { type: String, required: true },
  thursday: { type: String, required: true },
  friday: { type: String, required: true },
  saturday: { type: String, required: true },
  sunday: { type: String, required: true },
});

const SocialLinksSchema = new Schema({
  linkedin: { type: String },
  twitter: { type: String },
  facebook: { type: String },
  instagram: { type: String },
  youtube: { type: String },
});

const ContactSchema = new Schema({
  hero: ContactHeroSectionSchema,
  form: ContactFormSectionSchema,
  address: AddressSchema,
  phones: [PhoneSchema],
  email: { type: String, required: true },
  businessHours: BusinessHoursSchema,
  mapEmbedUrl: { type: String, required: true },
  socialLinks: SocialLinksSchema,
}, { timestamps: true });

export const Contact = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
