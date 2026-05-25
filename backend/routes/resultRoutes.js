const express = require("express");

const Interview = require("../models/Interview");

const router = express.Router();

/* ================= SAVE RESULT ================= */

router.post(
  "/save-result",

  async (req, res) => {

    try {

      const {

        userEmail,

        questions,

        answers,

        resumeText,

      } = req.body;

      /* ================= CHECK EMAIL ================= */

      if (!userEmail) {

        return res.status(400).json({

          success: false,

          message: "User email missing",
        });
      }

      /* ================= EVALUATION ================= */

      let totalScore = 0;

      let relevantAnswers = 0;

      let irrelevantAnswers = 0;

      const lowerResume =
        (resumeText || "")
          .toLowerCase();

      answers.forEach(
        (item, index) => {

          const answer =
            (
              item.answer || ""
            )
              .toLowerCase()
              .trim();

          const question =
            (
              questions[index] || ""
            )
              .toLowerCase();

          /* EMPTY ANSWER */

          if (
            !answer ||
            answer.length < 5
          ) {

            totalScore -= 10;

            irrelevantAnswers++;

            return;
          }

          /* QUESTION WORDS */

          const questionWords =
            question.split(" ");

          let matchedWords = 0;

          questionWords.forEach(
            (word) => {

              if (
                answer.includes(word) &&
                word.length > 4
              ) {

                matchedWords++;
              }
            }
          );

          /* RESUME MATCH */

          let resumeMatch = 0;

          if (
            lowerResume &&
            answer.length > 10
          ) {

            const resumeWords =
              lowerResume.split(" ");

            resumeWords.forEach(
              (word) => {

                if (
                  answer.includes(word) &&
                  word.length > 5
                ) {

                  resumeMatch++;
                }
              }
            );
          }

          /* RELEVANT ANSWER */

          if (
            matchedWords >= 2 ||
            resumeMatch >= 2
          ) {

            totalScore += 18;

            relevantAnswers++;

          } else {

            totalScore -= 5;

            irrelevantAnswers++;
          }

          /* BONUS FOR GOOD ANSWER */

          if (
            answer.length > 80
          ) {

            totalScore += 5;
          }
        }
      );

      /* ================= FINAL SCORES ================= */

      let overallScore =
        Math.max(
          10,
          Math.min(
            100,
            totalScore
          )
        );

      const technicalScore =
        Math.min(
          100,
          overallScore + 5
        );

      const communicationScore =
        Math.min(
          100,
          overallScore - 3
        );

      const confidenceScore =
        Math.min(
          100,
          overallScore - 5
        );

      /* ================= FEEDBACK ================= */

      let feedback = "";

      if (
        overallScore >= 85
      ) {

        feedback =
          "Excellent technical and communication performance.";

      } else if (
        overallScore >= 70
      ) {

        feedback =
          "Good performance. Improve technical depth.";

      } else if (
        overallScore >= 50
      ) {

        feedback =
          "Average performance. Practice more interviews.";

      } else {

        feedback =
          "You need more practice and confidence.";
      }

      /* ================= SAVE TO DATABASE ================= */

      const newInterview =
        new Interview({

          userEmail,

          questions,

          answers,

          technicalScore,

          communicationScore,

          confidenceScore,

          overallScore,

          relevantAnswers,

          irrelevantAnswers,

          feedback,

          createdAt:
            new Date(),
        });

      await newInterview.save();

      console.log(
        "Interview Saved ✅"
      );

      /* ================= RESPONSE ================= */

      res.json({

        success: true,

        technicalScore,

        communicationScore,

        confidenceScore,

        overallScore,

        relevantAnswers,

        irrelevantAnswers,

        feedback,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Result save failed",
      });
    }
  }
);

/* ================= GET HISTORY ================= */

router.get(
  "/history/:email",

  async (req, res) => {

    try {

      console.log(
        "Fetching history for:",
        req.params.email
      );

      const interviews =
        await Interview.find({

          userEmail:
            req.params.email,
        }).sort({

          createdAt: -1,
        });

      console.log(
        "Interviews Found:",
        interviews.length
      );

      res.json({

        success: true,

        interviews,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "History fetch failed",
      });
    }
  }
);

module.exports = router;