// app.js
const express = require('express');
const path = require('path');
const resourceRoutes = require('./routes/resourceRoutes');  // Import the resource routes

const app = express();
const port = 3000;

// Set up view engine and static file serving
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the resource routes
app.use('/', resourceRoutes);  // All resource-related routes

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
