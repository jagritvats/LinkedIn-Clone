const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`Connect to MongoDB ${conn.connection.host}`);
	} catch (err) {
		console.log('Error connecting to DB ', err || err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
