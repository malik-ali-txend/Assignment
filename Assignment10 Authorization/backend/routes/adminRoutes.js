const express = require('express');
const { authenticateUser, authorizeRole } = require('../middleware/authMiddleware');
const { getAllUsers, updateUserRole, deleteUser } = require('../controllers/adminController');

const router = express.Router();

// Get all users (Admin only)
router.get('/users', authenticateUser, authorizeRole('admin'), getAllUsers);

// Update user role (Admin only)
router.put('/users/:id', authenticateUser, authorizeRole('admin'), updateUserRole);

// Delete a user (Admin only)
router.delete('/users/:id', authenticateUser, authorizeRole('admin'), deleteUser);

module.exports = router;
