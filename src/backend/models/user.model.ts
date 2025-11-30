import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  password: string;
  username: string;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
