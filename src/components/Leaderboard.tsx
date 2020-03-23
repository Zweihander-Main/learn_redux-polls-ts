import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../types';

const Leaderboard: React.FC<PropsFromRedux> = ({
	users,
}: LeaderboardMappedState): JSX.Element => {
	return (
		<ul>
			{users.map((user: LeaderboardUserInfo) => (
				<li className="user" key={user.id}>
					<img src={user.avatarURL} alt={`Avatar for ${user.name}`} />
					<div>
						<h1>{user.name}</h1>
						<p>{user.polls} Polls</p>
						<p>{user.answers} Answers</p>
					</div>
				</li>
			))}
		</ul>
	);
};

interface LeaderboardUserInfo {
	id: string;
	name: string;
	avatarURL: string;
	polls: number;
	answers: number;
}

interface LeaderboardMappedState {
	users: Array<LeaderboardUserInfo>;
}

const mapState = ({ users }: RootState): LeaderboardMappedState => {
	return {
		users: Object.keys(users)
			.map(
				(id: string): LeaderboardUserInfo => {
					const { name, avatarURL, polls, answers } = users[id];

					return {
						id,
						name,
						avatarURL,
						polls: polls.length,
						answers: answers.length,
					};
				}
			)
			.sort((a, b) => b.polls + b.answers - (a.polls + a.answers)),
	};
};

export const connector = connect(mapState);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Leaderboard);
