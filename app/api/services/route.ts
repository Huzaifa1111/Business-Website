import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Service } from "@/lib/models/Service";
import { getServerSession } from "next-auth/next";

export async function GET() {
  await dbConnect();
  try {
    const services = await Service.find().sort({ order: 1 }).lean();
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching services" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  try {
    const body = await req.json();
    const newService = await Service.create(body);
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating service" }, { status: 500 });
  }
}
