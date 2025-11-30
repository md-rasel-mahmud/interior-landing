/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { connectDB } from "@/backend/db";
import { Media } from "@/backend/models/media.model";

import { SortOrder } from "mongoose";
import { buildQueryOptions } from "@/helper/query-builder";

// ========== POST: Upload Image to Local Storage ==========
export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const type = formData.get("type") as "image" | "video";

    if (!file || !title || !type) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Read file buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Create unique filename
    const fileName = `${Date.now()}-${file.name}`;

    // Upload directory
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Create folder if missing
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // File path
    const filePath = path.join(uploadDir, fileName);

    // Save file locally
    fs.writeFileSync(filePath, buffer);

    // Save to DB
    const media = await Media.create({
      title,
      url: `/uploads/${fileName}`,
      type,
      mediaId: fileName,
    });

    return NextResponse.json(media, { status: 201 });
  } catch (err: any) {
    console.error("Local Upload Error:", err);
    return NextResponse.json(
      { error: "Upload failed", details: err.message },
      { status: 500 }
    );
  }
}

// ========== GET: Fetch All Media ==========
export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url!);
    const query = Object.fromEntries(searchParams.entries());

    const { filter, pagination, sort } = buildQueryOptions(query);

    const medias = await Media.find(filter)
      .sort(sort as Record<string, SortOrder>)
      .skip(pagination.skip)
      .limit(pagination.limit);

    const total = await Media.countDocuments(filter);

    const response = {
      status: 200,
      message: "Media fetched successfully",
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        sortBy: pagination.sortBy,
        sortOrder: pagination.sortOrder,
        totalPages: Math.ceil(total / pagination.limit),
        totalItems: total,
      },
      data: medias,
    };

    return NextResponse.json(response, {
      status: response.status,
      statusText: response.message,
    });
  } catch (error) {
    console.error("Media Fetch Error:", error);
    return NextResponse.json(
      { status: 500, message: "Failed to fetch media" },
      { status: 500 }
    );
  }
}

// ========== DELETE: Remove Media from Local Storage + MongoDB ==========
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { mediaId } = await req.json();

    if (!mediaId) {
      return NextResponse.json({ error: "Missing mediaId" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "public/uploads", mediaId);

    // Delete file if exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from DB
    await Media.findOneAndDelete({ mediaId });

    return NextResponse.json({ message: "Media deleted successfully" });
  } catch (err: any) {
    console.error("Delete Media Error:", err);
    return NextResponse.json(
      { error: "Delete failed", details: err.message },
      { status: 500 }
    );
  }
}
