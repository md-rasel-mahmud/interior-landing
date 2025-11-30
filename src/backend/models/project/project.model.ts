import { IProject } from "@/backend/models/project/project.dto";
import mongoose, { Model, Schema, Types } from "mongoose";

const ProjectSchema: Schema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    location: { type: String, required: false },
    category: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
    },
    images: { type: [String], required: true },
    status: { type: String, required: false },
    year: { type: String, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Project: Model<IProject> =
  mongoose.models?.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);

export { Project };
