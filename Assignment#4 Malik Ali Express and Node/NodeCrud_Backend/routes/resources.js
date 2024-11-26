const fs = require('fs');
const path = require('path');

// Helper functions for reading and saving data
const readData = () => {
  const dataPath = path.join(__dirname, '../data', 'resources.json');
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(rawData);
};

const saveData = (data) => {
  const dataPath = path.join(__dirname, '../data', 'resources.json');
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
};


const getAllResources = (req, res) => {
  const resources = readData();
  res.render('index', { resources });
};

const getResource = (req, res) => {
  const resourceId = req.params.id;
  const resources = readData();
  const resource = resources.find(r => r.id == resourceId);
  if (!resource) {
    return res.status(404).send('Resource not found');
  }
  res.render('update', { resource });
};

const createResource = (req, res) => {
  const newResource = req.body;
  const resources = readData();
  newResource.id = resources.length + 1;
  resources.push(newResource);
  saveData(resources);
  res.redirect('/');
};

const updateResource = (req, res) => {
  const resourceId = req.params.id;
  const updatedData = req.body;
  let resources = readData();
  const resourceIndex = resources.findIndex(r => r.id == resourceId);
  
  if (resourceIndex === -1) {
    return res.status(404).send('Resource not found');
  }

  resources[resourceIndex] = { ...resources[resourceIndex], ...updatedData };
  saveData(resources);
  res.redirect('/');
};

const deleteResource = (req, res) => {
  const resourceId = req.params.id;
  let resources = readData();
  
  resources = resources.filter(r => r.id != resourceId); // Fix here
  
  saveData(resources);
  res.redirect('/');
};

module.exports = {
  getAllResources,
  getResource,
  createResource,
  updateResource,
  deleteResource,
};
