const userService = require('../services/userService');
const asyncHandler = require('express-async-handler');

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.userId);

    res.json({
        success: true,
        user
    });
});

const getLeaderboard = asyncHandler(async (req, res) => {
    const { limit = 10 } = req.query;
    const leaderboard = await userService.getLeaderboard(parseInt(limit));

    res.json({
        success: true,
        leaderboard
    });
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await userService.getAllUsers();

    res.json({
        success: true,
        users
    });
});

module.exports = {
    getUserProfile,
    getLeaderboard,
    getAllUsers
}; 