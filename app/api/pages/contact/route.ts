import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Contact } from "@/lib/models/Contact";
import { getServerSession } from "next-auth/next";
import { contactData } from "@/lib/dummy-data/contact";

export async function GET() {
  await dbConnect();
  try {
    const contactContent = await Contact.findOne().lean();
    if (!contactContent) {
      return NextResponse.json(contactData);
    }
    // Merge with defaults so newly-added fields (e.g. hero) are never undefined
    return NextResponse.json({ ...contactData, ...JSON.parse(JSON.stringify(contactContent)) });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching contact content" }, { status: 500 });
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

    let contactContent = await Contact.findOne();
    if (contactContent) {
      await Contact.deleteOne({ _id: contactContent._id });
      contactContent = await Contact.create(cleanBody);
    } else {
      contactContent = await Contact.create(cleanBody);
    }
    return NextResponse.json(contactContent);
  } catch (error) {
    console.error("Error updating contact content:", error);
    return NextResponse.json({ message: "Error updating contact content" }, { status: 500 });
  }
}
