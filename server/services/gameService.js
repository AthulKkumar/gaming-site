const Score = require('../models/Score');
const userService = require('./userService');

class GameService {
    calculateCoins(game, score, difficulty = 'easy') {
        const baseCoins = {
            wordscrambler: 10,
            snake: 15,
            memory: 12,
            tictactoe: 8
        };

        const difficultyMultiplier = {
            easy: 1,
            medium: 1.5,
            hard: 2
        };

        const gameCoins = baseCoins[game] || 5;
        const multiplier = difficultyMultiplier[difficulty] || 1;

        // Basic coin calculation: base coins + score-based bonus
        return Math.floor((gameCoins + Math.floor(score / 100)) * multiplier);
    }

    async recordGameResult(userId, gameData) {
        const { game, score, duration, difficulty = 'easy' } = gameData;

        // Calculate coins earned
        const coinsEarned = this.calculateCoins(game, score, difficulty);

        // Create score record
        const scoreRecord = new Score({
            user: userId,
            game,
            score,
            coinsEarned,
            duration,
            difficulty
        });

        const savedScore = await scoreRecord.save();

        // Update user's coins
        const updatedUser = await userService.updateUserCoins(userId, coinsEarned);

        return {
            scoreRecord: savedScore,
            newCoins: updatedUser.coins,
            coinsEarned
        };
    }

    async getUserGameStats(userId, game = null) {
        const query = { user: userId };
        if (game) {
            query.game = game;
        }

        return await Score.find(query)
            .sort({ createdAt: -1 })
            .limit(10);
    }

    async getGameLeaderboard(game, limit = 10) {
        return await Score.aggregate([
            { $match: { game } },
            {
                $group: {
                    _id: '$user',
                    bestScore: { $max: '$score' },
                    totalGames: { $sum: 1 },
                    totalCoins: { $sum: '$coinsEarned' }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' },
            {
                $project: {
                    username: '$user.username',
                    bestScore: 1,
                    totalGames: 1,
                    totalCoins: 1
                }
            },
            { $sort: { bestScore: -1 } },
            { $limit: limit }
        ]);
    }

    async checkGameAccess(userId, game) {
        // Game access rules
        const gameRequirements = {
            wordscrambler: { minCoins: 0, minLevel: 1 },
            snake: { minCoins: 30, minLevel: 2 },
            memory: { minCoins: 20, minLevel: 1 },
            tictactoe: { minCoins: 0, minLevel: 1 }
        };

        const user = await userService.getUserById(userId);
        const requirements = gameRequirements[game];

        if (!requirements) {
            return { hasAccess: true };
        }

        const hasAccess = user.coins >= requirements.minCoins &&
            user.level >= requirements.minLevel;

        return {
            hasAccess,
            required: requirements,
            current: { coins: user.coins, level: user.level }
        };
    }
}

module.exports = new GameService(); 