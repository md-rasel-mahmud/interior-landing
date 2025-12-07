/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import path from "path";
import mime from "mime";

export async function GET(_: any, { params }: any) {
  const filePath = path.join(process.cwd(), "uploads", ...params.path);

  if (!fs.existsSync(filePath)) {
    return new Response("File not found", { status: 404 });
  }

  const file = fs.readFileSync(filePath);
  const type = mime.getType(filePath) ?? "application/octet-stream";

  return new Response(file, {
    headers: { "Content-Type": type },
  });
}
