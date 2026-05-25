import { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert("Registration Successful ✅");

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert("Registration Failed ❌");
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black flex justify-center items-center p-6">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 p-10 rounded-3xl">

        {/* TITLE */}

        <h1 className="text-5xl font-bold text-cyan-400 text-center mb-3">

          Create Account 🚀

        </h1>

        <p className="text-gray-400 text-center mb-8">

          Register to start your AI interview journey

        </p>

        {/* FORM */}

        <form
          onSubmit={handleRegister}
          className="space-y-6"
        >

          {/* NAME */}

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full bg-black/30 border border-gray-700 p-4 rounded-2xl text-white outline-none focus:border-cyan-400"
            required
          />

          {/* EMAIL */}

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-black/30 border border-gray-700 p-4 rounded-2xl text-white outline-none focus:border-cyan-400"
            required
          />

          {/* PASSWORD */}

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-black/30 border border-gray-700 p-4 rounded-2xl text-white outline-none focus:border-cyan-400"
            required
          />

          {/* BUTTON */}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black py-4 rounded-2xl text-xl font-bold hover:scale-105 transition"
          >

            Register

          </button>

        </form>

        {/* LOGIN REDIRECT */}

        <p className="text-center text-gray-400 mt-6">

          Already have an account?

          <span
            onClick={() => navigate("/login")}
            className="text-cyan-400 cursor-pointer ml-2 hover:underline"
          >

            Login

          </span>

        </p>

      </div>

    </div>
  );
}

export default Register;