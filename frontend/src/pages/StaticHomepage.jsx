import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../media/images/heroImg.svg';
import './StaticHomepage.css';

function StaticHomepage() {
	return (
		<div className="staticHomepage">
			<div className="heroSection">
				<div className="left">
					<h2>Welcome to your Professional Community</h2>

					<ul className="heroSection__optionsList">
						<li className="optionsList__item">
							<Link to="#">Search for a job</Link>
						</li>

						<li className="optionsList__item">
							<Link to="#">Find a person you know</Link>
						</li>

						<li className="optionsList__item">
							<Link to="#">Learn a new skill</Link>
						</li>
					</ul>
				</div>

				<div className="heroImg">
					<img src={heroImg} alt="a working professional" />
				</div>
			</div>
		</div>
	);
}

export default StaticHomepage;
