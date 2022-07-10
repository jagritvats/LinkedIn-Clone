const express = require('express');
const router = express.Router();

const {
	getPosts,
	createPost,
	getPost,
	deletePost,
	updatePost,
} = require('../controllers/postController');
// getPostsForUID will be required too for personalized feed

router.route('/').get(getPosts).post(createPost);

router.route('/:id').get(getPost).patch(updatePost).delete(deletePost);

module.exports = router;
