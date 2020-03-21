import {
	RootState,
	AuthedUserType,
	Poll as PollType,
	AddAnswerData,
	RootAction,
} from '../types';
import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { getPercentage } from '../utils/helpers';
import { handleAddAnswer } from '../actions/answers';
import { RouteComponentProps } from 'react-router';

const getVoteKeys = (): Array<string> => [
	'aVotes',
	'bVotes',
	'cVotes',
	'dVotes',
];

class Poll extends Component<PropsFromRedux> {
	answered = false;

	handleAnswer = (answer: string): void => {
		const { poll, authedUser } = this.props;
		if (poll) {
			this.answered = true;
			this.props.handleAddAnswerDispatch({
				authedUser,
				answer,
				id: poll.id,
			});
		}
	};

	render(): JSX.Element {
		if (this.props.poll === null) {
			return <p>This poll does not exist</p>;
		}

		const { poll, vote, authorAvatar } = this.props;

		const totalVotes = getVoteKeys().reduce(
			(total: number, key: string) => total + poll[key].length,
			0
		);

		return (
			<div className="poll-container">
				<h1 className="question">{poll.question}</h1>
				<div className="poll-author">
					By <img src={authorAvatar} alt="Author's avatar" />
				</div>
				<ul>
					{['aText', 'bText', 'cText', 'dText'].map((key: string) => {
						const count = poll[key[0] + 'Votes'].length;

						return (
							<li
								onClick={(): void => {
									if (vote === null && !this.answered) {
										this.handleAnswer(key[0]);
									}
								}}
								className={`option ${
									vote === key[0] ? 'chosen' : ''
								}`}
								key={key}
							>
								{vote === null ? (
									poll[key]
								) : (
									<div className="result">
										<span>{poll[key]}</span>
										<span>
											{getPercentage(count, totalVotes)}%
											({count})
										</span>
									</div>
								)}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

interface PollMappedState {
	poll: PollType | null;
	vote?: string | null;
	authedUser?: AuthedUserType;
	authorAvatar?: string;
}

interface MatchParams {
	id: string;
}

const mapState = (
	{ authedUser, polls, users }: RootState,
	{ match }: RouteComponentProps<MatchParams>
): PollMappedState => {
	const { id } = match.params;
	const poll = polls[id];
	if (!poll) {
		return {
			poll: null,
		};
	}

	const vote = getVoteKeys().reduce((vote: null | string, key: string):
		| string
		| null => {
		if (vote !== null) {
			return vote[0];
		}
		return poll[key].includes(authedUser) ? key : vote;
	}, null);

	return {
		poll,
		vote,
		authedUser,
		authorAvatar: users[poll.author].avatarURL,
	};
};

const mapDispatchToProps = (
	dispatch: ThunkDispatch<
		AddAnswerData,
		AddAnswerData & undefined,
		RootAction
	>
): { [key: string]: Function } => {
	return {
		handleAddAnswerDispatch: (
			answerData: AddAnswerData
		): Promise<RootAction> => dispatch(handleAddAnswer(answerData)),
	};
};

const connector = connect(mapState, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Poll);
