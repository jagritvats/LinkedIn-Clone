const express = require('express');
const router = express.Router();

const {
	getPosts,
	createPost,
	getPost,
	deletePost,
	updatePost,
} = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');
// getPostsForUID will be required too for personalized feed

router
	.route('/')
	.get(getPosts) // dev method, no protection for now
	.post(protect, createPost);

router
	.route('/:id')
	.get(getPost) //no protection for now
	.patch(protect, updatePost)
	.delete(protect, deletePost);

module.exports = router;
