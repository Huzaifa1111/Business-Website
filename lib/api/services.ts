import type { Service } from "@/lib/types";
import { servicesData } from "@/lib/dummy-data/services";

/**
 * Returns all services sorted by their `order` field.
 */
export async function getServices(): Promise<Service[]> {
  await new Promise(r => setTimeout(r, 1000));
  return servicesData.sort((a, b) => a.order - b.order);
}

/**
 * Returns a single service by its id.
 */
export async function getServiceById(id: string): Promise<Service | undefined> {
  return servicesData.find((s) => s.id === id);
}
