import { connectDB } from "@/backend/db";
import { Media } from "@/backend/models/media.model";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await params;
  const media = await Media.findById(id);
  return media
    ? NextResponse.json(media)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;

  const { title } = await req.json();
  const media = await Media.findByIdAndUpdate(id, { title }, { new: true });
  return media
    ? NextResponse.json(media)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;
  const deleted = await Media.findByIdAndDelete(id);
  return deleted
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}
