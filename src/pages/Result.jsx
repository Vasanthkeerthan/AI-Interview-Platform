import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

function Result() {

  const navigate = useNavigate();

  /* ================= GET ANSWERS ================= */

  const answers =
    JSON.parse(
      localStorage.getItem("answers")
    ) || [];

  const totalQuestions =
    answers.length;

  /* ================= RESUME TEXT ================= */

  const resumeText =
    (
      localStorage.getItem(
        "resumeText"
      ) || ""
    ).toLowerCase();

  /* ================= ANSWER EVALUATION ================= */

  let totalScore = 0;

  let relevantAnswers = 0;

  let irrelevantAnswers = 0;

  answers.forEach((item) => {

    const answer =
      (item.answer || "")
        .toLowerCase()
        .trim();

    const question =
      (item.question || "")
        .toLowerCase();

    /* EMPTY ANSWER */

    if (!answer || answer.length < 5) {

      totalScore -= 10;

      irrelevantAnswers++;

      return;
    }

    /* QUESTION WORDS */

    const questionWords =
      question.split(" ");

    let matchedWords = 0;

    questionWords.forEach((word) => {

      if (
        answer.includes(word) &&
        word.length > 4
      ) {

        matchedWords++;
      }
    });

    /* RESUME MATCH */

    let resumeMatch = 0;

    if (
      resumeText &&
      answer.length > 10
    ) {

      const resumeWords =
        resumeText.split(" ");

      resumeWords.forEach((word) => {

        if (
          answer.includes(word) &&
          word.length > 5
        ) {

          resumeMatch++;
        }
      });
    }

    /* RELEVANCE */

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

    /* BONUS */

    if (answer.length > 80) {

      totalScore += 5;
    }

  });

  /* ================= FINAL SCORE ================= */

  let overallScore =
    Math.max(
      10,
      Math.min(100, totalScore)
    );

  /* ================= CATEGORY SCORES ================= */

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

  if (overallScore >= 85) {

    feedback =
      "Excellent technical and communication performance.";

  } else if (overallScore >= 70) {

    feedback =
      "Good performance. Improve technical depth.";

  } else if (overallScore >= 50) {

    feedback =
      "Average performance. Practice more interviews.";

  } else {

    feedback =
      "You need more practice and confidence.";
  }

  /* ================= PERFORMANCE MESSAGE ================= */

  let performanceMessage = "";

  if (overallScore >= 85) {

    performanceMessage =
      "Excellent Performance 🚀";

  } else if (overallScore >= 70) {

    performanceMessage =
      "Good Job 👍";

  } else if (overallScore >= 50) {

    performanceMessage =
      "Average Performance ⚡";

  } else {

    performanceMessage =
      "Needs Improvement 📚";
  }

  /* ================= INTERVIEW HISTORY ================= */

  const previousScore =
    Number(
      localStorage.getItem(
        "previousOverallScore"
      )
    ) || 0;

  let improvementMessage = "";

  if (overallScore > previousScore) {

    improvementMessage =
      "You Improved 📈";

  } else if (
    overallScore < previousScore
  ) {

    improvementMessage =
      "Performance Dropped 📉";

  } else {

    improvementMessage =
      "Performance Stable ⚖️";
  }

  /* ================= SAVE CURRENT SCORE ================= */

  useEffect(() => {

    localStorage.setItem(
      "previousOverallScore",
      overallScore
    );

  }, [overallScore]);

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white p-8">

      <div className="max-w-6xl mx-auto">

        {/* ================= TITLE ================= */}

        <h1 className="text-5xl font-bold text-center text-cyan-400 mb-4">

          Interview Results 🎉

        </h1>

        <p className="text-center text-gray-400 mb-10 text-lg">

          AI Evaluation Report

        </p>

        {/* ================= PERFORMANCE BANNER ================= */}

        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black p-8 rounded-3xl mb-10 text-center">

          <h2 className="text-4xl font-bold mb-2">

            {performanceMessage}

          </h2>

          <p className="text-xl font-semibold">

            Relevant Answers:
            {" "}
            {relevantAnswers}

            {" | "}

            Irrelevant Answers:
            {" "}
            {irrelevantAnswers}

          </p>

          <p className="text-lg font-bold mt-4">

            {improvementMessage}

          </p>

        </div>

        {/* ================= SCORE CARDS ================= */}

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-white/10 p-6 rounded-3xl text-center border border-cyan-500">

            <h2 className="text-cyan-400 text-xl font-bold mb-3">

              Overall Score

            </h2>

            <p className="text-5xl font-bold">

              {overallScore}%

            </p>

          </div>

          <div className="bg-white/10 p-6 rounded-3xl text-center border border-cyan-500">

            <h2 className="text-cyan-400 text-xl font-bold mb-3">

              Technical

            </h2>

            <p className="text-5xl font-bold">

              {technicalScore}%

            </p>

          </div>

          <div className="bg-white/10 p-6 rounded-3xl text-center border border-cyan-500">

            <h2 className="text-cyan-400 text-xl font-bold mb-3">

              Communication

            </h2>

            <p className="text-5xl font-bold">

              {communicationScore}%

            </p>

          </div>

          <div className="bg-white/10 p-6 rounded-3xl text-center border border-cyan-500">

            <h2 className="text-cyan-400 text-xl font-bold mb-3">

              Confidence

            </h2>

            <p className="text-5xl font-bold">

              {confidenceScore}%

            </p>

          </div>

        </div>

        {/* ================= AI FEEDBACK ================= */}

        <div className="bg-white/10 p-8 rounded-3xl mb-10 border border-cyan-500">

          <h2 className="text-3xl font-bold text-cyan-400 mb-6">

            AI Feedback 🤖

          </h2>

          <div className="space-y-4 text-lg text-gray-300">

            <p>
              ✅ {feedback}
            </p>

            <p>
              ✅ Relevant answers:
              {" "}
              {relevantAnswers}
            </p>

            <p>
              ⚠ Irrelevant answers:
              {" "}
              {irrelevantAnswers}
            </p>

            <p>
              ✅ Resume-based evaluation completed.
            </p>

            <p>
              ✅ Communication analysis completed.
            </p>

            {
              overallScore < 50 && (
                <p>
                  ⚠ Practice mock interviews regularly.
                </p>
              )
            }

          </div>

        </div>

        {/* ================= ANSWERS ================= */}

        <div className="bg-white/10 p-8 rounded-3xl mb-10 border border-cyan-500">

          <h2 className="text-3xl font-bold text-cyan-400 mb-6">

            Your Answers 📝

          </h2>

          <div className="space-y-6">

            {answers.map((item, index) => (

              <div
                key={index}
                className="bg-black/30 p-6 rounded-2xl border border-gray-700"
              >

                <h3 className="text-xl font-bold text-cyan-300 mb-3">

                  Q{index + 1}: {item.question}

                </h3>

                <p className="text-gray-300 text-lg">

                  {
                    item.answer &&
                    item.answer.trim() !== ""
                      ? item.answer
                      : "No answer provided."
                  }

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* ================= BUTTONS ================= */}

        <div className="flex flex-col md:flex-row gap-6">

          <button
            onClick={() =>
              navigate("/interview")
            }
            className="flex-1 bg-cyan-400 text-black py-4 rounded-2xl text-xl font-bold hover:scale-105 transition"
          >

            Retake Interview 🔄

          </button>

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="flex-1 bg-green-500 text-black py-4 rounded-2xl text-xl font-bold hover:scale-105 transition"
          >

            Back To Dashboard 🏠

          </button>

        </div>

      </div>

    </div>
  );
}

export default Result;