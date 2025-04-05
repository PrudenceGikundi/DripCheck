import React from "react";
import CloudinaryImage from "./CloudinaryImage";

const OutfitCard = ({ outfit }) => {
  return (
    <div className="outfit-card">
      <CloudinaryImage publicId={outfit.image} width={300} height={300} />
      <p>{outfit.description}</p>
    </div>
  );
};

export default OutfitCard;