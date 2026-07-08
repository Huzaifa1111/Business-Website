import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { About } from "@/lib/models/About";
import { getServerSession } from "next-auth/next";
import { aboutData } from "@/lib/dummy-data/about";

export async function GET() {
  await dbConnect();
  try {
    const aboutContent = await About.findOne().lean();
    if (!aboutContent) {
      return NextResponse.json(aboutData);
    }
    // Merge with defaults so newly-added fields (e.g. hero) are never undefined
    return NextResponse.json({ ...aboutData, ...JSON.parse(JSON.stringify(aboutContent)) });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching about content" }, { status: 500 });
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

    let aboutContent = await About.findOne();
    if (aboutContent) {
      await About.deleteOne({ _id: aboutContent._id });
      aboutContent = await About.create(cleanBody);
    } else {
      aboutContent = await About.create(cleanBody);
    }
    return NextResponse.json(aboutContent);
  } catch (error) {
    console.error("Error updating about content:", error);
    return NextResponse.json({ message: "Error updating about content" }, { status: 500 });
  }
}
