const express = require('express');
const router = express.Router();

const {
	getPosts,
	createPost,
	getPost,
	deletePost,
	likePost,
	unLike,
	editPost,
} = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');
// getPostsForUID will be required too for personalized feed

router
	.route('/')
	.get(getPosts) // dev method, no protection for now
	.post(protect, createPost);

router.route('/:id/likes').post(protect, likePost).delete(protect, unLike);

// router.route('/:id/comment').patch(addCommentToPost);

router
	.route('/:id')
	.get(getPost) //no protection for now
	.patch(protect, editPost)
	.delete(protect, deletePost);

module.exports = router;
