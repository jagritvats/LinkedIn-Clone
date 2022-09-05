import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import postReducer from '../features/post/postSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		post: postReducer,
		counter: counterReducer,
	},
});
