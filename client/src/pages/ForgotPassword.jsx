import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post("/auth/forgot-password", { email });
      setMessage("Password reset instructions have been sent to your email.");
    } catch {
      setMessage("Error sending reset link. Please try again.");
    }
  };

  return (
    <div>
      <div className="w-full max-w-md  my-10 p-5 py-10 mx-auto bg-zinc-950 p-8 rounded-xl shadow-xl border border-zinc-800">
        <h1 className="text-2xl font-bold mb-6 text-center text-orange-500">Forgot Password</h1>
        <p className="text-gray-400 text-sm mb-6 text-center">
          Enter your registered email address. We'll send you reset instructions.
        </p>

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-lg font-medium transition"
          >
            Send Reset Link
          </button>
        </div>

        {message && <p className="mt-4 text-center text-sm text-blue-400">{message}</p>}

        <button
          onClick={() => navigate("/login")}
          className="mt-6 w-full text-blue-400 hover:text-blue-300 text-sm"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}