import type { ContactInfo } from "@/lib/types";
import { contactData } from "@/lib/dummy-data/contact";
import dbConnect from "@/lib/mongodb";
import { Contact } from "@/lib/models/Contact";

/**
 * Fetches business contact information.
 */
export async function getContactInfo(): Promise<ContactInfo> {
  try {
    await dbConnect();
    const contactContent = await Contact.findOne().lean();
    if (contactContent) {
      return { ...contactData, ...JSON.parse(JSON.stringify(contactContent)) } as ContactInfo;
    }
  } catch (error) {
    console.error("Failed to fetch contact content from DB:", error);
  }

  return contactData;
}
