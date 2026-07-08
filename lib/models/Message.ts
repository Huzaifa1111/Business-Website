import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: "unread" } // "unread", "read", "archived"
}, { timestamps: true });

export const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);
