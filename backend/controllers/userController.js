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
		res.status(400).json({
			message: 'Enter all the required details for registration',
		});
	}

	// bcrypt
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	let user;
	try {
		user = await User.create({
			fname,
			lname,
			username,
			email,
			password: hashedPassword,
			mobile,
			bio,
			role,
		});
	} catch (err) {
		if (err.message.split(' ')[0] == 'E11000') {
			res.status(409);
			throw new Error('Already registered');
		}
		throw new Error('Error Registering');
	}

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
		res.status(401);
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

const getUser = asyncHandler(async (req, res) => {
	const { id } = req.params;

	let user = await User.findById(id).select(
		'fname email role posts comments'
	);
	if (!user) {
		res.status(404);
		throw new Error("The post doesn't exist");
	}

	res.status(200).json({
		user,
		success: true,
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
	getUser,
};
