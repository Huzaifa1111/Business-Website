import type { AboutContent } from "@/lib/types";
import { aboutData } from "@/lib/dummy-data/about";

/**
 * Fetches about page content.
 */
export async function getAboutContent(): Promise<AboutContent> {
  await new Promise(r => setTimeout(r, 1000));
  return aboutData;
}
