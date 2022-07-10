const mongoose = require('mongoose');

const postModel = mongoose.Schema(
	{
		// Author of the post, references user collection
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, "Please provide the author's id"],
		},
		// Text Based Content of the Post
		textContent: {
			type: String,
			required: [true, 'Please provide the content to post'],
		},
		// For Image/Video preview functionality later
		mediaContentURL: {
			type: String,
			trim: true,
		},
		// array of comment ids, references comment collection
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true,
				default: [], // initialize to an empty array
			},
		],
		// userIDs of users who likes this post
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Comment',
				required: true,
				default: [],
			},
		],
	},
	// Timestamps including created at and updated add will be automatically added
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Post', postModel);
