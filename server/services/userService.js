const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserService {
    async createUser(userData) {
        const { username, email, password } = userData;

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            throw new Error('User already exists with this email or username');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        return await user.save();
    }

    async authenticateUser(email, password) {
        const user = await User.findOne({ email, isActive: true });

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        return user;
    }

    async getUserById(userId) {
        return await User.findById(userId);
    }

    async updateUserCoins(userId, coins) {
        return await User.findByIdAndUpdate(
            userId,
            { $inc: { coins: coins } },
            { new: true }
        );
    }

    async getLeaderboard(limit = 10) {
        return await User.find({ isActive: true })
            .sort({ coins: -1 })
            .limit(limit)
            .select('username coins level');
    }

    async getAllUsers() {
        return await User.find({ isActive: true })
            .select('username email coins level createdAt');
    }
}

module.exports = new UserService(); 