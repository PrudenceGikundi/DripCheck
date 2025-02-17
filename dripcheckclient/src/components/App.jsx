import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import Signup from "./SignUp";
import Home from "./home";
import DripBattle from "./Dripbattle";
import Marketplace from "./Marketplace";
import Profile from "./Profile";
import PostYourDrip from './PostYourDrip';
import Header from "./Header";
import Footer from "./Footer";
import { OutfitProvider } from "../context/OutfitContext"; // Import the OutfitProvider

function App() {
  return (
    <OutfitProvider> {/* Wrap the application in the OutfitProvider */}
      <Router>
        <div className="bg-[#121212] min-h-screen text-white">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dripbattle" element={<DripBattle />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/postyourdrip" element={<PostYourDrip />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </OutfitProvider> // Close the OutfitProvider here
  );
}

export default App;
