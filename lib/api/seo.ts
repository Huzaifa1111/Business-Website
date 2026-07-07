import type { SEOFields } from "@/lib/types";
import { seoData } from "@/lib/dummy-data/seo";

/**
 * Fetches SEO metadata for a given page key.
 * @param page - one of: "home" | "about" | "services" | "contact"
 */
export async function getSEO(page: string): Promise<SEOFields | undefined> {
  await new Promise(r => setTimeout(r, 500));
  return seoData[page];
}
