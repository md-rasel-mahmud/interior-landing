/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { validateRequest } from "@/helper/validation-request";
import { connectDB } from "@/backend/db";
import {
  IProject,
  projectValidation,
} from "@/backend/models/project/project.dto";
import { Project } from "@/backend/models/project/project.model";
import { NextRequest, NextResponse } from "next/server";
import "@/backend/models/unit/unit.model";
import "@/backend/models/category/category.model";
import { Types } from "mongoose";

// GET - get a single project by ID

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ projectId: string }>;
  }
) {
  await connectDB();

  const { projectId } = await params;

  if (!Types.ObjectId.isValid(projectId)) {
    return NextResponse.json(
      { message: "Invalid project id", data: null },
      { status: 400 }
    );
  }

  const oid = new Types.ObjectId(projectId);

  const { searchParams } = new URL(req.url);
  const query = Object.fromEntries(searchParams.entries());

  // 1) Current project
  const data = await Project.findOne({ _id: oid }).populate([
    { path: "category", select: "name image description" },
  ]);

  if (!data) {
    return NextResponse.json({ message: "Project not found", data: null });
  }

  const response: {
    status: number;
    message: string;
    data: typeof data;
    nextProject?: any;
    prevProject?: any;
  } = {
    status: 200,
    message: "Project fetched successfully",
    data,
  };

  // 2) Previous project (created before)
  if (query.prev === "true") {
    const prevProject = await Project.findOne({ _id: { $lt: oid } })
      .populate([{ path: "category", select: "name image description" }])
      .sort({ _id: -1 })
      .limit(1);

    response.prevProject = prevProject || null;
  }

  // 3) Next project (created after)
  if (query.next === "true") {
    const nextProject = await Project.findOne({ _id: { $gt: oid } })
      .sort({ _id: 1 })
      .populate([{ path: "category", select: "name image description" }])
      .limit(1);

    response.nextProject = nextProject || null;
  }

  return NextResponse.json(response);
}

// PATCH - update a project
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  await connectDB();
  const { projectId } = await params;

  const validatedBody = await validateRequest(request, projectValidation);

  if (!validatedBody.success) {
    return NextResponse.json(
      { message: "Validation failed", errors: validatedBody.errors },
      { status: 400 }
    );
  }

  const data = await Project.findByIdAndUpdate(projectId, validatedBody.data, {
    new: true,
    runValidators: true,
  });

  if (!data) {
    return NextResponse.json({ message: "Project not found" }, { status: 404 });
  }

  const response = {
    status: 200,
    message: "Project updated successfully",
    data,
  };

  return NextResponse.json(response);
}

// DELETE - delete a project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  await connectDB();
  const { projectId } = await params;

  const data = await Project.findByIdAndDelete(projectId);

  if (!data) {
    return NextResponse.json({ message: "Project not found" }, { status: 404 });
  }

  const response = {
    status: 200,
    message: "Project deleted successfully",
    data,
  };

  return NextResponse.json(response);
}
