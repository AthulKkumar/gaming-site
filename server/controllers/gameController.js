const gameService = require('../services/gameService');
const asyncHandler = require('express-async-handler');

const recordGameResult = asyncHandler(async (req, res) => {
    const result = await gameService.recordGameResult(req.userId, req.body);

    res.json({
        success: true,
        message: 'Game result recorded successfully',
        ...result
    });
});

const checkGameAccess = asyncHandler(async (req, res) => {
    const { game } = req.params;
    const access = await gameService.checkGameAccess(req.userId, game);

    res.json({
        success: true,
        access
    });
});

const getUserGameStats = asyncHandler(async (req, res) => {
    const { game } = req.query;
    const stats = await gameService.getUserGameStats(req.userId, game);

    res.json({
        success: true,
        stats
    });
});

const getGameLeaderboard = asyncHandler(async (req, res) => {
    const { game } = req.params;
    const { limit = 10 } = req.query;

    const leaderboard = await gameService.getGameLeaderboard(game, parseInt(limit));

    res.json({
        success: true,
        leaderboard
    });
});

// Public endpoint for guest play (no authentication required)
const guestGameComplete = asyncHandler(async (req, res) => {
    const { game, score } = req.body;

    // For guests, just return score without saving
    res.json({
        success: true,
        message: 'Game completed! Sign up to save your progress and earn coins.',
        score,
        isGuest: true
    });
});

module.exports = {
    recordGameResult,
    checkGameAccess,
    getUserGameStats,
    getGameLeaderboard,
    guestGameComplete
}; 