const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

// Routes for handling resources
router.get('/', resourceController.getAllResources);
router.get('/create', (req, res) => res.render('create'));
router.get('/update/:id', resourceController.getResource);
router.get('/delete/:id', resourceController.getResource);

// POST routes for handling resource creation, updating, and deletion
router.post('/create', resourceController.createResource);
router.post('/update/:id', resourceController.updateResource);
router.post('/delete/:id', resourceController.deleteResource);

module.exports = router;
