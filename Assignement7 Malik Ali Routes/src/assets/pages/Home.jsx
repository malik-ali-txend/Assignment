// src/pages/Home.jsx
import React from "react";
import "./Home.css";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to the Home Page</h1>
      <Link to="/about/Aly">Go to About with Data</Link>
    </div>
  );
};

export default Home;
