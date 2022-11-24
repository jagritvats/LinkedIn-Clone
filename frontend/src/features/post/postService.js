import axios from 'axios';

const API_URL = '/api/posts/';

const getPosts = async () => {
	const res = await axios.get(API_URL);
	if (res.status === 200) {
		return res.data;
	}
	throw new Error('Error getting posts.');
};

const addPost = async (post, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const res = await axios.post(API_URL, post, config);
	if (res.status === 201) {
		console.log(res.data);
		// localStorage.setItem('posts', JSON.stringify(res.data)); // temporary
		return res.data.post;
	}
	throw new Error('Error adding post');
};

const likePost = async (postId, userId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	console.log('likee');
	try {
		const res = await axios.post(
			`${API_URL}${postId}/likes`,
			{ userId },
			config
		);

		console.log('liked?');

		if (res.status === 200) {
			return res.data;
		}
	} catch (err) {
		console.log(err);
	}
	throw new Error('Error liking the post');
};

const editPost = async (postId, userId, textContent, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	console.log('edit post');
	try {
		const res = await axios.patch(
			`${API_URL}${postId}`,
			{ userId, textContent },
			config
		);

		console.log('liked?');

		if (res.status === 200) {
			return res.data;
		}
	} catch (err) {
		console.log(err);
	}
	throw new Error('Error liking the post');
};

const unLikePost = async (postId, userId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const res = await axios.delete(
		`${API_URL}${postId}/likes`,
		{ userId },
		config
	);
	if (res.status === 200) {
		return res.data;
	}
	throw new Error('Error removing like from the post.');
};

const deletePost = async (postId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const res = await axios.delete(`${API_URL}${postId}`, config);
	if (res.status === 200) {
		return res.data;
	}
	throw new Error('Error deleting the post');
};

const resetPosts = async (postId) => {
	// localStorage.removeItem('posts');
};

export const postService = {
	getPosts,
	addPost,
	likePost,
	editPost,
	unLikePost,
	deletePost,
	resetPosts,
};
