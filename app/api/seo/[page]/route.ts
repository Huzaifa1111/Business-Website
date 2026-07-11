import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { SEO } from "@/lib/models/SEO";
import { getServerSession } from "next-auth/next";

export async function GET(_req: Request, context: { params: Promise<{ page: string }> }) {
  await dbConnect();
  try {
    const { page } = await context.params;
    const seoData = await SEO.findOne({ page }).lean();
    if (!seoData) {
      return NextResponse.json({ message: "SEO data not found" }, { status: 404 });
    }
    return NextResponse.json(seoData);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching SEO data" }, { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: Promise<{ page: string }> }) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  try {
    const { page } = await context.params;
    const body = await req.json();
    let seoData = await SEO.findOne({ page });

    if (seoData) {
      seoData = await SEO.findByIdAndUpdate(seoData._id, { ...body, page }, { new: true });
    } else {
      seoData = await SEO.create({ ...body, page });
    }

    return NextResponse.json(seoData);
  } catch (error) {
    return NextResponse.json({ message: "Error updating SEO data" }, { status: 500 });
  }
}
