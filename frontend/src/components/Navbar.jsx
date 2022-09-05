import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import './Navbar.css';

import LinkedInIcon from '../media/images/icons/linkedin.svg';
import HomeIcon from '../media/images/icons/home.svg';
import NetworkIcon from '../media/images/icons/network.svg';
import JobsIcon from '../media/images/icons/jobs.svg';
import MessageIcon from '../media/images/icons/messaging.svg';
import NotificationsIcon from '../media/images/icons/notifications.svg';
import ProfileIcon from '../media/images/icons/profile.svg';
import WorkIcon from '../media/images/icons/work.svg';
import SearchIcon from '../media/images/icons/search.svg';

function Navbar() {
	const auth = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	return (
		<nav className="navbar">
			{auth.user ? (
				<>
					<div className="nav__header">
						<h1>
							<Link to="/">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									data-supported-dps="24x24"
									fill="currentColor"
									class="mercado-match"
									width="24"
									height="24"
									focusable="false"
								>
									<path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
								</svg>
							</Link>
						</h1>

						<form
							className="reset__spacing"
							onClick={(e) => e.preventDefault()}
						>
							<div className="nav__searchBar">
								<img src={SearchIcon} alt="search icon" />
								<input type="text" placeholder="Search" />
							</div>
						</form>
					</div>
					<ul className="navbar__tabs">
						<li className="navbar__tab">
							<Link to="/">
								<img src={HomeIcon} alt="home" />
								<span>Home</span>
							</Link>
						</li>
						<li className="navbar__tab">
							<Link to="/mynetwork">
								<img src={NetworkIcon} alt="network" />
								<span>My Network</span>
							</Link>
						</li>
						<li className="navbar__tab">
							<Link to="/jobs">
								<img src={JobsIcon} alt="network" />
								<span>Jobs</span>
							</Link>
						</li>
						<li className="navbar__tab">
							<Link to="/messaging">
								<img src={MessageIcon} alt="network" />
								<span>Messaging</span>
							</Link>
						</li>
						<li className="navbar__tab">
							<Link to="/notifications">
								<img src={NotificationsIcon} alt="network" />
								<span>Notifications</span>
							</Link>
						</li>
						<li>
							<button className="dropdown__btn">
								<img src={ProfileIcon} alt="profile" />
								<span>Me</span>
							</button>
						</li>
						<li>
							<button className="dropdown__btn">
								<img src={WorkIcon} alt="work" />
								<span>Work</span>
							</button>
						</li>
						<li>
							<Link to="/premium" className="prem__adv">
								<p>Get Hired Faster,</p>
								<p>Try Premium Free</p>
							</Link>
						</li>

						<li>
							<button onClick={() => dispatch(logout())}>
								Logout
							</button>
						</li>
					</ul>
				</>
			) : (
				<>
					<h1>
						<Link to="/">
							Linked <span>in</span>
						</Link>
					</h1>
					<ul className="navbar__links">
						<li>
							<Link to="">
								{/* Icon */}
								Discover
							</Link>
						</li>
						<li>
							<Link to="">People</Link>
						</li>
						<li>
							<Link to="">Learning</Link>
						</li>
						<li>
							<Link to="">Jobs</Link>
						</li>
					</ul>

					<ul className="navbar__actions">
						{auth.user ? (
							<li>
								<button onClick={() => dispatch(logout())}>
									Logout
								</button>
							</li>
						) : (
							<>
								<li>
									<Link to="/register" className="btn__link">
										Join Now
									</Link>
								</li>
								<li>
									<Link to="/login" className="btn__outlined">
										Sign In
									</Link>
								</li>
							</>
						)}
					</ul>
				</>
			)}
		</nav>
	);
}

export default Navbar;
