import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const Profile = () => {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isLoaded || !isSignedIn) {
        console.log("User is not signed in or auth is not loaded.");
        return;
      }

      try {
        const token = await getToken();
        console.log("Session Token:", token);

        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error.response?.data || error.message);
      }
    };

    fetchUserData();
  }, [getToken, isLoaded, isSignedIn]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      {userData ? (
        <p>Welcome, {userData.username}!</p>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
