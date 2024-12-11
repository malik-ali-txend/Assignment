// app.js
const express = require('express');
const path = require('path');
const resourceController = require('./resourceController');  // Importing the controller

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', resourceController.getAllResources);
app.get('/create', (req, res) => res.render('create'));
app.get('/update/:id', resourceController.getResource);
app.get('/delete/:id', resourceController.getResource);

app.post('/create', resourceController.createResource);
app.post('/update/:id', resourceController.updateResource);
app.post('/delete/:id', resourceController.deleteResource);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
