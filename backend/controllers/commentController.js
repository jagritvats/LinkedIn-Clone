const asyncHandler = require('express-async-handler');
const Comment = require('../models/comments/commentModel');
const mongoose = require('mongoose');

const getComments = asyncHandler(async (req, res) => {
	const comments = await Comment.find();

	res.status(200).json({
		comments,
		success: true,
	});
});

const addComment = asyncHandler(async (req, res) => {
	const { author, textContent, mediaContentURL, _id } = req.body;
	const comment = await Comment.create({
		_id,
		author,
		textContent,
		mediaContentURL,
	});

	res.status(201).json({
		comment,
		success: true,
	});
});

const getComment = asyncHandler(async (req, res) => {
	const { id } = req.body;

	const comment = await Comment.findById(id);

	if (!comment) {
		res.status(404);
		throw new Error('Comment not found');
	}

	res.status(200).json({
		comment,
		success: true,
	});
});

const deleteComment = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const comment = await Comment.findById(id);

	if (!comment) {
		res.status(400);
		throw new Error("Comment doesn't exist");
	}

	const deleteStatus = await Comment.findByIdAndDelete(id);

	res.status(200).json({
		deleted: deleteStatus,
		success: true,
	});
});

const updateComment = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const { textContent, mediaContentURL, likes, comments } = req.body;

	const commentExists = await Comment.findById(id);

	if (!commentExists) {
		res.status(404);
		throw new Error("Comment doesn't exist");
	}

	const comment = await Comment.findByIdAndUpdate(
		id,
		{
			textContent,
			mediaContentURL,
			likes,
			comments,
		},
		{
			new: true,
		}
	);

	res.json({
		comment,
		success: false,
	});
});

module.exports = {
	getComments,
	addComment,
	deleteComment,
	getComment,
	updateComment,
};
