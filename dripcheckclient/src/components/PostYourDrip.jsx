import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const PostYourDrip = () => {
  const [outfitImage, setOutfitImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getToken } = useAuth(); // Import getToken from Clerk
  const navigate = useNavigate();

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setOutfitImage(file);
    setImagePreview(URL.createObjectURL(file));
    setErrorMessage(""); // Clear error message when a new image is selected
  };

  // Handle caption change
  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
    setErrorMessage(""); // Clear error message when caption is updated
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!outfitImage || !caption) {
        setErrorMessage("Image and caption are required");
        return;
    }

    const formData = new FormData();
    formData.append("image", outfitImage);
    formData.append("description", caption);

    try {
        setIsSubmitting(true); // Disable the button while submitting
        const token = await getToken();
        const response = await axios.post("http://localhost:5000/api/outfits", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("✅ Outfit posted:", response.data);
        navigate("/dripbattle");
    } catch (err) {
        console.error("❌ Error posting outfit:", err.response?.data || err.message);

        if (err.response?.data?.error) {
            setErrorMessage(err.response.data.error); // Display server error
        } else {
            setErrorMessage("Failed to post outfit. Please try again.");
        }
    } finally {
        setIsSubmitting(false); // Re-enable the button
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-white p-4">
      <h1 className="text-4xl font-bold text-electric-blue mb-6">Post Your Drip</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg w-full max-w-md"
      >
        {errorMessage && (
          <div className="bg-red-500 text-white p-2 rounded mb-4">
            {errorMessage}
          </div>
        )}

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
          className={`${
            isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-[#FFD700] hover:bg-yellow-500"
          } text-[#FF007F] px-6 py-3 rounded-full text-xl font-semibold mt-4 w-full transition duration-300`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Posting..." : "Post Your Drip"}
        </button>
      </form>
    </div>
  );
};

export default PostYourDrip;
