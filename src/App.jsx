import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import Interview from "./pages/Interview";

import Result from "./pages/Result";

import History from "./pages/History";

import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";

function App() {

  return (

    <BrowserRouter>

      {/* ================= STABLE NAVBAR ================= */}

      <Navbar />

      {/* ================= ROUTES ================= */}

      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ================= PROTECTED ROUTES ================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/interview"
          element={
            <ProtectedRoute>

              <Interview />

            </ProtectedRoute>
          }
        />

        <Route
          path="/result"
          element={
            <ProtectedRoute>

              <Result />

            </ProtectedRoute>
          }
        />

        {/* ================= HISTORY ================= */}

        <Route
          path="/history"
          element={
            <ProtectedRoute>

              <History />

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;