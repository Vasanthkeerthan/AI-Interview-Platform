const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pdfParse = require("pdf-parse");

const router = express.Router();

/* ================= STORAGE ================= */

const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    // RENDER SAFE TEMP FOLDER

    cb(null, "/tmp");

  },

  filename: function (req, file, cb) {

    cb(

      null,

      Date.now() +
      path.extname(file.originalname)

    );
  },
});

/* ================= PDF FILTER ================= */

const fileFilter = (req, file, cb) => {

  if (file.mimetype === "application/pdf") {

    cb(null, true);

  } else {

    cb(

      new Error("Only PDF resumes allowed"),

      false
    );
  }
};

/* ================= MULTER ================= */

const upload = multer({

  storage,

  fileFilter,
});

/* ================= ROUTE ================= */

router.post(

  "/upload",

  upload.single("resume"),

  async (req, res) => {

    try {

      /* FILE CHECK */

      if (!req.file) {

        return res.status(400).json({

          success: false,

          message: "No resume uploaded",
        });
      }

      /* ================= READ PDF ================= */

      const dataBuffer = fs.readFileSync(
        req.file.path
      );

      const pdfData = await pdfParse(
        dataBuffer
      );

      /* CLEAN RESUME TEXT */

      const cleanedText = pdfData.text
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 3000);

      /* ================= RESPONSE ================= */

      res.json({

        success: true,

        filePath: req.file.path,

        fileName: req.file.filename,

        resumeText: cleanedText,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: "Resume upload failed",
      });
    }
  }
);

module.exports = router;