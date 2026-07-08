import mongoose, { Schema } from "mongoose";

const ServiceSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  features: [{ type: String }],
  ctaText: { type: String },
  ctaLink: { type: String },
  order: { type: Number, required: true },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

export const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);
