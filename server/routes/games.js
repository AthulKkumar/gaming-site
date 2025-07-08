const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { validateGameResult } = require('../middleware/validation');

// Protected routes (require authentication)
router.post('/result', authenticateToken, validateGameResult, gameController.recordGameResult);
router.get('/access/:game', authenticateToken, gameController.checkGameAccess);
router.get('/stats', authenticateToken, gameController.getUserGameStats);

// Public routes (available to everyone)
router.get('/leaderboard/:game', gameController.getGameLeaderboard);
router.post('/guest-complete', validateGameResult, gameController.guestGameComplete);

module.exports = router; 