import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postService } from './postService';

const initialState = {
	posts: [],
	success: false,
	isLoading: false,
	isError: false,
	message: '',
};

export const getPosts = createAsyncThunk('post/getall', async (thunkAPI) => {
	try {
		return await postService.getPosts();
	} catch (err) {
		thunkAPI.rejectWithValue(
			err.response.data.message || err.message || err
		);
	}
});

export const addPost = createAsyncThunk('post/add', async (post, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await postService.addPost(post, token);
	} catch (err) {
		thunkAPI.rejectWithValue(
			err.response.data.message || err.message || err
		);
	}
});

export const deletePost = createAsyncThunk(
	'post/delete',
	async (postId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			await postService.deletePost(postId, token);
			return postId;
		} catch (err) {
			thunkAPI.rejectWithValue(
				err.response.data.message || err.message || err
			);
		}
	}
);

export const editPost = createAsyncThunk(
	'post/edit',
	async ({ postId, userId, textContent }, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;

			return await postService.editPost(
				postId,
				userId,
				textContent,
				token
			);
		} catch (err) {
			console.log(err);
			thunkAPI.rejectWithValue(
				err.response.data.message || err.message || err
			);
		}
	}
);

export const likePost = createAsyncThunk(
	'post/like',
	async ({ postId, userId }, thunkAPI) => {
		try {
			console.log('a', thunkAPI.getState());
			const token = thunkAPI.getState().auth.user.token;

			return await postService.likePost(postId, userId, token);
		} catch (err) {
			console.log(err);
			thunkAPI.rejectWithValue(
				err.response.data.message || err.message || err
			);
		}
	}
);

export const unlikePost = createAsyncThunk(
	'post/unlike',
	async (postId, userId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await postService.unLikePost(postId, userId, token);
		} catch (err) {
			thunkAPI.rejectWithValue(
				err.response.data.message || err.message || err
			);
		}
	}
);

export const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		resetPosts: (state, action) => {
			state = initialState;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addPost.pending, (state, action) => {
				state.isLoading = true;
				state.isError = false;
				state.success = false;
			})
			.addCase(addPost.fulfilled, (state, action) => {
				console.log('adding ', action.payload);
				state.posts.unshift(action.payload);

				console.log('posts fullfilled ', state.posts);
				state.isLoading = false;
			})
			.addCase(addPost.rejected, (state, action) => {
				state.posts = [];
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getPosts.pending, (state, action) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(getPosts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.posts = action.payload;
			})
			.addCase(editPost.fulfilled, (state, action) => {
				const newpost = action.payload.post;
				console.log('edit', action.payload, state.posts[0]);
				let i = state.posts.findIndex(
					(post) => post._id == newpost._id
				);
				console.log(i);
				state.posts[i] = newpost;
			})
			.addCase(likePost.fulfilled, (state, action) => {
				state.posts.map((post) => {
					console.log('like ', action.payload);
					if (post._id === action.payload._id) {
						return { ...post, ...action.payload }; // updating post data
					}
					return post;
				});
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				console.log('Before posts  ', state.posts, action.payload);
				state.posts = state.posts.filter(
					(post) => post._id !== action.payload
				);

				console.log('delete after posts  ', state.posts);
			})
			.addCase(likePost.rejected, (state, action) => {
				console.log('liked post');
				state.message = action.payload;
				state.isError = true;
				state.isLoading = false;
			})
			.addCase(unlikePost.fulfilled, (state, action) => {
				state.posts.map((post) => {
					if (post._id === action.payload._id) {
						return { ...post, ...action.payload }; // updating post data
					}
					return post;
				});
			});
	},
});

export const { resetPosts } = postSlice.actions;
export default postSlice.reducer;
