// src/App.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./assets/components/Header";
import Footer from "./assets/components/Footer";


const Home = lazy(() => import("./assets/pages/Home"));
const About = lazy(() => import("./assets/pages/About"));
const Contact = lazy(() => import("./assets/pages/Contact"));
const NotFound = lazy(() => import("./assets/pages/NotFound"));

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <div className="content">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about/:username" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
