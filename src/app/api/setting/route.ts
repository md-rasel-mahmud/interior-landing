import { connectDB } from "@/backend/db";
import { Setting } from "@/backend/models/setting/setting.model";
import { getSettingFromDB } from "@/backend/services/setting.service";
import { NextResponse } from "next/server";

// @GET - Fetch settings
export async function GET() {
  await connectDB();
  // Placeholder for the GET request logic
  const data = await getSettingFromDB();

  const response = {
    data,
    message: "Settings fetched successfully",
  };

  // This is a placeholder for the GET request handler
  return NextResponse.json(response, {
    status: 200,
  });
}

// @POST - Create or update settings
export async function POST(req: Request) {
  await connectDB();
  const { banner, footer, socials } = await req.json();

  try {
    const existingSetting = await Setting.findOne();

    if (existingSetting) {
      // Update existing settings
      existingSetting.banner = banner;
      existingSetting.footer = footer;
      existingSetting.socials = socials;

      const updatedSetting = await existingSetting.save();

      return NextResponse.json(
        {
          data: updatedSetting,
          message: "Settings updated successfully",
        },
        { status: 200 }
      );
    } else {
      // Create new settings
      const newSetting = new Setting({
        banner,
        footer,
        socials,
      });

      const savedSetting = await newSetting.save();

      const response = {
        data: savedSetting,
        message: "Settings created successfully",
      };

      return new Response(JSON.stringify(response), { status: 201 });
    }
  } catch (error: unknown) {
    console.error("Error saving settings:", error);

    return NextResponse.json(
      { message: "Error saving settings", error: (error as Error).message },
      { status: 500 }
    );
  }
}
