const authService = require('../services/authService');
const asyncHandler = require('express-async-handler');

const register = asyncHandler(async (req, res) => {
    const { user, token } = await authService.register(req.body);

    // Set HTTP-only cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user,
        token
    });
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);

    // Set HTTP-only cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
        success: true,
        message: 'Login successful',
        user,
        token
    });
});

const logout = asyncHandler(async (req, res) => {
    res.clearCookie('token');
    res.json({
        success: true,
        message: 'Logout successful'
    });
});

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await authService.getCurrentUser(req.userId);

    res.json({
        success: true,
        user
    });
});

module.exports = {
    register,
    login,
    logout,
    getCurrentUser
}; 