import {
  parseMongooseDuplicateKeyError,
  validateRequest,
} from "@/helper/validation-request";
import { connectDB } from "@/backend/db";
import { projectValidation } from "@/backend/models/project/project.dto";
import { Project } from "@/backend/models/project/project.model";
import { NextRequest, NextResponse } from "next/server";
import { getAllProjectsFromDB } from "@/backend/services/project.service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = Object.fromEntries(searchParams.entries());

    const result = await getAllProjectsFromDB(query);

    return NextResponse.json(result, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);

    return NextResponse.json(
      {
        status: 500,
        message: "Failed to fetch projects",
      },
      { status: 500 }
    );
  }
}

// POST - create a new project
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const validatedBody = await validateRequest(request, projectValidation);

    if (!validatedBody.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: validatedBody.errors },
        { status: 400 }
      );
    }

    const newProject = new Project(validatedBody.data);

    const data = await newProject.save();

    const response = {
      status: 201,
      message: "Project created successfully",
      data,
    };

    return NextResponse.json(response, {
      status: response.status,
      statusText: response.message,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error creating project:", error);

    if (error?.code === 11000) {
      const errors = parseMongooseDuplicateKeyError(error);

      return NextResponse.json(
        { message: "Duplicate key error", errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Failed to create project",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
