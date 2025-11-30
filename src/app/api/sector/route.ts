import { buildQueryOptions } from "@/helper/query-builder";
import {
  parseMongooseDuplicateKeyError,
  validateRequest,
} from "@/helper/validation-request";
import { connectDB } from "@/backend/db";
import { NextRequest, NextResponse } from "next/server";
import type { SortOrder } from "mongoose";
import { Sector } from "@/backend/models/sector/sector.model";
import { sectorsValidation } from "@/backend/models/sector/sector.dto";

// GET - get all sectors
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url!);
    const query = Object.fromEntries(searchParams.entries());

    const { filter, pagination, sort } = buildQueryOptions(query);

    const sectors = await Sector.find(filter)
      .sort(sort as Record<string, SortOrder>)
      .skip(pagination.skip)
      .limit(pagination.limit);

    const total = await Sector.countDocuments(filter);

    const response = {
      status: 200,
      message: "Sectors fetched successfully",
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        sortBy: pagination.sortBy,
        sortOrder: pagination.sortOrder,
        totalPages: Math.ceil(total / pagination.limit),
        totalItems: total,
      },
      data: sectors,
    };

    return NextResponse.json(response, {
      status: response.status,
      statusText: response.message,
    });
  } catch (error) {
    console.error("Sector Fetch Error:", error);
    return NextResponse.json(
      {
        status: 500,
        message: "Failed to fetch sectors",
      },
      { status: 500 }
    );
  }
}

// POST - create a new sector
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const validatedBody = await validateRequest(request, sectorsValidation);

    if (!validatedBody.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: validatedBody.errors },
        { status: 400 }
      );
    }

    const newSector = new Sector(validatedBody.data);

    const data = await newSector.save();

    const response = {
      status: 201,
      message: "Sector created successfully",
      data,
    };

    return NextResponse.json(response, {
      status: response.status,
      statusText: response.message,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error creating sector:", error);

    if (error?.code === 11000) {
      const errors = parseMongooseDuplicateKeyError(error);

      return NextResponse.json(
        { message: "Duplicate key error", errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Failed to create sector",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
