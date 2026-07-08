import type { Service, ServicesPageContent } from "@/lib/types";
import { servicesData } from "@/lib/dummy-data/services";
import { servicesPageData } from "@/lib/dummy-data/servicesPage";
import dbConnect from "@/lib/mongodb";
import { Service as ServiceModel } from "@/lib/models/Service";
import { ServicesPage } from "@/lib/models/ServicesPage";

/**
 * Returns all services sorted by their `order` field.
 * Fetches from MongoDB first, falls back to dummy data.
 */
export async function getServices(): Promise<Service[]> {
  try {
    await dbConnect();
    const services = await ServiceModel.find().sort({ order: 1 }).lean();
    if (services && services.length > 0) {
      return JSON.parse(JSON.stringify(services)) as Service[];
    }
  } catch (error) {
    console.error("Failed to fetch services from DB:", error);
  }

  return servicesData.sort((a, b) => a.order - b.order);
}

/**
 * Returns a single service by its id.
 */
export async function getServiceById(id: string): Promise<Service | undefined> {
  try {
    await dbConnect();
    const service = await ServiceModel.findOne({ id }).lean();
    if (service) {
      return JSON.parse(JSON.stringify(service)) as Service;
    }
  } catch (error) {
    console.error("Failed to fetch service from DB:", error);
  }

  return servicesData.find((s) => s.id === id);
}

/**
 * Returns the services page content (hero, process, CTA sections).
 * Fetches from MongoDB first, falls back to dummy data.
 */
export async function getServicesPageContent(): Promise<ServicesPageContent> {
  try {
    await dbConnect();
    const content = await ServicesPage.findOne().lean();

    if (content) {
      const safeContent = JSON.parse(JSON.stringify(content));
      return { ...servicesPageData, ...safeContent } as ServicesPageContent;
    }
  } catch (error) {
    console.error("Failed to fetch services page content from DB:", error);
  }

  return servicesPageData;
}
