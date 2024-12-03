import React from "react";
import "./Home.css";
import { useParams } from "react-router-dom";

const About = () => {
    const { username } = useParams(); 
    return (
        <div className="home">
<h1>Welcome to the Home Page</h1>
      {username ? (
        <p>Welcome, {username}!</p> 
      ) : (
        <p>Welcome to the About Page. Please provide a username in the URL and it only work if you come from home to "go to about with data". that passes data to about </p> 
      )}
          </div>
    
  );
};

export default About;
