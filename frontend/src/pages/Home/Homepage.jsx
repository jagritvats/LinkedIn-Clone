import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Homepage.css';
import StaticHomepage from '../StaticHomepage';
import AddPost from './AddPost';
import PostsDisplay from './PostsDisplay';
import DefPic from '../../media/images/defpic.jpg';

function Homepage() {
	const auth = useSelector((state) => state.auth);

	if (!auth.user) {
		return <StaticHomepage />;
	}

	console.log(auth.user);
	return (
		<div className="home">
			<aside>
				<div className="profile">
					<h2>Your Profile</h2>
					<div className="profile__img">
						<img src={DefPic} alt={`${auth.user.user.username}`} />
					</div>
					<h2>
						{auth.user.user.fname} {auth.user.user.lname}
					</h2>
					<h3 style={{ color: 'gray', cursor: 'pointer' }}>
						@{auth.user.user.username}
					</h3>
					<p className="bio">
						{auth.user.user.bio
							? auth.user.user.bio
							: "I'm a regular account who doesn't care about their bio"}
					</p>

					<hr />

					<div className="profile__stats">
						<div>
							<h5>Connections</h5>{' '}
							<span id="numConnections">0</span>
						</div>
						<div>
							<h5>Connect with Alumni</h5>{' '}
							<span id="profileViews">0</span>{' '}
						</div>
					</div>

					<hr />

					<div className="profile__premium">
						<h5>Access exculsive tools &amp; insights</h5>
						<div>
							<i></i>
							<Link to="/premium">Try Premium for Free</Link>
						</div>
					</div>

					<hr />

					<div id="items">
						<i id="items"></i>

						<Link to="/items">My Items</Link>
					</div>
				</div>

				<div className="recommendations">
					<div className="recommendations__group">
						<h4>Recent</h4>
						<Link to="/">GitHub Product Community</Link>
						<Link to="/">Front End Developer Group</Link>
						<Link to="/">GitHub Product Community</Link>
					</div>
				</div>
			</aside>

			<main>
				<AddPost />
				<PostsDisplay />
			</main>

			<aside>
				<div className="news">
					<div className="sidebar__header">
						<h2>LinkedIn News</h2>
						<i>i</i>
					</div>

					<ul className="newsList">
						<li className="newsList__item">
							<Link to="#">Talent moves to Tier-2 cities</Link>
							<p className="newsList__stats">
								<span className="newsList__ago">1d ago</span>.
								<span className="newsList__readers">
									2,888 readers
								</span>
							</p>
						</li>
						<li className="newsList__item">
							<Link to="#">
								Startup layoffs worry senior leaders
							</Link>
							<p className="newsList__stats">
								<span className="newsList__ago">5d ago</span>.
								<span className="newsList__readers">
									34,548 readers
								</span>
							</p>
						</li>
						<li className="newsList__item">
							<Link to="#">The gender gap in leadership</Link>
							<p className="newsList__stats">
								<span className="newsList__ago">1h ago</span>.
								{/* <span className="newsList__readers">
									2,888 readers
								</span> */}
							</p>
						</li>
						<li className="newsList__item">
							<Link to="#">
								Narayana Murthy's pearls of wisdom
							</Link>
							<p className="newsList__stats">
								<span className="newsList__ago">1h ago</span>.
								{/* <span className="newsList__readers">
									2,888 readers
								</span> */}
							</p>
						</li>
						<li className="newsList__item">
							<Link to="#">
								Accolite Digital to hire 6,000 in India
							</Link>
							<p className="newsList__stats">
								<span className="newsList__ago">2d ago</span>.
								<span className="newsList__readers">
									7,896 readers
								</span>
							</p>
						</li>
						<div className="newsLists__more">Show more</div>
					</ul>
				</div>

				<hr />

				<footer>
					<ul className="footer__links">
						<li className="footer__link">
							<Link to="/about">About</Link>
						</li>
						<li className="footer__link">
							<Link to="/about">Accesibility</Link>
						</li>
						<li className="footer__link">
							<Link to="/about">Help Center</Link>
						</li>
						<li className="footer__link">
							<Link to="/about">Privacy &amp; Terms</Link>
						</li>
						<li className="footer__link">
							<Link to="/about">Ad Choices</Link>
						</li>
					</ul>

					<div className="footer__logo">
						LinkedIn Corporation © 2022
					</div>
				</footer>
			</aside>

			<div className="messagingWindow">
				<h3>Messaging</h3>
				<div className="messagingWindow__content"></div>
			</div>
		</div>
	);
}

export default Homepage;
