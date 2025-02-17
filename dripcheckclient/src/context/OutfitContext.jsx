import React, { createContext, useState, useContext } from "react";

// Create Context for managing outfits
const OutfitContext = createContext();

// Create a custom hook to use the OutfitContext
export const useOutfitContext = () => {
  return useContext(OutfitContext);
};

// OutfitProvider to wrap the app and provide the outfit data
export const OutfitProvider = ({ children }) => {
  const [outfits, setOutfits] = useState([]);

  const addOutfit = (outfit) => {
    setOutfits((prevOutfits) => [...prevOutfits, outfit]);
  };

  return (
    <OutfitContext.Provider value={{ outfits, addOutfit }}>
      {children}
    </OutfitContext.Provider>
  );
};
