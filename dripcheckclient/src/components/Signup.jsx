import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify({ ...formData, profileComplete: false }));
    navigate("/profile"); // Redirect to Profile setup after signup
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-[#121212] p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-[#FFD700] text-center mb-6">Sign Up for Drip Check</h2>

        <form className="space-y-4" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border border-[#8A2BE2] bg-black text-white rounded-lg focus:ring-2 focus:ring-[#007BFF]"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-[#8A2BE2] bg-black text-white rounded-lg focus:ring-2 focus:ring-[#007BFF]"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-[#8A2BE2] bg-black text-white rounded-lg focus:ring-2 focus:ring-[#007BFF]"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <button type="submit" className="w-full bg-[#FF007F] hover:bg-[#8A2BE2] text-white font-bold py-3 rounded-lg">
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account? <a href="/login" className="text-[#00FFFF] hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
}
