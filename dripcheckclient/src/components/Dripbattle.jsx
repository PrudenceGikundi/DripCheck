import React, { useState, useEffect } from "react";
import axios from "axios";
import PostYourDripButton from "./postyourdripbutton"; // Import the button component
import { useOutfitContext } from "../context/OutfitContext"; // Import the context

const DripBattle = () => {
  const [outfits, setOutfits] = useState([]);
  const [commentsInput, setCommentsInput] = useState({}); // Store comments per outfit

  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/outfits");
        setOutfits(response.data);
      } catch (err) {
        console.error("❌ Error fetching outfits:", err.response?.data || err.message);
      }
    };

    fetchOutfits();
  }, []);

  // Add comment to the selected outfit
  const handleAddComment = (outfitId) => {
    const comment = commentsInput[outfitId];
    if (comment) {
      const updatedOutfits = outfits.map((outfit) =>
        outfit._id === outfitId
          ? { ...outfit, comments: [...(outfit.comments || []), { text: comment, id: (outfit.comments?.length || 0) + 1 }] }
          : outfit
      );
      setOutfits(updatedOutfits);
      setCommentsInput({ ...commentsInput, [outfitId]: '' }); // Clear the comment input after adding
    }
  };

  return (
    <div className="dripbattle-container flex bg-gray-900 text-white p-6">
      <div className="main-content w-3/4 pr-6">
        <h2 className="text-2xl mb-4">Drip Battle</h2>

        {/* Outfits List */}
        <div className="outfits mb-6">
          {outfits.map((outfit) => (
            <div key={outfit._id} className="outfit mb-6 p-4 border border-gray-700 rounded bg-gray-800">
              <div className="flex items-center">
                <img src={outfit.image} alt={outfit.description} className="w-16 h-16 rounded-full mr-4" />
                <div>
                  <h3 className="text-xl">{outfit.description}</h3>
                  <p className="text-lg">Submitted by: {outfit.submittedBy}</p>
                </div>
              </div>

              {/* Comment Section */}
              <div className="comment-section mb-4">
                <textarea
                  value={commentsInput[outfit._id] || ''}
                  onChange={(e) => setCommentsInput({ ...commentsInput, [outfit._id]: e.target.value })}
                  placeholder="Add your thoughts here..."
                  className="w-full p-2 text-black mb-4 rounded"
                />
                <button
                  onClick={() => handleAddComment(outfit._id)}
                  className="bg-electricBlue text-white px-4 py-2 rounded"
                >
                  Add Comment
                </button>
                <div className="comments mt-4">
                  {(outfit.comments || []).map((comment) => (
                    <div key={comment.id} className="comment p-2 border-b border-gray-700">
                      <p>{comment.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post Your Drip Button */}
      <div className="mt-6">
        <PostYourDripButton />
      </div>
    </div>
  );
};

export default DripBattle;
