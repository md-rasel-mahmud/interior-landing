import { IShipping } from "@/backend/models/shipping/shipping.dto";
import mongoose, { Model, Schema } from "mongoose";

const ShippingSchema: Schema = new Schema<IShipping>(
  {
    name: { type: String, required: true },
    charge: { type: Number, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Shipping: Model<IShipping> =
  mongoose.models?.Shipping ||
  mongoose.model<IShipping>("Shipping", ShippingSchema);

export { Shipping, ShippingSchema };
