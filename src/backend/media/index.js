/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express");
const Busboy = require("busboy");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.MEDIA_PORT || 4000;

// ===== Middleware =====
app.use(cors());

// ===== Upload Directory =====
const uploadDir = path.join(__dirname, "../../../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ===== Health Check =====
app.get("/", (req, res) => {
  res.send("Media upload service running");
});

// ===== Upload API (IMAGE + VIDEO) =====
app.post("/api/express/upload", (req, res) => {
  // validated login user
  if (req.headers.authorization !== process.env.MEDIA_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const busboy = Busboy({ headers: req.headers });

    let title = "";
    let type = "image";
    let savedFileName = "";

    busboy.on("field", (fieldname, value) => {
      if (fieldname === "title") title = value;
      if (fieldname === "type") type = value;
    });

    busboy.on("file", (fieldname, file, info) => {
      if (fieldname !== "file") return;

      // allow image & video only
      if (
        !info.mimeType.startsWith("image/") &&
        !info.mimeType.startsWith("video/")
      ) {
        file.resume();
        return;
      }

      const safeName = info.filename.replace(/[^a-zA-Z0-9._-]/g, "");
      savedFileName = `${Date.now()}-${safeName}`;

      const savePath = path.join(uploadDir, savedFileName);
      const writeStream = fs.createWriteStream(savePath);

      file.pipe(writeStream);
    });

    busboy.on("finish", () => {
      if (!savedFileName) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      res.status(201).json({
        success: true,
        title,
        type,
        fileName: savedFileName,
        url: `/uploads/${savedFileName}`,
      });
    });

    busboy.on("error", (err) => {
      console.error("Upload error:", err);
      res.status(500).json({ error: "Upload failed" });
    });

    req.pipe(busboy);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "Server error",
      message: error?.message || "Error during upload file",
    });
  }
});

// ===== Serve Uploaded Files =====
app.use("/uploads", express.static(uploadDir));

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`🚀 Media server running on port ${PORT}`);
});
