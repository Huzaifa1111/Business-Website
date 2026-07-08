import type { AboutContent } from "@/lib/types";
import { aboutData } from "@/lib/dummy-data/about";
import dbConnect from "@/lib/mongodb";
import { About } from "@/lib/models/About";

export async function getAboutContent(): Promise<AboutContent> {
  try {
    await dbConnect();
    const content = await About.findOne().lean();
    
    if (content) {
      const safeContent = JSON.parse(JSON.stringify(content));
      // Merge with defaults so newly-added fields (e.g. hero) are never undefined
      return { ...aboutData, ...safeContent } as AboutContent;
    }
  } catch (error) {
    console.error("Failed to fetch about content from DB:", error);
  }

  return aboutData;
}
