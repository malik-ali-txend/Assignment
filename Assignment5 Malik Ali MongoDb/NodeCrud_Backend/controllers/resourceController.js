const Product = require("../models/products.models");

// Get all resources
const getAllResources = async (req, res) => {
  try {
    const resources = await Product.find();
    res.render("index", { resources });
  } catch (error) {
    res.status(500).send("Error loading resources: " + error.message);
  }
};

// Render the create resource form
const renderCreateForm = (req, res) => {
  res.render("create");
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

// Render the update form for a specific resource
const renderUpdateForm = async (req, res) => {
  try {
    const resource = await Product.findById(req.params.id);
    if (!resource) {
      return res.status(404).send("Resource not found");
    }
    res.render("update", { resource });
  } catch (error) {
    res.status(500).send("Error fetching resource: " + error.message);
  }
};

// Update a resource
const updateResource = async (req, res) => {
  try {
    const updatedResource = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedResource) {
      return res.status(404).send("Resource not found");
    }
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error updating resource: " + error.message);
  }
};

// Render the delete confirmation form
const renderDeleteForm = async (req, res) => {
  try {
    const resource = await Product.findById(req.params.id);
    if (!resource) {
      return res.status(404).send("Resource not found");
    }
    res.render("delete", { resource });
  } catch (error) {
    res.status(500).send("Error fetching resource: " + error.message);
  }
};

// Delete a resource
const deleteResource = async (req, res) => {
  try {
    const deletedResource = await Product.findByIdAndDelete(req.params.id);
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
  renderCreateForm,
  createResource,
  renderUpdateForm,
  updateResource,
  renderDeleteForm,
  deleteResource,
};
