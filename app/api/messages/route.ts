import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Message } from "@/lib/models/Message";
import { getServerSession } from "next-auth/next";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const newMessage = await Message.create(body);
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating message" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching messages" }, { status: 500 });
  }
}
