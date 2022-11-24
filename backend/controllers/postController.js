const mongoose = require('mongoose');
const Post = require('../models/posts/postModel');
const asyncHandler = require('express-async-handler');

//
const getPosts = asyncHandler(async (req, res) => {
	const posts = await Post.find({}).sort({ createdAt: -1 }); // return all the posts, not really a required feature, only for testing
	res.json(posts);
});

const createPost = asyncHandler(async (req, res) => {
	const { author, textContent, mediaContentURL } = req.body;
	if (!author || (!textContent && !mediaContentURL)) {
		res.status(400);
		throw new Error('Provide post data');
	}

	if (!mongoose.isValidObjectId(author)) {
		res.status(400);
		throw new Error('Please provide valid author id');
	}

	if (author != req.user.id) {
		throw new Error('Unauthorized post creation');
	}

	const post = await Post.create({
		author,
		textContent,
		mediaContentURL,
	});
	res.status(201).json({
		post,
		success: true,
	});
});

const getPost = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const post = await Post.findById(id);

	if (!post) {
		res.status(404);
		throw new Error("The post doesn't exist");
	}

	res.status(200).json({
		post,
		success: true,
	});
});

const deletePost = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const post = await Post.findById(id);
	console.log(post, post.author, req.user);
	if (post.author != req.user.id) {
		res.status(401);
		throw new Error('Unauthorized deleted operation');
	}

	if (!post) {
		res.status(404);
		throw new Error("Post doesn't exist");
	}

	const deleteStatus = await Post.findByIdAndDelete(id);

	res.json({
		deleted: deleteStatus,
		success: true,
	});
});

// NOTE : DECOUPLE REQUEST/RES FROM DB LOGIC -> models -- later

// not public, not secure
const updatePost = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { textContent, mediaContentURL, likes, comments } = req.body;

	const postExists = await Post.findById(id); //post id
	if (!postExists) {
		res.status(404);
		throw new Error("The post to update doesn't exist");
	}

	if (postExists.author != req.user.id) {
		throw new Error('User not authorized to update this post');
	}

	const post = await Post.findByIdAndUpdate(
		id,
		{
			textContent,
			mediaContentURL,
			likes,
			comments,
		},
		{ new: true } // to override default behaviour and return updated post data
	);

	res.json({
		post,
		success: true,
	});
});

// edit post, limited version of above
const editPost = asyncHandler(async (req, res) => {
	const { id } = req.params;
	// for now
	const { textContent } = req.body;

	if (!textContent) {
		throw new Error('No new content provided');
	}

	const postExists = await Post.findById(id); //post id
	if (!postExists) {
		res.status(404);
		throw new Error("The post to edit doesn't exist");
	}

	if (postExists.author != req.user.id) {
		throw new Error('User not authorized to edit this post');
	}

	const post = await Post.findByIdAndUpdate(
		id,
		{
			textContent,
		},
		{ new: true } // to override default behaviour and return updated post data
	);

	res.json({
		post,
		success: true,
	});
});

// add checks for same user id as token's

const likePost = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { userId } = req.body;

	if (req.user.id !== userId) {
		res.status(401);
		throw new Error('Cannot like as another user!');
	}
	const post = await Post.findByIdAndUpdate(
		id,
		{ $addToSet: { likes: userId } },
		{ new: true } // to override default behaviour and return updated post data
	);

	// user obj likes list, and post liked list -> have to maintain atomicity -- later/manual
	res.json({
		post,
		success: true,
	});
});

const unLike = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { userId } = req.body;
	let post;
	if (req.user.id !== userId) {
		res.status(401);
		throw new Error('Cannot like as another user!');
	}
	try {
		post = await Post.findByIdAndUpdate(
			id,
			{
				$pull: { likes: userId },
			},
			{ new: true }
		);
	} catch (err) {
		res.status(500);
		throw new Error('Error updating likes to unlike');
	}
	res.json({
		success: true,
		post,
	});
});

// custom posts filter implementation

module.exports = {
	getPosts,
	createPost,
	getPost,
	deletePost,
	updatePost,
	likePost,
	unLike,
	editPost,
};
