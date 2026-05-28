import { useEffect, useState } from "react";

import axios from "axios";

function Interview() {

  /* ================= STATES ================= */

  const [questions, setQuestions] =
    useState([]);

  const [currentQuestion,
    setCurrentQuestion] =
    useState(0);

  const [answer, setAnswer] =
    useState("");

  const [answers, setAnswers] =
    useState([]);

  const [listening,
    setListening] =
    useState(false);

  /* ================= TIMER ================= */

  const [timeLeft,
    setTimeLeft] =
    useState(600);

  /* ================= LOAD QUESTIONS ================= */

  useEffect(() => {

    const savedQuestions =
      JSON.parse(
        localStorage.getItem(
          "questions"
        )
      ) || [];

    const selectedQuestionCount =
      Number(
        localStorage.getItem(
          "questionCount"
        )
      ) || 5;

    const filteredQuestions =
      savedQuestions
        .filter(
          (q) =>
            q.trim() !== ""
        )
        .slice(
          0,
          selectedQuestionCount
        );

    setQuestions(
      filteredQuestions
    );

  }, []);

  /* ================= TIMER ================= */

  useEffect(() => {

    if (timeLeft <= 0) {

      finishInterview();

      return;
    }

    const timer =
      setInterval(() => {

        setTimeLeft(
          (prev) =>
            prev - 1
        );

      }, 1000);

    return () =>
      clearInterval(timer);

  }, [timeLeft]);

  /* ================= SAVE RESULT ================= */

  const saveResult =
    async (
      finalAnswers
    ) => {

      try {

        const response =
          await axios.post(

            "https://ai-interview-platform-b3py.onrender.com/api/results/save-result",

            {

              userEmail:

                localStorage.getItem(
                  "email"
                ) ||

                JSON.parse(
                  localStorage.getItem(
                    "user"
                  )
                )?.email,

              questions,

              answers:
                finalAnswers,

              resumeText:

                localStorage.getItem(
                  "resumeText"
                ) || "",
            }
          );

        localStorage.setItem(

          "resultData",

          JSON.stringify(
            response.data
          )
        );

        return true;

      } catch (error) {

        console.log(error);

        alert(
          "Result save failed"
        );

        return false;
      }
    };

  /* ================= FINISH INTERVIEW ================= */

  const finishInterview =
    async () => {

      localStorage.setItem(

        "answers",

        JSON.stringify(
          answers
        )
      );

      const saved =
        await saveResult(
          answers
        );

      if (saved) {

        window.location.href =
          "/result";
      }
    };

  /* ================= SPEAK QUESTION ================= */

  const speakQuestion =
    () => {

      if (
        !questions[
          currentQuestion
        ]
      )
        return;

      const speech =
        new SpeechSynthesisUtterance(

          questions[
            currentQuestion
          ]
        );

      speech.lang =
        "en-US";

      speech.rate = 1;

      speech.pitch = 1;

      window.speechSynthesis.speak(
        speech
      );
    };

  /* ================= AUTO SPEAK ================= */

  useEffect(() => {

    if (
      questions.length > 0
    ) {

      speakQuestion();
    }

  }, [
    currentQuestion,
    questions,
  ]);

  /* ================= START LISTENING ================= */

  const startListening =
    () => {

      const SpeechRecognition =

        window.SpeechRecognition ||

        window.webkitSpeechRecognition;

      if (
        !SpeechRecognition
      ) {

        alert(
          "Speech Recognition Not Supported"
        );

        return;
      }

      const recognition =
        new SpeechRecognition();

      recognition.lang =
        "en-US";

      recognition.continuous =
        false;

      recognition.interimResults =
        false;

      recognition.start();

      setListening(true);

      recognition.onresult =
        (event) => {

          const transcript =

            event.results[0][0]
              .transcript;

          setAnswer(
            transcript
          );

          setListening(false);
        };

      recognition.onerror =
        (event) => {

          console.log(
            event.error
          );

          alert(
            "Voice Recognition Failed"
          );

          setListening(false);
        };

      recognition.onend =
        () => {

          setListening(false);
        };
    };

  /* ================= NEXT QUESTION ================= */

  const nextQuestion =
    async () => {

      const updatedAnswers =
        [

          ...answers,

          {

            question:

              questions[
                currentQuestion
              ],

            answer:
              answer.trim(),
          },
        ];

      setAnswers(
        updatedAnswers
      );

      setAnswer("");

      localStorage.setItem(

        "answers",

        JSON.stringify(
          updatedAnswers
        )
      );

      /* LAST QUESTION */

      if (

        currentQuestion >=
        questions.length - 1

      ) {

        const saved =
          await saveResult(
            updatedAnswers
          );

        if (saved) {

          window.location.href =
            "/result";
        }

      } else {

        setCurrentQuestion(

          currentQuestion + 1
        );
      }
    };

  /* ================= TIMER FORMAT ================= */

  const minutes =
    Math.floor(
      timeLeft / 60
    );

  const seconds =
    timeLeft % 60;

  /* ================= MAIN UI ================= */

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white p-10">

      {/* TITLE */}

      <h1 className="text-5xl font-bold text-cyan-400 mb-10 text-center">

        AI Voice Interview 🎤

      </h1>

      {/* TIMER */}

      <div className="max-w-4xl mx-auto mb-8">

        <div className="flex justify-between items-center mb-4">

          <p className="text-xl text-cyan-300">

            ⏱️ Time Left:

            {" "}

            {minutes}:

            {seconds < 10
              ? `0${seconds}`
              : seconds}

          </p>

          <p className="text-xl text-cyan-300">

            Question

            {" "}

            {currentQuestion + 1}

            {" "}

            /

            {" "}

            {questions.length}

          </p>

        </div>

        {/* PROGRESS */}

        <div className="w-full bg-gray-700 rounded-full h-4">

          <div
            className="bg-gradient-to-r from-cyan-400 to-blue-500 h-4 rounded-full transition-all duration-500"
            style={{

              width: `${
                (
                  (
                    currentQuestion + 1
                  ) /
                  questions.length
                ) * 100
              }%`,
            }}
          ></div>

        </div>

      </div>

      {/* CARD */}

      <div className="max-w-4xl mx-auto bg-white/10 border border-white/10 p-10 rounded-3xl backdrop-blur-xl">

        {/* QUESTION */}

        <div className="bg-black/30 p-8 rounded-2xl mb-8 min-h-[150px] flex items-center">

          <p className="text-2xl leading-relaxed">

            {
              questions[
                currentQuestion
              ]
            }

          </p>

        </div>

        {/* BUTTONS */}

        <div className="flex gap-5 mb-8 flex-wrap">

          <button
            onClick={
              speakQuestion
            }
            className="bg-cyan-400 text-black px-6 py-3 rounded-2xl font-bold hover:bg-cyan-300 transition"
          >

            🔊 Repeat Question

          </button>

          <button
            onClick={
              startListening
            }
            className="bg-green-400 text-black px-6 py-3 rounded-2xl font-bold hover:bg-green-300 transition"
          >

            {listening

              ? "🎙️ Listening..."

              : "🎤 Speak Answer"}

          </button>

        </div>

        {/* ANSWER */}

        <div className="bg-black/30 p-6 rounded-2xl mb-8 min-h-[150px]">

          <h3 className="text-xl text-cyan-300 mb-3">

            Your Answer:

          </h3>

          <p className="text-lg text-gray-300 leading-relaxed">

            {answer ||

              "Your answer will appear here..."}

          </p>

        </div>

        {/* BUTTON */}

        {

          currentQuestion ===
          questions.length - 1

          ? (

            <button
              onClick={
                nextQuestion
              }
              className="w-full bg-green-400 text-black py-4 rounded-2xl text-xl font-bold hover:bg-green-300 transition"
            >

              Submit Interview ✅

            </button>

          ) : (

            <button
              onClick={
                nextQuestion
              }
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black py-4 rounded-2xl text-xl font-bold hover:scale-105 transition"
            >

              Next Question →

            </button>
          )
        }

      </div>

    </div>
  );
}

export default Interview;