const express = require("express");

const fs = require("fs");

const pdfParse = require("pdf-parse");

const axios = require("axios");

const router = express.Router();

/* ================= GENERATE QUESTIONS ================= */

router.post(
  "/generate-questions",
  async (req, res) => {

    /* ================= GET DATA ================= */

    const {
      jobRole,
      filePath,
      questionCount,
    } = req.body;

    try {

      /* ================= READ PDF ================= */

      let resumeText = "";

      if (
        filePath &&
        fs.existsSync(filePath)
      ) {

        const dataBuffer =
          fs.readFileSync(filePath);

        const pdfData =
          await pdfParse(dataBuffer);

        /* REDUCE TOKENS */

        resumeText =
          pdfData.text
            .replace(/\s+/g, " ")
            .slice(0, 1000);
      }

      /* ================= SHORT PROMPT ================= */

      const prompt = `
Analyze this resume and generate exactly ${questionCount} interview questions for ${jobRole} role.

Resume:
${resumeText}

Return only interview questions.
`;

      /* ================= OPENROUTER AI ================= */

      const response =
        await axios.post(

          "https://openrouter.ai/api/v1/chat/completions",

          {

            model:
              "deepseek/deepseek-chat",

            messages: [

              {
                role: "user",

                content: prompt,
              },
            ],
          },

          {

            headers: {

              Authorization:
                `Bearer ${process.env.OPENROUTER_API_KEY}`,

              "Content-Type":
                "application/json",
            },
          }
        );

      /* ================= GET TEXT ================= */

      const text =
        response.data.choices[0]
          .message.content;

      /* ================= CLEAN QUESTIONS ================= */

      let questions =
        text
          .split("\n")
          .map((q) =>
            q
              .replace(/^\d+\.\s*/, "")
              .trim()
          )
          .filter(
            (q) =>
              q.length > 5
          );

      /* ================= LIMIT QUESTIONS ================= */

      questions =
        questions.slice(
          0,
          Number(questionCount) || 10
        );

      /* ================= SUCCESS ================= */

      return res.json({

        success: true,

        aiUsed: true,

        questions,
      });

    } catch (error) {

      console.log(
        "AI Failed:",
        error.response?.data ||
        error.message
      );

      /* ================= FALLBACK QUESTIONS ================= */

      const fallbackQuestions = [

        "Tell me about yourself.",

        "Explain the projects in your resume.",

        "What technologies are you strongest in?",

        "Explain a difficult problem you solved.",

        "Why should we hire you?",

        "What are your strengths and weaknesses?",

        "Describe your teamwork experience.",

        "Tell me about your final year project.",

        "How do you debug coding errors?",

        "Where do you see yourself in 5 years?",

        "Explain your favorite programming language.",

        "Tell me about a challenge you faced.",

        "How do you learn new technologies?",

        "Explain a real-world application you built.",

        "What motivates you as a developer?",

        "Describe leadership experience.",

        "How do you handle deadlines?",

        "Explain one technical concept clearly.",

        "Tell me about your hobbies.",

        "What type of company do you want to work for?"
      ];

      /* ================= SELECT QUESTIONS ================= */

      const selectedQuestions =
        fallbackQuestions.slice(
          0,
          Number(questionCount) || 10
        );

      /* ================= SEND FALLBACK ================= */

      return res.json({

        success: true,

        aiUsed: false,

        questions:
          selectedQuestions,
      });
    }
  }
);

module.exports = router;