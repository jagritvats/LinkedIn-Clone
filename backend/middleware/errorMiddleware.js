const errorHandler = (err, req, res, next) => {
	// const statusCode = res.statusCode ? res.statusCode : 500;
	// res.status(statusCode);

	// res.json({
	// 	message: err.message,
	// 	stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	// });

	const statusCode = res.statusCode ? res.statusCode : 500; // default status code if present, otherwise 500 i.e. server error

	res.status(statusCode);

	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	});
};

module.exports = {
	errorHandler,
};
