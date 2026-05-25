import Navbar from "../components/Navbar";

function Home() {

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white overflow-x-hidden">

      {/* ONLY ONE NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}

      <section className="flex flex-col justify-center items-center text-center px-6 pt-32 pb-20">

        <h1 className="text-6xl md:text-8xl font-extrabold leading-tight animate-pulse">

          Ace Your{" "}

          <span className="text-cyan-400">
            Interviews
          </span>

          🚀
        </h1>

        <p className="text-gray-400 text-lg md:text-2xl mt-8 max-w-4xl leading-relaxed">

          Upload your resume, practice AI-powered mock interviews,
          receive instant feedback, improve communication skills,
          and boost your confidence for real-world technical interviews.

        </p>

        {/* BUTTONS */}

        <div className="flex gap-6 mt-12 flex-wrap justify-center">

          <button
            onClick={() => window.location.href = "/dashboard"}
            className="bg-cyan-400 text-black px-10 py-4 rounded-2xl text-xl font-bold hover:scale-110 hover:shadow-cyan-500/50 shadow-lg transition duration-300"
          >

            Start Interview 🚀

          </button>

        </div>

      </section>

      {/* FEATURES SECTION */}

      <section className="grid md:grid-cols-3 gap-8 px-8 pb-24">

        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl hover:scale-105 transition duration-300">

          <h2 className="text-3xl font-bold text-cyan-400 mb-4">

            AI Voice Interview 🎤

          </h2>

          <p className="text-gray-300 leading-relaxed">

            Practice real AI-powered voice interviews with speech recognition.

          </p>

        </div>

        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl hover:scale-105 transition duration-300">

          <h2 className="text-3xl font-bold text-cyan-400 mb-4">

            Resume Analysis 📄

          </h2>

          <p className="text-gray-300 leading-relaxed">

            AI generates personalized interview questions based on your resume.

          </p>

        </div>

        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl hover:scale-105 transition duration-300">

          <h2 className="text-3xl font-bold text-cyan-400 mb-4">

            Instant Feedback ⚡

          </h2>

          <p className="text-gray-300 leading-relaxed">

            Get technical score, confidence score,
            communication analysis, and AI feedback instantly.

          </p>

        </div>

      </section>

    </div>
  );
}

export default Home;