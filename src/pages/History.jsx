import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

function History() {

  const [
    interviews,
    setInterviews,
  ] = useState([]);

  const [
    selectedInterview,
    setSelectedInterview,
  ] = useState(null);

  useEffect(() => {

    fetchHistory();

  }, []);

  /* FETCH HISTORY */

  const fetchHistory =
    async () => {

      try {

        const email =
          localStorage.getItem(
            "email"
          );

        const response =
          await axios.get(

`http://localhost:5000/api/results/history/${email}`

          );

        console.log(
          response.data
        );

        setInterviews(

          response.data.interviews || []

        );

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-cyan-400 mb-10">

        Interview History 📚

      </h1>

      {/* EMPTY */}

      {interviews.length === 0 && (

        <p className="text-gray-400 text-xl">

          No interviews found.

        </p>

      )}

      {/* INTERVIEW LIST */}

      <div className="grid gap-6">

        {interviews.map(
          (item, index) => (

          <div
            key={item._id}
            className="bg-white/10 p-6 rounded-3xl border border-white/10"
          >

            <div className="flex justify-between items-center flex-wrap gap-4">

              <div>

                <h2 className="text-2xl font-bold text-cyan-300">

                  Interview {index + 1}

                </h2>

                <p className="text-gray-400">

                  Overall Score:
                  {" "}
                  {item.overallScore}%

                </p>

                <p className="text-gray-500 text-sm">

                  {new Date(
                    item.createdAt
                  ).toLocaleString()}

                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedInterview(
                    item
                  )
                }
                className="bg-cyan-400 text-black px-6 py-3 rounded-2xl font-bold hover:scale-105 transition"
              >

                View Details

              </button>

            </div>

          </div>

        ))}

      </div>

      {/* DETAILS */}

      {selectedInterview && (

        <div className="mt-12 bg-white/10 p-8 rounded-3xl">

          <h2 className="text-4xl font-bold text-cyan-400 mb-8">

            Interview Details 📝

          </h2>

          <div className="space-y-6">

            {selectedInterview.answers.map(
              (ans, index) => (

              <div
                key={index}
                className="bg-black/30 p-6 rounded-2xl"
              >

                <h3 className="text-cyan-300 text-xl font-bold mb-3">

                  Q{index + 1}:
                  {" "}
                  {ans.question}

                </h3>

                <p className="text-gray-300">

                  {ans.answer ||
                    "No answer provided"}

                </p>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  );
}

export default History;