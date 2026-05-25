import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import axios from "axios";

function Dashboard() {

  const navigate =
    useNavigate();

  /* ================= STATES ================= */

  const [resume,
    setResume] =
    useState(null);

  const [jobRole,
    setJobRole] =
    useState("");

  const [questions,
    setQuestions] =
    useState([]);

  const [questionCount,
    setQuestionCount] =
    useState(10);

  const [loading,
    setLoading] =
    useState(false);

  const [interviewCount,
    setInterviewCount] =
    useState(0);

  const [latestScore,
    setLatestScore] =
    useState(0);

  const [userName,
    setUserName] =
    useState("");

  const [userEmail,
    setUserEmail] =
    useState("");

  /* ================= FETCH USER DATA ================= */

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData =
    async () => {

      try {

        const user =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

        if (user) {

          setUserName(
            user.name
          );

          setUserEmail(
            user.email
          );

          const response =
            await axios.get(
              `http://localhost:5000/api/results/history/${user.email}`
            );

          const interviews =
            response.data.interviews;

          /* TOTAL INTERVIEWS */

          setInterviewCount(
            interviews.length
          );

          /* LATEST SCORE */

          if (
            interviews.length > 0
          ) {

            setLatestScore(
              interviews[0]
                .overallScore
            );
          }
        }

      } catch (error) {

        console.log(error);
      }
    };

  /* =========================
     UPLOAD RESUME
  ========================= */

  const uploadResume =
    async () => {

      if (!resume) {

        alert(
          "Please select PDF resume"
        );

        return;
      }

      /* PDF CHECK */

      if (
        resume.type !==
        "application/pdf"
      ) {

        alert(
          "Only PDF files are allowed"
        );

        return;
      }

      const formData =
        new FormData();

      formData.append(
        "resume",
        resume
      );

      try {

        setLoading(true);

        const response =
          await axios.post(

            "http://localhost:5000/api/resume/upload",

            formData
          );

        /* SAVE FILE PATH */

        localStorage.setItem(

          "resumePath",

          response.data.filePath
        );

        /* SAVE RESUME TEXT */

        localStorage.setItem(

          "resumeText",

          response.data.resumeText || ""
        );

        alert(
          "Resume uploaded successfully ✅"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Upload failed"
        );
      }

      setLoading(false);
    };

  /* =========================
     GENERATE QUESTIONS
  ========================= */

  const generateQuestions =
    async () => {

      try {

        setLoading(true);

        const filePath =
          localStorage.getItem(
            "resumePath"
          );

        if (!filePath) {

          alert(
            "Upload resume first"
          );

          setLoading(false);

          return;
        }

        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              1500
            )
        );

        const response =
          await axios.post(

            "http://localhost:5000/api/ai/generate-questions",

            {

              jobRole,

              filePath,

              questionCount,
            }
          );

        setQuestions(
          response.data.questions
        );

        localStorage.setItem(

          "questions",

          JSON.stringify(
            response.data.questions
          )
        );

        alert(

          response.data.aiUsed

            ? "AI Questions Generated ✅"

            : "Fallback Questions Generated ⚠"
        );

      } catch (error) {

        console.log(error);

        alert(
          "AI failed"
        );
      }

      setLoading(false);
    };

  /* =========================
     START INTERVIEW
  ========================= */

  const startInterview =
    () => {

      if (
        questions.length === 0
      ) {

        alert(
          "Generate questions first"
        );

        return;
      }

      navigate(
        "/interview"
      );
    };

  /* =========================
     LOGOUT
  ========================= */

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white p-8">

      {/* ================= HEADER ================= */}

      <div className="flex justify-between items-center mb-12">

        <div>

          <h1 className="text-5xl font-extrabold text-cyan-400">

            AI Dashboard 🚀

          </h1>

          <p className="text-gray-400 mt-2 text-lg">

            Welcome back to your AI Interview Platform

          </p>

          {/* USER DETAILS */}

          <div className="mt-5">

            <h2 className="text-2xl font-bold text-white">

              {userName}

            </h2>

            <p className="text-cyan-300">

              {userEmail}

            </p>

          </div>

        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-2xl font-bold transition"
        >

          Logout

        </button>

      </div>

      {/* ================= STATS ================= */}

      <div className="grid md:grid-cols-3 gap-8 mb-14">

        {/* INTERVIEWS */}

        <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-lg">

          <h2 className="text-2xl font-bold text-cyan-400 mb-4">

            Interviews Taken

          </h2>

          <p className="text-5xl font-bold">

            {interviewCount}

          </p>

        </div>

        {/* AI SCORE */}

        <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-lg">

          <h2 className="text-2xl font-bold text-cyan-400 mb-4">

            Latest AI Score

          </h2>

          <p className="text-5xl font-bold">

            {latestScore}%

          </p>

        </div>

        {/* RESUME */}

        <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-lg">

          <h2 className="text-2xl font-bold text-cyan-400 mb-4">

            Resume Uploaded

          </h2>

          <p className="text-5xl font-bold">

            {resume
              ? "Yes ✅"
              : "No ❌"}

          </p>

        </div>

      </div>

      {/* ================= MAIN GRID ================= */}

      <div className="grid md:grid-cols-2 gap-10">

        {/* ================= LEFT ================= */}

        <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-lg">

          <h2 className="text-3xl font-bold text-cyan-400 mb-6">

            Upload Resume 📄

          </h2>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setResume(
                e.target.files[0]
              )
            }
            className="w-full bg-black/30 p-4 rounded-2xl border border-gray-700 mb-6"
          />

          <button
            onClick={uploadResume}
            disabled={loading}
            className="w-full bg-cyan-400 text-black py-4 rounded-2xl text-xl font-bold hover:scale-105 transition"
          >

            {loading
              ? "Uploading..."
              : "Upload Resume"}

          </button>

        </div>

        {/* ================= RIGHT ================= */}

        <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-lg">

          <h2 className="text-3xl font-bold text-cyan-400 mb-6">

            AI Interview 🎤

          </h2>

          <input
            type="text"
            placeholder="Enter Job Role"
            value={jobRole}
            onChange={(e) =>
              setJobRole(
                e.target.value
              )
            }
            className="w-full bg-black/30 p-4 rounded-2xl border border-gray-700 mb-6"
          />

          <select
            value={questionCount}
            onChange={(e) =>
              setQuestionCount(
                e.target.value
              )
            }
            className="w-full bg-black/30 p-4 rounded-2xl border border-gray-700 mb-6 text-white"
          >

            <option value={5}>
              5 Questions
            </option>

            <option value={10}>
              10 Questions
            </option>

            <option value={15}>
              15 Questions
            </option>

            <option value={20}>
              20 Questions
            </option>

          </select>

          <button
            onClick={
              generateQuestions
            }
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black py-4 rounded-2xl text-xl font-bold hover:scale-105 transition mb-6"
          >

            {loading
              ? "Generating..."
              : "Generate Questions 🤖"}

          </button>

          <button
            onClick={
              startInterview
            }
            className="w-full bg-green-400 text-black py-4 rounded-2xl text-xl font-bold hover:scale-105 transition"
          >

            Start Interview 🚀

          </button>

          {/* HISTORY BUTTON */}

          <button
            onClick={() =>
              navigate("/history")
            }
            className="w-full bg-purple-500 text-white py-4 rounded-2xl text-xl font-bold hover:scale-105 transition mt-5"
          >

            Interview History 📚

          </button>

        </div>

      </div>

      {/* ================= QUESTIONS ================= */}

      {questions.length > 0 && (

        <div className="bg-white/10 p-10 rounded-3xl mt-14 backdrop-blur-lg">

          <h2 className="text-4xl font-bold text-cyan-400 mb-8">

            Personalized Questions 🤖

          </h2>

          <div className="space-y-5">

            {questions.map(
              (q, index) => (

                <div
                  key={index}
                  className="bg-black/30 p-5 rounded-2xl text-lg border border-gray-700"
                >

                  <span className="text-cyan-400 font-bold">

                    Q{index + 1}:

                  </span>

                  {" "}

                  {q}

                </div>
              )
            )}

          </div>

        </div>
      )}

    </div>
  );
}

export default Dashboard;