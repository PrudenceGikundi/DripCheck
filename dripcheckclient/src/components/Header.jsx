import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-black via-purple-700 to-blue-600 text-white py-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center px-5">
        {/* Logo / Title */}
        <h1 className="text-3xl font-bold tracking-wide">
          Drip<span className="text-pink-400">Check</span>
        </h1>

        {/* Navigation Links */}
        <nav className="space-x-6">
          <Link to="/" className="hover:text-pink-400 transition-all">Home</Link>
          <Link to="/dripbattle" className="hover:text-pink-400 transition-all">DripBattle</Link>
          <Link to="/marketplace" className="hover:text-pink-400 transition-all">Marketplace</Link>
          <Link to="/profile" className="hover:text-pink-400 transition-all">Profile</Link>
          <Link to="/login" className="hover:text-pink-400 transition-all">Login</Link>
          <Link to="/signup" className="bg-pink-500 px-4 py-2 rounded-lg hover:bg-pink-700 transition-all">
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
