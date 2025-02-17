import React from "react";
import GoToDripBattleButton from './GoToDripBattleButton'; // Adjust path if necessary
import PostYourDripButton from './postyourdripbutton'; // Adjust path if necessary

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-white">
      <h1 className="text-4xl font-bold text-electric-blue">Welcome to DripCheck</h1>
      <p className="text-lg text-gray-300 mt-4">
        Rate, Rank, and Sell your outfits in style! 🚀🔥
      </p>

      {/* Buttons */}
      <div className="mt-6 flex flex-col items-center">
        <PostYourDripButton />
        <GoToDripBattleButton />
      </div>
    </div>
  );
};

export default Home;
