import { seedAdminUser } from "@/backend/services/auth.service";
import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI!;
const DB_NAME = process.env.NEXT_PUBLIC_DB_NAME || "test";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Apply slug plugin
// mongoose.plugin(slug);

// Global cache for Next.js hot reload and serverless
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    await seedAdminUser();
    console.log("✅ Database connected successfully");
  } catch (error) {
    cached.promise = null;
    console.error("❌ Database connection failed:", error);
    throw error;
  }

  return cached.conn;
};
