import axios from 'axios';

const API_URL = '/api/users/';

const register = async (user) => {
	const res = await axios.post(API_URL, user);
	if (res.status === 201) {
		console.log(res.data);
		localStorage.setItem('user', JSON.stringify(res.data));
		return res.data;
	}
	throw new Error('Error registering');
};

const login = async ({ email, password }) => {
	const res = await axios.post(`${API_URL}login`, {
		email,
		password,
	});
	if (res.status === 200) {
		localStorage.setItem('user', JSON.stringify(res.data));
		return res.data;
	}
	throw new Error('Error logging in');
};

const logout = async () => {
	localStorage.removeItem('user');
};

export const authService = {
	register,
	login,
	logout,
};
