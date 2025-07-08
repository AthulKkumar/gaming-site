const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

// Protected routes
router.get('/profile', authenticateToken, userController.getUserProfile);

// Public routes
router.get('/leaderboard', userController.getLeaderboard);

// Admin routes (can be enhanced with admin middleware later)
router.get('/all', userController.getAllUsers);

module.exports = router; 