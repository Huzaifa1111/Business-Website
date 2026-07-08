import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Service } from "@/lib/models/Service";
import { getServerSession } from "next-auth/next";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  try {
    const body = await req.json();
    const updatedService = await Service.findOneAndUpdate({ id: params.id }, body, { new: true });
    
    if (!updatedService) {
      return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(updatedService);
  } catch (error) {
    return NextResponse.json({ message: "Error updating service" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  try {
    const deletedService = await Service.findOneAndDelete({ id: params.id });
    
    if (!deletedService) {
      return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting service" }, { status: 500 });
  }
}
