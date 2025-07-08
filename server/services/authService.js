const jwt = require('jsonwebtoken');
const userService = require('./userService');

class AuthService {
    generateToken(user) {
        return jwt.sign(
            {
                userId: user._id,
                username: user.username,
                email: user.email
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

    async login(email, password) {
        const user = await userService.authenticateUser(email, password);
        const token = this.generateToken(user);

        return {
            user,
            token
        };
    }

    async register(userData) {
        const user = await userService.createUser(userData);
        const token = this.generateToken(user);

        return {
            user,
            token
        };
    }

    async getCurrentUser(userId) {
        return await userService.getUserById(userId);
    }
}

module.exports = new AuthService(); 