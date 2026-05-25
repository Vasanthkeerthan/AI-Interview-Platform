import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (

    <div className="w-full bg-black/40 backdrop-blur-lg border-b border-cyan-400/20 px-10 py-5 flex justify-between items-center sticky top-0 z-50">

      {/* LOGO */}

      <h1 className="text-3xl font-bold text-cyan-400">

        AI Interview 🚀

      </h1>

      {/* NAVIGATION */}

      <div className="flex gap-6 items-center">

        <Link
          to="/"
          className="text-white hover:text-cyan-400 text-lg font-semibold transition"
        >
          Home
        </Link>

        <Link
          to="/login"
          className="text-white hover:text-cyan-400 text-lg font-semibold transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="text-white hover:text-cyan-400 text-lg font-semibold transition"
        >
          Register
        </Link>

        <Link
          to="/dashboard"
          className="text-white hover:text-cyan-400 text-lg font-semibold transition"
        >
          Dashboard
        </Link>

        {token && (

          <button
            onClick={logout}
            className="bg-red-400 text-black px-4 py-2 rounded-xl font-bold hover:bg-red-300 transition"
          >

            Logout

          </button>

        )}

      </div>

    </div>
  );
}

export default Navbar;