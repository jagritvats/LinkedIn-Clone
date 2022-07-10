const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users/userModel');
const asyncHandler = require('express-async-handler');

const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({}); // return all the users, not really a required feature, only for testing
	res.json({ users });
});

// might need custom error handler for checking unique username etc.
const registerUser = asyncHandler(async (req, res) => {
	const { fname, lname, username, email, password, mobile, bio, role } =
		req.body;

	if (!fname || !username || !email || !password) {
		res.status(400);
		throw new Error('Enter the required details for registration');
	}

	// bcrypt
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await User.create({
		fname,
		lname,
		username,
		email,
		password: hashedPassword,
		mobile,
		bio,
		role,
	});

	res.status(201).json({
		user,
		message: 'User Created',
		success: true,
		token: await generateToken(user._id),
	});
});

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		res.status();
		throw new Error("User doesn't exist");
	}
	const isCorrectPass = await bcrypt.compare(password, user.password);
	if (!isCorrectPass) {
		res.status(401);
		throw new Error('Incorrect Password');
	}

	const { _id, fname, lname, username, mobile, bio, role } = user;

	// not sending back mobile number for now
	res.json({
		user: {
			_id,
			fname,
			lname,
			username,
			email,
			bio,
			role,
		},
		success: true,
		message: 'Successfully Logged In',
		token: await generateToken(user._id),
	});
});

// update user implementation

const generateToken = async (id) => {
	const token = await jwt.sign({ id }, process.env.JWT_SECRET);
	return token;
};

module.exports = {
	getUsers,
	registerUser,
	loginUser,
};
