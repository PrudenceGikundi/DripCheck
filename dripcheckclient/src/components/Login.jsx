import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = { email, profileComplete: true };
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/home"); // Redirect to Home after login
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#121212]">
      <div className="w-full max-w-md bg-[#1E1E1E] p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white">Welcome Back</h2>
        <p className="text-center text-gray-400 mb-6">Log in to continue</p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-400">Email</label>
            <input
              type="email"
              className="w-full p-3 bg-[#2A2A2A] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-400">Password</label>
            <input
              type="password"
              className="w-full p-3 bg-[#2A2A2A] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full bg-[#8A2BE2] hover:bg-[#6C1EB2] text-white font-bold py-3 rounded-lg">
            Log In
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Don’t have an account? <a href="/signup" className="text-[#FF007F]">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
