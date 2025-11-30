import { connectDB } from "@/backend/db";
import { Setting } from "@/backend/models/setting/setting.model";

import { NextRequest, NextResponse } from "next/server";

// @PATCH - Update or Create setting
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ settingId?: string }> }
) {
  await connectDB();
  const body = await req.json();
  const { settingId } = await params;

  if (!settingId || settingId === "undefined") {
    // if settingId is not available, create a new setting
    try {
      const newSetting = new Setting(body);
      const saved = await newSetting.save();

      return NextResponse.json(
        { data: saved, message: "Settings created successfully" },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error creating settings:", error);
      return NextResponse.json(
        { message: "Error creating settings", error },
        { status: 500 }
      );
    }
  }

  // if settingId available then update the existing setting
  try {
    const updatedSetting = await Setting.findOneAndUpdate(
      { _id: settingId },
      body,
      { new: true, upsert: true } // upsert: true will create a new document if it doesn't exist
    );

    return NextResponse.json(
      {
        data: updatedSetting,
        message: "Settings updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating settings:", error);

    return NextResponse.json(
      { message: "Error updating settings", error },
      { status: 500 }
    );
  }
}
