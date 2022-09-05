import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './Register.css';

function Register() {
	const API_URL = 'api/users';
	const [formData, setFormData] = useState({
		fname: '',
		lname: '',
		email: '',
		username: '',
		password: '',
		password2: '',
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
	}, [formData]);

	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	const registerUser = async (e) => {
		e.preventDefault();

		const { fname, lname, username, email, password, password2 } = formData;

		if (!fname || !email || !username || !password) {
			setValidationError('Please enter all the required details');
			return;
		}
		if (password !== password2) {
			setValidationError('The passwords entered are different');
			return;
		}
		const userData = {
			fname,
			lname,
			username,
			email,
			password,
		};

		try {
			dispatch(register(userData));
		} catch (err) {
			console.log('Error in register page ', err);
		}
	};
	return (
		<div className="auth register">
			<h2>Make the most of your professional life</h2>
			<form onSubmit={registerUser}>
				<div className="row">
					<div className="form__item">
						<label className="required" htmlFor="fname">
							First Name
						</label>
						<input
							type="text"
							id="fname"
							name="fname"
							value={formData.fname}
							onChange={updateFormState}
						/>
					</div>
					<div className="form__item">
						<label htmlFor="lname">Last Name</label>
						<input type="text" />
					</div>
				</div>

				<div className="form__item">
					<label className="required" htmlFor="username">
						Username
					</label>
					<input
						type="text"
						id="username"
						name="username"
						value={formData.username}
						onChange={updateFormState}
					/>
				</div>

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

				<div className="row">
					<div className="form__item">
						<label className="required" htmlFor="password2">
							Confirm Password
						</label>
						<input
							type="password"
							name="password2"
							id="password2"
							value={formData.password2}
							onChange={updateFormState}
						/>
					</div>
				</div>

				<p>All your data is belong to us</p>

				<button className="btn btn-filled" type="submit">
					Agree and Join
				</button>

				{auth.isLoading ? <h4>Registering..</h4> : ' '}

				<div className="success">
					{auth.isSuccess ? (
						<p style={{ color: 'green' }}>Account Created</p>
					) : (
						''
					)}
				</div>

				<div className="error">
					<span>
						{validationError || (auth.isError ? auth.message : '')}
					</span>
				</div>

				<p>
					Already on LinkedIn? <Link to="/login">Sign In</Link>
				</p>
			</form>
		</div>
	);
}

export default Register;
