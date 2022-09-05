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
				state.posts.push(action.payload); // push new Post to the post array
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
			.addCase(likePost.fulfilled, (state, action) => {
				state.posts.map((post) => {
					if (post._id === action.payload._id) {
						return { ...post, ...action.payload }; // updating post data
					}
					return post;
				});
			})
			.addCase(likePost.rejected, (state, action) => {
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
