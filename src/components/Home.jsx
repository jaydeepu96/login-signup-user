import React, { useEffect, useState } from "react";

// Function to decode JWT token
const decodeToken = (token) => {
  if (!token) return null;

  // Split the token into header, payload, and signature
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

const Home = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
  
    const token = localStorage.getItem("token");

    if (token) {
  
      const decodedToken = decodeToken(token);

  
      setUsername(decodedToken?.username || "User");
    } else {
  
      window.location.href = "/login";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="container">
      <h1>Welcome Login, {username}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
