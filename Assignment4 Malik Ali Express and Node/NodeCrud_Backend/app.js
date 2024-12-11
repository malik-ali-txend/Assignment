const express = require('express');
const path = require('path');
const resourceRoutes = require('./routes/resourceRoutes'); // Import resource routes
const logMiddleware = require('./middlewares/logger'); // Import logging middleware

const app = express();
const port = 3000;

// Middleware for logging requests
app.use(logMiddleware);

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the routes
app.use('/', resourceRoutes);  // All resource-related routes

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
