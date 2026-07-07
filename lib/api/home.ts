/**
 * API stub layer — all pages must fetch data through these functions.
 * When the real backend is ready, swap the implementations here.
 * Never import from lib/dummy-data directly in page or component files.
 */

import type { HomeContent } from "@/lib/types";
import { homeData } from "@/lib/dummy-data/home";

/**
 * Fetches all home page content sections.
 * In production this will call the CMS / REST / GraphQL API.
 */
export async function getHomeContent(): Promise<HomeContent> {
  // Simulate async network latency in development
  await new Promise((r) => setTimeout(r, 1000));
  return homeData;
}
