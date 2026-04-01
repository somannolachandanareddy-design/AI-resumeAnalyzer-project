const express = require("express");
const multer = require("multer");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route
router.post("/analyze", upload.single("resume"), (req, res) => {
  console.log("API Hit");
  console.log("File received:", req.file);

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Dummy response (you can add parsing later)
  res.json({
    message: "File uploaded successfully",
    fileName: req.file.originalname,
  });
});

module.exports = router;