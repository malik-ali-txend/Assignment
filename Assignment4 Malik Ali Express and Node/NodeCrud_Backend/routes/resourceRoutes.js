// routes/resourceRoutes.js
const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');  // Importing the controller

// Define routes for the resources
router.get('/', resourceController.getAllResources);  // Display all resources
router.get('/create', (req, res) => res.render('create'));  // Show the create form
router.get('/update/:id', resourceController.getResource);  // Show the update form
router.get('/delete/:id', resourceController.getResource);  // Show the delete form

router.post('/create', resourceController.createResource);  // Create a new resource
router.post('/update/:id', resourceController.updateResource);  // Update an existing resource
router.post('/delete/:id', resourceController.deleteResource);  // Delete a resource

module.exports = router;
