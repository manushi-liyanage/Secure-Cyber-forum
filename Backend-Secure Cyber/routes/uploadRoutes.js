// routes/uploadRoute.js
const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("file"), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({
    filePath: `/uploads/${file.filename}`,
    fileType: file.mimetype.startsWith("image") ? "image" : "video",
  });
});

module.exports = router;
