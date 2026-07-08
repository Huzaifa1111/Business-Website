import mongoose, { Schema } from "mongoose";

const SEOSchema = new Schema({
  page: { type: String, required: true, unique: true }, // e.g., 'home', 'about', 'services', 'contact', 'global'
  metaTitle: { type: String, required: true },
  metaDescription: { type: String, required: true },
  metaKeywords: [{ type: String }],
  canonicalUrl: { type: String },
  ogTitle: { type: String },
  ogDescription: { type: String },
  ogImage: { type: String },
  twitterTitle: { type: String },
  twitterDescription: { type: String },
  twitterImage: { type: String },
  noIndex: { type: Boolean, default: false },
  noFollow: { type: Boolean, default: false },
}, { timestamps: true });

export const SEO = mongoose.models.SEO || mongoose.model("SEO", SEOSchema);
