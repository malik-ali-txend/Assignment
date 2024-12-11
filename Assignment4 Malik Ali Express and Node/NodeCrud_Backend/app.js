const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;



const readData = () => {
  const dataPath = path.join(__dirname, 'data', 'resources.json');
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(rawData);
};

const saveData = (data) => {
  const dataPath = path.join(__dirname, 'data', 'resources.json');
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/create', (req, res) => {
  res.render('create');  
});


app.get('/', (req, res) => {
  const resources = readData();  
  res.render('index', { resources });  
});


app.get('/update/:id', (req, res) => {
  const resourceId = req.params.id;
  const resources = readData();
  const resource = resources.find(r => r.id == resourceId);
  res.render('update', { resource });
});

app.get('/delete/:id', (req, res) => {
  const resourceId = req.params.id;
  const resources = readData();
  const resource = resources.find(r => r.id == resourceId);
  res.render('delete', { resource }); 
});

app.post('/create', (req, res) => {
  const newResource = req.body; 
  const resources = readData();
  newResource.id = resources.length + 1;  
  resources.push(newResource); 
  saveData(resources); 
  res.redirect('/'); 
});


app.post('/update/:id', (req, res) => {
  const resourceId = req.params.id;
  let resources = readData();
  const resourceIndex = resources.findIndex(r => r.id == resourceId);
  resources[resourceIndex] = { ...resources[resourceIndex], ...req.body };  
  saveData(resources);  
  res.redirect('/');  
});

// POST route for deleting a resource
app.post('/delete/:id', (req, res) => {
  const resourceId = req.params.id;
  let resources = readData();
  resources = resources.filter(r => r.id != resourceId);  
  saveData(resources);  
  res.redirect('/');  
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
