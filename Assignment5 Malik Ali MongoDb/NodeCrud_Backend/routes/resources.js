const express = require("express");
const router = express.Router();
const resourcesController = require("../controller/resourcesController");

// Routes for CRUD operations
router.get("/", resourcesController.getAllResources); 
router.get("/update/:id", resourcesController.getResource);
router.post("/create", resourcesController.createResource);
router.post("/update/:id", resourcesController.updateResource);
router.post("/delete/:id", resourcesController.deleteResource);

module.exports = router;
