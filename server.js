const express = require("express");
require("dotenv").config();

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const resumeRoute = require("./routes/resume");
app.use("/analyze", resumeRoute);

app.listen(5000, () => console.log("Server running on port 5000"));