import React from "react";
import { SignUp } from "@clerk/clerk-react";

export default function Signup() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-[#121212] p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-[#FFD700] text-center mb-6">Sign Up for Drip Check</h2>
        <SignUp />
      </div>
    </div>
  );
}
