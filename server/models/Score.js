const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    game: {
        type: String,
        required: true,
        enum: ['wordscrambler', 'snake', 'memory', 'tictactoe']
    },
    score: {
        type: Number,
        required: true,
        min: 0
    },
    coinsEarned: {
        type: Number,
        default: 0,
        min: 0
    },
    duration: {
        type: Number, // in seconds
        default: 0
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'easy'
    }
}, {
    timestamps: true
});

// Index for better query performance
scoreSchema.index({ user: 1, game: 1 });
scoreSchema.index({ game: 1, score: -1 });

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score; 