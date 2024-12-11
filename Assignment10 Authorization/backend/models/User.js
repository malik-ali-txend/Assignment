const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [ 'author', 'admin'],  // Add 'admin' to the valid roles
    default: 'author', // Default role can be 'author'
  },
});

module.exports = mongoose.model('User', userSchema);
