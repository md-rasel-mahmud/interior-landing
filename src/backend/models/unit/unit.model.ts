import { IUnit } from "@/backend/models/unit/unit.dto";
import mongoose, { Model, Schema } from "mongoose";

const UnitSchema: Schema = new Schema<IUnit>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Unit: Model<IUnit> =
  mongoose.models?.Unit || mongoose.model<IUnit>("Unit", UnitSchema);

export { Unit, UnitSchema };
