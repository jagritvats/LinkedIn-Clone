const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const protect = asyncHandler(async (req, res, next) => {
	// get Bearer Token from request header

	if (
		!req.headers.authorization ||
		!req.headers.authorization.includes('Bearer')
	) {
		res.status(401);
		throw new Error('Unauthorized access is not allowed');
	}

	const token = req.headers.authorization.split(' ')[1]; // taking out token from Bearer token format = 'Bearer token_123'

	try {
		const user = await jwt.verify(token, process.env.JWT_SECRET);
		if (user) {
			req.user = user;
			next();
		}
	} catch (err) {
		res.status(401);
		throw new Error('Invalid JWT Token ');
	}
});

module.exports = protect;
