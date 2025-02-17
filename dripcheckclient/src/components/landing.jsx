import React from "react";
import Nav1 from "./navbar/nav1";



const Landing = () => {
  return (
    
      <div>
        <Nav1 />
      
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-white">
        
        <h1 className="text-4xl font-bold text-electric-blue">Welcome to DripCheck</h1>
        <p className="text-lg text-gray-300 mt-4">
          Rate, Rank, and Sell your outfits in style! 🚀🔥
        </p>

       
      </div>
      </div>
  
  );
};

export default Landing;
