/* eslint-disable @typescript-eslint/no-explicit-any */
import { ISector } from "@/backend/models/sector/sector.dto";
import mongoose, { Model, Schema } from "mongoose";

// import slug from "mongoose-slug-generator";

const SectorSchema: Schema = new Schema<ISector>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: false, index: true, slug: "name" },
    description: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// SectorSchema.plugin(slug);

const Sector: Model<ISector> =
  mongoose.models?.Sector || mongoose.model<ISector>("Sector", SectorSchema);

export { Sector, SectorSchema };
