const Product = require("../models/products.models");

// Get all resources
const getAllResources = async (req, res) => {
  try {
    const resources = await Product.find();
    res.render("index", { resources });
  } catch (error) {
    res.status(500).send("Error fetching resources: " + error.message);
  }
};

// Get a single resource
const getResource = async (req, res) => {
  try {
    const resourceId = req.params.id;
    const resource = await Product.findById(resourceId);
    if (!resource) {
      return res.status(404).send("Resource not found");
    }
    res.render("update", { resource });
  } catch (error) {
    res.status(500).send("Error fetching resource: " + error.message);
  }
};

// Create a new resource
const createResource = async (req, res) => {
  try {
    const newResource = new Product(req.body);
    await newResource.save();
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error creating resource: " + error.message);
  }
};

// Update an existing resource
const updateResource = async (req, res) => {
  try {
    const resourceId = req.params.id;
    const updatedResource = await Product.findByIdAndUpdate(resourceId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedResource) {
      return res.status(404).send("Resource not found");
    }

    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error updating resource: " + error.message);
  }
};

// Delete a resource
const deleteResource = async (req, res) => {
  try {
    const resourceId = req.params.id;
    const deletedResource = await Product.findByIdAndDelete(resourceId);
    if (!deletedResource) {
      return res.status(404).send("Resource not found");
    }
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error deleting resource: " + error.message);
  }
};

module.exports = {
  getAllResources,
  getResource,
  createResource,
  updateResource,
  deleteResource,
};
