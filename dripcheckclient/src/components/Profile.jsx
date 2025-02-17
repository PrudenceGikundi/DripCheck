import React, { useState, useEffect } from "react";

// Function to fetch data from the backend or local storage
const fetchProfileStats = () => {
  // Simulating a fetch call to the backend (API)
  return {
    battlesWon: 5, // Example data from backend
    itemsSold: 10, // Example data from backend
    topRankedOutfit: "Outfit 1", // Example data from backend
  };
};

const Profile = () => {
  // Retrieve profile data from localStorage (if available)
  const loadProfileData = () => {
    const storedData = localStorage.getItem("profileData");
    return storedData
      ? JSON.parse(storedData)
      : {
          profilePic: "https://via.placeholder.com/150", // Default profile pic
          name: "Drip King 👑",
          username: "@dripmaster",
        };
  };

  const [profileData, setProfileData] = useState(loadProfileData);
  const [profileStats, setProfileStats] = useState({
    battlesWon: 0,
    itemsSold: 0,
    topRankedOutfit: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user-specific data (battles won, items sold, etc.)
  useEffect(() => {
    const stats = fetchProfileStats();
    setProfileStats(stats);
  }, []);

  // Handle input changes for editable fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image upload for profile picture
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prevData) => ({
          ...prevData,
          profilePic: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submit (save data to localStorage)
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("profileData", JSON.stringify(profileData)); // Save to localStorage
    setIsEditing(false); // Stop editing mode
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gold text-white">
      <h1 className="text-4xl font-bold text-electric-blue">Your Profile</h1>

      {/* Profile Card with Gradient Background */}
      {isEditing ? (
        // Editable form
        <form
          onSubmit={handleSubmit}
          className="mt-6 bg-gradient-to-r from-black via-purple-700 to-blue-600 p-6 rounded-lg shadow-lg w-80"
        >
          <div className="flex justify-center">
            <img
              src={profileData.profilePic}
              alt="Profile Pic"
              className="w-32 h-32 rounded-full mx-auto border-4 border-gold"
            />
          </div>

          {/* Upload Profile Image */}
          <div className="mt-4 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-2 text-sm text-electric-blue file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-electric-blue file:text-white hover:file:bg-neon-purple cursor-pointer"
            />
          </div>

          {/* Name */}
          <label htmlFor="name" className="text-white font-semibold mt-4">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            className="bg-transparent text-center text-neon-purple text-xl font-semibold outline-none mt-2 w-full"
          />

          {/* Username */}
          <label htmlFor="username" className="text-white font-semibold mt-4">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={profileData.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
            className="bg-transparent text-center text-gray-400 text-lg font-semibold outline-none mt-2 w-full"
          />

          {/* Save Changes Button */}
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-electric-blue text-white px-6 py-2 rounded-full hover:bg-neon-purple"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        // Display profile details
        <div className="mt-6 bg-gradient-to-r from-black via-purple-700 to-blue-600 p-6 rounded-lg shadow-lg w-80">
          <img
            src={profileData.profilePic}
            alt="Profile Pic"
            className="w-32 h-32 rounded-full mx-auto border-4 border-gold"
          />
          <h2 className="text-2xl font-semibold mt-4 text-neon-purple text-center">
            {profileData.name}
          </h2>
          <p className="text-gray-400 text-center">{profileData.username}</p>

          {/* Display non-editable stats */}
          <div className="mt-4 text-center">
            <p className="text-lg text-hot-pink">{profileStats.battlesWon} Drip Battles Won</p>
            <p className="text-lg text-electric-blue">{profileStats.itemsSold} Items Sold</p>
            <p className="text-lg text-gold">Top Ranked Outfit: {profileStats.topRankedOutfit}</p>
          </div>

          {/* Edit Profile Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-electric-blue text-white px-6 py-2 rounded-full hover:bg-neon-purple"
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
