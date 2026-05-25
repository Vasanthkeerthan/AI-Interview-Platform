const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

/* LOAD ENV */
dotenv.config();

/* APP */
const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* STATIC FOLDER */
app.use("/uploads", express.static("uploads"));

/* DATABASE CONNECTION */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((err) => {
    console.log("MongoDB Error ❌");
    console.log(err);
  });

/* ROUTES */
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const aiRoutes = require("./routes/aiRoutes");
const resultRoutes = require("./routes/resultRoutes");

/* API ROUTES */
app.use("/api/auth", authRoutes);

app.use("/api/resume", resumeRoutes);

app.use("/api/ai", aiRoutes);

/* IMPORTANT FIX */
app.use("/api/results", resultRoutes);

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("AI Interview Backend Running 🚀");
});

/* TEST RESULTS ROUTE */
app.get("/api/test", (req, res) => {
  res.json({
    message: "API Working ✅",
  });
});

/* PORT */
const PORT = process.env.PORT || 5000;

/* SERVER */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});