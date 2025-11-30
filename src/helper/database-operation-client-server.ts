import { connectDB } from "@/backend/db";

// GET - Perform database operations either on client-side or server-side
export const databaseOperationsClientOrServer = async <T>(
  callback: () => Promise<T> | T
) => {
  try {
    await connectDB();

    return await callback();
  } catch (error) {
    console.error("Database Operation error:", error);

    return {
      status: 500,
      message: "Database operation failed",
      error: error instanceof Error ? error.message : String(error),
    } as { status: number; message: string; error?: string };
  }
};
