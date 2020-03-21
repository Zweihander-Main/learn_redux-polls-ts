import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav: React.FC = (): JSX.Element => {
	return (
		<nav className="nav">
			<ul>
				<li>
					<NavLink to="/" exact activeClassName="active">
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to="/leaderboard" activeClassName="active">
						Leaderboard
					</NavLink>
				</li>
				<li>
					<NavLink to="/add" activeClassName="active">
						Add Poll
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
