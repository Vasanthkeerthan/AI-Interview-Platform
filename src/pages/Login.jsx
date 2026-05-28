import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function Login() {

  const navigate =
    useNavigate();

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  /* ================= LOGIN ================= */

  const handleLogin =
    async () => {

      try {

        const response =
          await axios.post(

            "https://ai-interview-platform-b3py.onrender.com/api/auth/login",

            {

              email,

              password,
            }
          );

        /* SAVE USER */

        localStorage.setItem(

          "user",

          JSON.stringify(
            response.data.user
          )
        );

        /* SAVE EMAIL */

        localStorage.setItem(

          "email",

          response.data.user.email
        );

        /* SAVE TOKEN */

        localStorage.setItem(

          "token",

          response.data.token
        );

        alert(
          "Login Successful ✅"
        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Invalid Credentials ❌"
        );
      }
    };

  /* ================= UI ================= */

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-950 px-4">

      {/* BACKGROUND GLOW */}

      <div className="absolute w-96 h-96 bg-cyan-500 opacity-20 blur-3xl rounded-full"></div>

      {/* CARD */}

      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-md">

        {/* TITLE */}

        <h1 className="text-5xl font-bold text-center text-white mb-3">

          Welcome Back 👋

        </h1>

        <p className="text-gray-300 text-center mb-8">

          Login to continue your AI interview journey

        </p>

        {/* EMAIL */}

        <input

          type="email"

          placeholder="Enter Email"

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }

          className="w-full p-4 rounded-xl bg-black/30 border border-gray-600 text-white placeholder-gray-400 mb-5 outline-none focus:border-cyan-400 transition"
        />

        {/* PASSWORD */}

        <input

          type="password"

          placeholder="Enter Password"

          value={password}

          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }

          className="w-full p-4 rounded-xl bg-black/30 border border-gray-600 text-white placeholder-gray-400 mb-6 outline-none focus:border-cyan-400 transition"
        />

        {/* BUTTON */}

        <button

          onClick={
            handleLogin
          }

          className="w-full bg-cyan-400 text-black py-4 rounded-xl text-xl font-bold hover:bg-cyan-300 transition duration-300 shadow-lg shadow-cyan-500/30"
        >

          Login

        </button>

        {/* REGISTER */}

        <p className="text-gray-400 text-center mt-6">

          Don't have an account?

          <span

            onClick={() =>
              navigate(
                "/register"
              )
            }

            className="text-cyan-400 cursor-pointer ml-2"
          >

            Register

          </span>

        </p>

      </div>

    </div>
  );
}

export default Login;