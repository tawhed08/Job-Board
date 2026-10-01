const mongoose = require('mongoose');

async function connectDB() {
	const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
	if (!mongoUri) {
		throw new Error('MongoDB URI is not configured. Set MONGODB_URI or MONGO_URI in .env.');
	}

	try {
		await mongoose.connect(mongoUri);
		console.log('MongoDB connected successfully');
	} catch (error) {
		console.error('MongoDB connection failed');
		throw error;
	}
}

module.exports = connectDB;
