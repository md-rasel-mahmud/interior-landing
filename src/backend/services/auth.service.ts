import { User } from "@/backend/models/user.model";
import bcrypt from "bcryptjs";

export const seedAdminUser = async () => {
  const existingUser = await User.findOne({
    username: process.env.NEXT_PUBLIC_STATIC_USERNAME!,
  });

  if (existingUser) {
    console.log("✅ User already exists, skipping seed...");
    return;
  }

  const hashedPassword = await bcrypt.hash(
    process.env.NEXT_PUBLIC_STATIC_PASSWORD!,
    10
  );

  const newUser = new User({
    username: process.env.NEXT_PUBLIC_STATIC_USERNAME!,
    password: hashedPassword,
  });

  await newUser.save();

  console.log("🌱 Default user created successfully!");
};
