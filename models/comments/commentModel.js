const mongoose = require('mongoose');

// comment id will be set to the post id, it will contain comments for that particular post
// similar structure with post in vAlpha
const commentModel = new mongoose.Schema(
	{
		// id of the comment is based on the id of the post, will require refactoring for nested comments, also cannot comment twice

		_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post',
			required: [true, 'Please provide the post id to comment on'],
		},
		// Author of the comment, references user collection
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, "Please provide the author's id"],
		},
		// Text Based Content of the Comment
		textContent: {
			type: String,
			required: [true, 'Please provide the content to comment'],
		},
		// For Image/Video preview functionality later
		mediaContentURL: {
			type: String,
			trim: true,
		},
		// array of child comment ids, references comment collection
		likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		// userIDs of users who likes this comment
		comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
	},
	// Timestamps including created at and updated add will be automatically added
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Comment', commentModel);
