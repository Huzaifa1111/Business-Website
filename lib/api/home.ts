/**
 * API stub layer — all pages must fetch data through these functions.
 * When the real backend is ready, swap the implementations here.
 * Never import from lib/dummy-data directly in page or component files.
 */

import type { HomeContent } from "@/lib/types";
import { homeData } from "@/lib/dummy-data/home";
import dbConnect from "@/lib/mongodb";
import { Home } from "@/lib/models/Home";

export async function getHomeContent(): Promise<HomeContent> {
  try {
    await dbConnect();
    const content = await Home.findOne().lean();
    
    if (content) {
      // Need to stringify/parse to remove Mongoose ObjectIDs 
      // which can cause issues with Next.js Server Components passing data to Client Components
      const safeContent = JSON.parse(JSON.stringify(content));
      return safeContent as HomeContent;
    }
  } catch (error) {
    console.error("Failed to fetch home content from DB:", error);
  }

  // Fallback if DB query fails or is empty (e.g. before initial seeding)
  return homeData;
}
