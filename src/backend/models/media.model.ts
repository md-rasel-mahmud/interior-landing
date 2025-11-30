import mongoose, { Document, Model, Schema } from "mongoose";
import z from "zod";

export interface IMedia extends Document {
  title: string;
  url: string;
  type: "image" | "video";
  mediaId: string; // Cloudinary public ID
}

export type MediaTypeWithId = IMedia & {
  _id: string;
};

const PRODUCT_DEFAULT_VALUES: Partial<IMedia> = {};

const MediaSchema: Schema = new Schema<IMedia>(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, enum: ["image", "video"], required: true },
    mediaId: { type: String, required: true }, // Cloudinary public ID
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const mediaValidation = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Invalid URL").min(1, "URL is required"),
  type: z.enum(["image", "video"]),
  mediaId: z.string(),
});

const Media: Model<IMedia> =
  mongoose.models?.Media || mongoose.model<IMedia>("Media", MediaSchema);

export { Media, mediaValidation, PRODUCT_DEFAULT_VALUES };
