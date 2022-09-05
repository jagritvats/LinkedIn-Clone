import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from './authService';

const initialState = {
	user: localStorage.getItem('user')
		? JSON.parse(localStorage.getItem('user'))
		: null,
	isLoading: false,
	isError: false,
	isSuccess: false,
	message: '',
};

// a thunk is an async function which returns a promise
export const register = createAsyncThunk(
	'auth/register',
	async (user, thunkAPI) => {
		try {
			return await authService.register(user);
		} catch (err) {
			return thunkAPI.rejectWithValue(
				err.response.data.message || err.message || err
			);
		}
	}
);

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
	try {
		return await authService.login(user);
	} catch (err) {
		console.log('rejected', err.response.data.message);

		return thunkAPI.rejectWithValue(
			err.response.data.message || err.message || err
		);
	}
});

export const logout = createAsyncThunk(
	'auth/logout',
	async (user, thunkAPI) => {
		try {
			return await authService.logout(user);
		} catch (err) {
			return thunkAPI.rejectWithValue(
				err.response.data.message || err.message || err
			);
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state, action) => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state, action) => {
				state.isError = false;
				state.isSuccess = false;
				state.message = '';
				state.user = null;
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isError = false;
				state.isSuccess = true;
				state.message = '';
				state.user = action.payload;
				state.isLoading = false;
			})
			.addCase(register.rejected, (state, action) => {
				state.isError = true;
				state.message = action.payload;
				state.isSuccess = false;
				state.user = null;
				state.isLoading = false;
			})
			.addCase(login.pending, (state, action) => {
				state.isError = false;
				state.isSuccess = false;
				state.message = '';
				state.user = null;
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isError = false;
				state.isSuccess = true;
				state.message = '';
				state.user = action.payload;
				state.isLoading = false;
			})
			.addCase(login.rejected, (state, action) => {
				state.isError = true;
				state.message = action.payload;
				state.isSuccess = false;
				state.user = null;
				state.isLoading = false;
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.isError = false;
				state.isSuccess = true;
				state.message = '';
				state.user = null;
				state.isLoading = false;
			});
	},
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
