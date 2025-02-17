import React from "react";
import { useNavigate } from "react-router-dom";

const GoToDripBattleButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the 'DripBattle' page
    navigate("/dripbattle");
  };

  return (
    <button
      onClick={handleClick}
      className="bg-[#FFD700] text-[#FF007F] px-6 py-3 rounded-full text-xl font-semibold mt-4 hover:bg-yellow-500 transition duration-300"
    >
      Go to Drip Battle
    </button>
  );
};

export default GoToDripBattleButton;
