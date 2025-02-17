import React, { useState, useEffect } from "react";
import PostYourDripButton from "./postyourdripbutton"; // Import the button component
import { useOutfitContext } from "../context/OutfitContext"; // Import the context
import Nav2 from "./navbar/nav2";

const DripBattle = () => {
  // Sample competitors data (you can replace this with real data)
  const initialCompetitors = [
    { id: 1, name: 'Kendi', outfit: 'Outfit 1', profilePic: 'profilepic1.jpg', ranking: 1, rating: 0, comments: [] },
    { id: 2, name: 'Tiffany', outfit: 'Outfit 2', profilePic: 'profilepic2.jpg', ranking: 2, rating: 0, comments: [] },
  ];

  const [competitors, setCompetitors] = useState(initialCompetitors);
  const [commentsInput, setCommentsInput] = useState({}); // Store comments per competitor

  // Add comment to the selected competitor
  const handleAddComment = (competitorId) => {
    const comment = commentsInput[competitorId];
    if (comment) {
      const updatedCompetitors = competitors.map((competitor) =>
        competitor.id === competitorId
          ? { ...competitor, comments: [...competitor.comments, { text: comment, id: competitor.comments.length + 1 }] }
          : competitor
      );
      setCompetitors(updatedCompetitors);
      setCommentsInput({ ...commentsInput, [competitorId]: '' }); // Clear the comment input after adding
    }
  };

  // Handle rating change for the selected competitor
  const handleRatingChange = (newRating, competitorId) => {
    const updatedCompetitors = competitors.map((competitor) =>
      competitor.id === competitorId
        ? { ...competitor, rating: newRating }
        : competitor
    );
    setCompetitors(updatedCompetitors); // Update the rating for the selected competitor
  };

  // Get leaderboard sorted by rating
  const getLeaderboard = () => {
    const sortedCompetitors = [...competitors].sort((a, b) => b.rating - a.rating);

    // Check if there are any participants and return the leaderboard or a message if empty
    if (sortedCompetitors.length === 0) {
      return <p className="text-gray-400">No participants yet.</p>;
    }

    return sortedCompetitors.map((competitor, index) => (
      <div key={competitor.id} className="leaderboard-entry mb-2 p-2 bg-gray-800 rounded">
        <p className="text-xl">{`${index + 1}. ${competitor.name}`}</p>
        <p className="text-sm">Rating: {competitor.rating} Stars</p>
      </div>
    ));
  };

  return (
    <div>
      <Nav2 />
    
    <div className="dripbattle-container flex bg-gray-900 text-white p-6">
      <div className="main-content w-3/4 pr-6">
        <h2 className="text-2xl mb-4">Drip Battle</h2>

        {/* Competitors List */}
        <div className="competitors mb-6">
          {competitors.map((competitor) => (
            <div key={competitor.id} className="competitor mb-6 p-4 border border-gray-700 rounded bg-gray-800">
              <div className="flex items-center">
                <img src={competitor.profilePic} alt={competitor.name} className="w-16 h-16 rounded-full mr-4" />
                <div>
                  <h3 className="text-xl">{competitor.name}</h3>
                  <p className="text-lg">Outfit: {competitor.outfit}</p>
                  <p className="text-sm">Ranking: #{competitor.ranking}</p>
                  <div className="rating flex mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star cursor-pointer ${competitor.rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                        onClick={() => handleRatingChange(star, competitor.id)} // Correctly associate the rating to the competitor
                      >
                        &#9733;
                      </span>
                    ))}
                  </div>
                  <p>Your rating: {competitor.rating} Stars</p>
                </div>
              </div>

              {/* Comment Section */}
              <div className="comment-section mb-4">
                <textarea
                  value={commentsInput[competitor.id] || ''}
                  onChange={(e) => setCommentsInput({ ...commentsInput, [competitor.id]: e.target.value })}
                  placeholder="Add your thoughts here..."
                  className="w-full p-2 text-black mb-4 rounded"
                />
                <button
                  onClick={() => handleAddComment(competitor.id)}
                  className="bg-electricBlue text-white px-4 py-2 rounded"
                >
                  Add Comment
                </button>
                <div className="comments mt-4">
                  {competitor.comments.map((comment) => (
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

     {/* leaderboard */}
<div className="leaderboard w-1/4 bg-gray-800 p-4 rounded mt-6">
  <h3 className="text-xl mb-4 text-[#FFD700]">Leaderboard</h3>
  {competitors.length === 0 ? (
    <p className="text-gray-400">No participants yet.</p>
  ) : (
    getLeaderboard()
  )}
</div>


      {/* Post Your Drip Button */}
      <div className="mt-6">
        <PostYourDripButton />
      </div>
    </div>
    </div>
  );
};

export default DripBattle;
