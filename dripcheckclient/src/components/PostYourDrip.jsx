import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutfitContext } from "../context/OutfitContext"; // Import the context

const PostYourDrip = () => {
  const [outfitImage, setOutfitImage] = useState(null); // To hold the uploaded image
  const [caption, setCaption] = useState(""); // To hold the caption text
  const [imagePreview, setImagePreview] = useState(null); // To preview the uploaded image
  const { addOutfit } = useOutfitContext(); // Access the context function to add outfits
  const navigate = useNavigate(); // Initialize navigate for routing

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setOutfitImage(file);
    setImagePreview(URL.createObjectURL(file)); // Set the preview of the image
  };

  // Handle caption change
  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!outfitImage || !caption) {
      alert("Please upload an image and provide a caption.");
      return;
    }

    // Create the outfit object
    const newOutfit = { image: outfitImage, caption: caption };

    // Add the new outfit to the context
    addOutfit(newOutfit);

    // Clear the form after submission
    setOutfitImage(null);
    setCaption("");
    setImagePreview(null);

    // Redirect to DripBattle page after submitting
    navigate("/dripbattle");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-white p-4">
      <h1 className="text-4xl font-bold text-electric-blue mb-6">Post Your Drip</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg w-full max-w-md"
      >
        <div className="mb-4">
          <label
            htmlFor="outfitImage"
            className="block text-lg font-semibold mb-2"
          >
            Upload Your Outfit Image
          </label>
          <input
            type="file"
            id="outfitImage"
            accept="image/*"
            onChange={handleImageChange}
            className="bg-gray-700 text-white p-2 rounded w-full"
          />
        </div>

        {imagePreview && (
          <div className="mb-4">
            <img
              src={imagePreview}
              alt="Outfit Preview"
              className="w-full h-auto rounded"
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="caption" className="block text-lg font-semibold mb-2">
            Caption
          </label>
          <textarea
            id="caption"
            value={caption}
            onChange={handleCaptionChange}
            placeholder="Describe your outfit..."
            className="w-full p-2 text-black rounded bg-gray-700"
            rows="4"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-[#FFD700] text-[#FF007F] px-6 py-3 rounded-full text-xl font-semibold mt-4 w-full hover:bg-yellow-500 transition duration-300"
        >
          Post Your Drip
        </button>
      </form>
    </div>
  );
};

export default PostYourDrip;
