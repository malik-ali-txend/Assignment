const fs = require('fs');
const path = require('path');

// Helper function to read data
const readData = () => {
  const dataPath = path.join(__dirname, '../data', 'resources.json');
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(rawData);
};

// Helper function to save data
const saveData = (data) => {
  const dataPath = path.join(__dirname, '../data', 'resources.json');
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// Controller to get all resources
const getAllResources = (req, res) => {
  const resources = readData();
  res.render('index', { resources });
};

// Controller to get a single resource for update
const getResource = (req, res) => {
  const resourceId = req.params.id;
  const resources = readData();
  const resource = resources.find(r => r.id == resourceId);
  if (!resource) return res.status(404).send('Resource not found');
  res.render('update', { resource });
};

// Controller to create a new resource
const createResource = (req, res) => {
  const newResource = req.body;
  const resources = readData();

  // Generate a new unique ID
  const maxId = resources.length > 0 ? Math.max(...resources.map(r => r.id)) : 0;
  newResource.id = maxId + 1;

  resources.push(newResource); // Add the new resource
  saveData(resources); // Save the updated data
  res.redirect('/'); // Redirect to the homepage
};


// Controller to update a resource
const updateResource = (req, res) => {
  const resourceId = req.params.id;
  const updatedData = req.body;
  let resources = readData();
  const resourceIndex = resources.findIndex(r => r.id == resourceId);
  if (resourceIndex === -1) return res.status(404).send('Resource not found');
  resources[resourceIndex] = { ...resources[resourceIndex], ...updatedData };
  saveData(resources);
  res.redirect('/');
};

// Controller to delete a resource
const deleteResource = (req, res) => {
  const resourceId = parseInt(req.params.id, 10); // Convert ID to a number
  let resources = readData(); // Read the current data

  // Filter out the resource with the matching ID
  resources = resources.filter(resource => resource.id !== resourceId);

  saveData(resources); // Save the updated list back to the file
  res.redirect('/'); // Redirect to the homepage
};


module.exports = {
  getAllResources,
  getResource,
  createResource,
  updateResource,
  deleteResource,
};
