import { validateRequest } from "@/helper/validation-request";
import { connectDB } from "@/backend/db";
import { Category } from "@/backend/models/category/category.model";
import { categoryValidation } from "@/backend/models/category/category.dto";
import { NextRequest, NextResponse } from "next/server";

// PATCH - update a category
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  await connectDB();
  const { categoryId } = await params;

  const validatedBody = await validateRequest(request, categoryValidation);

  if (!validatedBody.success) {
    return NextResponse.json(
      { message: "Validation failed", errors: validatedBody.errors },
      { status: 400 }
    );
  }

  const data = await Category.findByIdAndUpdate(
    categoryId,
    validatedBody.data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!data) {
    return NextResponse.json(
      { message: "Category not found" },
      { status: 404 }
    );
  }

  const response = {
    status: 200,
    message: "Category updated successfully",
    data,
  };

  return NextResponse.json(response);
}

// DELETE - delete a category
export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  await connectDB();

  const { categoryId } = await params;

  const data = await Category.findByIdAndDelete(categoryId);

  if (!data) {
    return NextResponse.json(
      { message: "Category not found" },
      { status: 404 }
    );
  }

  const response = {
    status: 200,
    message: "Category deleted successfully",
    data,
  };

  return NextResponse.json(response);
}
