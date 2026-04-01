const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const axios = require("axios");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("resume"), async (req, res) => {
  console.log("API HIT");
  try {
    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text;

    const jobDescription = req.body.jobDescription || "";

    const prompt = `
    Analyze the resume against the job description.

    Resume:
    ${resumeText}

    Job Description:
    ${jobDescription}

    Give:
    1. ATS Score (0-100)
    2. Matching Skills
    3. Missing Skills
    4. Suggestions
    `;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ result: response.data.choices[0].message.content });

  } catch (err) {
    res.status(500).json({ error: "Error analyzing resume" });
  }
});

module.exports = router;