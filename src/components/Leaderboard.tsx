import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Users, Polls, RootState, RootAction } from '../types';
import { handleInitialData } from '../actions/shared';

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

const mapDispatchToProps = (
	dispatch: ThunkDispatch<
		Users & Polls,
		Users & Polls & undefined,
		RootAction
	>
): { [key: string]: Function } => {
	return {
		handleInitialDataDispatch: (): Promise<void> =>
			dispatch(handleInitialData()),
	};
};

export const connector = connect(mapState, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Leaderboard);
