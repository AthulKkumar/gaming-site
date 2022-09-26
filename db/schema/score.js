const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({

})

const ScoreBoard = mongoose.model('scoreboard',scoreSchema);

module.exports = ScoreBoard