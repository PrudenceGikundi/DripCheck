import React from "react";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#121212]">
      <div className="w-full max-w-md bg-[#1E1E1E] p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white">Welcome Back</h2>
        <p className="text-center text-gray-400 mb-6">Log in to continue</p>
        <SignIn />
      </div>
    </div>
  );
};

export default Login;
