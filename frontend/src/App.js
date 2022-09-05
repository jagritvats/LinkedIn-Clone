import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';
import PostPage from './pages/PostPage';
import ProfilePage from './pages/ProfilePage';

import ProtectRoutes from './utils/ProtectRoutes';

import './App.css';

function App() {
	return (
		<div className="app">
			<Router>
				<div className="rootContainer navbar__container">
					<Navbar />
				</div>
				<div className="rootContainer app__container">
					<Routes>
						<Route path="" element={<Homepage />} />
						<Route element={<ProtectRoutes />}>
							{/* Maybe later posts and profile pages are viewable without login, but for now this will be implements
							for non logged in users later, clicking on like or comment, should redirect to login
						*/}
							<Route path="/post/:id" element={<PostPage />} />
							<Route
								path="/profile/:id"
								element={<ProfilePage />}
							/>{' '}
							{/* if profile id of user and page are same then this will be user's profile page, with edit functionality */}
						</Route>
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
					</Routes>
				</div>

				<div className="rootContainer footer__container">
					<Footer />
				</div>
			</Router>
		</div>
	);
}

export default App;
