const express = require('express');
const router = express.Router();

const {
	getUsers,
	registerUser,
	loginUser,
	getUser,
} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

router
	.route('/')
	.get(getUsers) // dev method, no protection for now
	.post(registerUser);

router.post('/login', loginUser);

router.get('/:id', getUser);

module.exports = router;
