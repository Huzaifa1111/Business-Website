/**
 * API stub layer — all pages must fetch data through these functions.
 * When the real backend is ready, swap the implementations here.
 * Never import from lib/dummy-data directly in page or component files.
 */

import type { HomeContent } from "@/lib/types";
import { homeData } from "@/lib/dummy-data/home";
import dbConnect from "@/lib/mongodb";
import { Home } from "@/lib/models/Home";

function mergeWithDefaults<T>(value: T, defaults: T): T {
  if (Array.isArray(value)) return value as T;
  if (Array.isArray(defaults)) return defaults;
  if (value && typeof value === "object" && defaults && typeof defaults === "object") {
    const merged = { ...(defaults as Record<string, unknown>) };
    for (const [key, nestedValue] of Object.entries(value as Record<string, unknown>)) {
      const fallback = (defaults as Record<string, unknown>)[key];
      merged[key] = mergeWithDefaults(nestedValue as T, fallback as T);
    }
    return merged as T;
  }
  return value ?? defaults;
}

export async function getHomeContent(): Promise<HomeContent> {
  try {
    await dbConnect();
    const content = await Home.findOne().lean();

    if (content) {
      // Need to stringify/parse to remove Mongoose ObjectIDs
      // which can cause issues with Next.js Server Components passing data to Client Components
      const safeContent = JSON.parse(JSON.stringify(content));
      return mergeWithDefaults<HomeContent>(safeContent as HomeContent, homeData) as HomeContent;
    }
  } catch (error) {
    console.error("Failed to fetch home content from DB:", error);
  }

  // Fallback if DB query fails or is empty (e.g. before initial seeding)
  return homeData;
}
