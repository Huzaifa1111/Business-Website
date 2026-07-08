import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Contact } from "@/lib/models/Contact";
import { getServerSession } from "next-auth/next";

export async function GET() {
  await dbConnect();
  try {
    const contactInfo = await Contact.findOne().lean();
    if (!contactInfo) {
      return NextResponse.json({ message: "Contact info not found" }, { status: 404 });
    }
    return NextResponse.json(contactInfo);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching contact info" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  try {
    const body = await req.json();
    let contactInfo = await Contact.findOne();
    if (contactInfo) {
      contactInfo = await Contact.findByIdAndUpdate(contactInfo._id, body, { new: true });
    } else {
      contactInfo = await Contact.create(body);
    }
    return NextResponse.json(contactInfo);
  } catch (error) {
    return NextResponse.json({ message: "Error updating contact info" }, { status: 500 });
  }
}
