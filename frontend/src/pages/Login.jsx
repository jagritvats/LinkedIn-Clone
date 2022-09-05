import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { login, register } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './Auth.css';
import { useEffect } from 'react';

function Login() {
	const API_URL = 'api/users/login';
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [validationError, setValidationError] = useState(null);

	const updateFormState = (e) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			[e.target.name]: e.target.value,
		}));
	};

	useEffect(() => {
		setValidationError(null);
	}, []);

	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	if (auth.user) {
		return <Navigate replace={true} to="/" />;
	}

	const loginUser = async (e) => {
		e.preventDefault();

		const { email, password } = formData;

		if (!email || !password) {
			setValidationError('Please enter all the required details');
			return;
		}
		const userData = {
			email,
			password,
		};
		try {
			// user = await axios.post(API_URL, user
			dispatch(login(userData));
		} catch (err) {
			console.log('Error in login ', err);
		}
	};

	return (
		<div className="auth login">
			<h2>Stay updated in your professional world</h2>

			<form onSubmit={loginUser}>
				<div className="row">
					<div className="form__item">
						<label className="required" htmlFor="email ">
							Email
						</label>
						<input
							type="email"
							name="email"
							id="email"
							value={formData.email}
							onChange={updateFormState}
						/>
					</div>
				</div>
				<div className="row">
					<div className="form__item">
						<label className="required" htmlFor="password">
							Password
						</label>
						<input
							type="password"
							name="password"
							id="passsword"
							value={formData.password}
							onChange={updateFormState}
						/>
					</div>
				</div>
				<button className="btn btn-filled" type="submit">
					Login
				</button>
				{auth.isLoading ? <h4>Logging In...</h4> : ' '}
				<div className="error">
					<span>
						{validationError || (auth.isError ? auth.message : '')}
					</span>
				</div>
			</form>

			<p>
				New to LinkedIn?
				<Link to="/register">Join Now!</Link>
			</p>
		</div>
	);
}

export default Login;
