const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

const connectDatabase = async () => {

    const dbUrl = process.env.DATABASE_URL || process.env.DB_URI || 'mongodb://localhost:27017/game-site';

    try {
        const conn = await mongoose.connect(dbUrl);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDatabase; 