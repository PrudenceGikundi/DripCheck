import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/clerk-react";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./home";
import DripBattle from "./Dripbattle";
import Marketplace from "./Marketplace";
import Profile from "./Profile";
import PostYourDrip from "./PostYourDrip";
import Header from "./Header";
import Footer from "./Footer";
import { OutfitProvider } from "../context/OutfitContext";

function App() {
  const { getToken } = useAuth();

  useEffect(() => {
    const logSessionToken = async () => {
      const token = await getToken();
      console.log("Session Token:", token);
    };

    logSessionToken();
  }, [getToken]);

  return (
    <OutfitProvider> {/* Wrap the entire app with OutfitProvider */}
      <Router>
        <div className="bg-[#121212] min-h-screen text-white">
          {/* Header Section */}
          <Header />
          <header className="flex items-center justify-center py-8 px-4">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>

          {/* Main Content Section */}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dripbattle" element={<DripBattle />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/postyourdrip" element={<PostYourDrip />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>

          {/* Footer Section */}
          <Footer />
        </div>
      </Router>
    </OutfitProvider>
  );
}

export default App;
