const express = require("express");

const router = express.Router();

const fs = require("fs");

const pdfParse = require("pdf-parse");

router.post("/analyze", async (req, res) => {

  try {

    const filePath = req.body.filePath;

    const dataBuffer = fs.readFileSync(filePath);

    // EXTRACT PDF TEXT

    const pdfData = await pdfParse(dataBuffer);

    const resumeText = pdfData.text;

    console.log(resumeText);

    // QUESTIONS

    const questions = `

1. Explain the projects mentioned in your resume.

2. Which technology are you most comfortable with?

3. Explain your strongest technical skill.

4. Tell me about your hobbies and interests.

5. Explain a challenge you faced in your projects.

6. Which project are you most proud of?

7. Why did you choose your technology stack?

8. Explain teamwork experience from your projects.

9. What improvements would you make to your projects?

10. What are your future career goals?

`;

    res.json({

      success: true,

      extractedText: resumeText,

      questions,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Resume Analysis Failed",

    });

  }

});

module.exports = router;