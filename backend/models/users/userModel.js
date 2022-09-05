const mongoose = require('mongoose');
const { ROLE, ROLE_ENUM } = require('./constants');

const userSchema = new mongoose.Schema(
	{
		fname: {
			type: String,
			required: true,
			trim: true,
		},
		lname: {
			type: String,
			trim: true,
		},
		username: {
			type: String,
			trim: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		mobile: {
			type: Number,
			unique: true,
			sparse: true, // for no error with null values duplicate
		},
		bio: {
			type: String,
			trim: true,
		},
		role: {
			type: Number,
			required: [true, 'Default should have taken over'], // maybe change
			default: ROLE.USER,
			enum: ROLE_ENUM,
		},
		// maybe refactor later into userPosts model, extendedUserInfo model
		posts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Post',
				required: true,
				default: [],
			},
		],
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Comment',
				required: true,
				default: [],
			},
		],
		followers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true,
				default: [],
			},
		],
		following: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true,
				default: [],
			},
		],
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Post',
				required: true,
				default: [],
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', userSchema);
