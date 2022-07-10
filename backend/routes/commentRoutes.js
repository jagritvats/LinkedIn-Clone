const express = require('express');
const {
	getComments,
	addComment,
	getComment,
	updateComment,
	deleteComment,
} = require('../controllers/commentController');
const router = express.Router();

router.route('/').get(getComments).post(addComment);
router.route('/:id').get(getComment).patch(updateComment).delete(deleteComment);

module.exports = router;
