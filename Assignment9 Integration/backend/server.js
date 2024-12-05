const express = require('express');

require('dotenv').config();
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');
const db = require('./db/db'); 
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
