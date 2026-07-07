import type { ContactInfo } from "@/lib/types";
import { contactData } from "@/lib/dummy-data/contact";

/**
 * Fetches business contact information.
 */
export async function getContactInfo(): Promise<ContactInfo> {
  await new Promise(r => setTimeout(r, 1000));
  return contactData;
}
