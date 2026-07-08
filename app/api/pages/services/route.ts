import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { ServicesPage } from "@/lib/models/ServicesPage";
import { getServerSession } from "next-auth/next";
import { servicesPageData } from "@/lib/dummy-data/servicesPage";

export async function GET() {
  await dbConnect();
  try {
    const pageContent = await ServicesPage.findOne().lean();
    if (!pageContent) {
      return NextResponse.json(servicesPageData);
    }
    return NextResponse.json({
      ...servicesPageData,
      ...JSON.parse(JSON.stringify(pageContent)),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching services page content" },
      { status: 500 }
    );
  }
}

// Recursively strip Mongo metadata from nested objects
function stripMongoFields(obj: any): any {
  if (Array.isArray(obj)) return obj.map(stripMongoFields);
  if (obj && typeof obj === "object") {
    const cleaned: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (["_id", "__v", "createdAt", "updatedAt"].includes(key)) continue;
      cleaned[key] = stripMongoFields(value);
    }
    return cleaned;
  }
  return obj;
}

export async function PUT(req: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  try {
    const body = await req.json();
    const cleanBody = stripMongoFields(body);

    let pageContent = await ServicesPage.findOne();
    if (pageContent) {
      await ServicesPage.deleteOne({ _id: pageContent._id });
      pageContent = await ServicesPage.create(cleanBody);
    } else {
      pageContent = await ServicesPage.create(cleanBody);
    }
    return NextResponse.json(pageContent);
  } catch (error) {
    console.error("Error updating services page content:", error);
    return NextResponse.json(
      { message: "Error updating services page content" },
      { status: 500 }
    );
  }
}
