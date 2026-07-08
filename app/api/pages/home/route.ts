import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Home } from "@/lib/models/Home";
import { getServerSession } from "next-auth/next";
import { homeData } from "@/lib/dummy-data/home";

export async function GET() {
  await dbConnect();
  try {
    const homeContent = await Home.findOne().lean();
    if (!homeContent) {
      return NextResponse.json(homeData);
    }
    return NextResponse.json(homeContent);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching home content" }, { status: 500 });
  }
}

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

    let homeContent = await Home.findOne();
    if (homeContent) {
      await Home.deleteOne({ _id: homeContent._id });
      homeContent = await Home.create(cleanBody);
    } else {
      homeContent = await Home.create(cleanBody);
    }
    return NextResponse.json(homeContent);
  } catch (error) {
    return NextResponse.json({ message: "Error updating home content" }, { status: 500 });
  }
}
