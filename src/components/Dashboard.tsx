import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Poll, RootState } from '../types';
import { Link } from 'react-router-dom';

interface DashboardState {
	showAnswered: boolean;
}

class Dashboard extends Component<PropsFromRedux, DashboardState> {
	state = {
		showAnswered: false,
	};

	showUnanswered = (): void => {
		this.setState(() => ({
			showAnswered: false,
		}));
	};

	showAnswered = (): void => {
		this.setState(() => ({
			showAnswered: true,
		}));
	};

	render(): JSX.Element {
		const { showAnswered } = this.state;
		const { answered, unanswered } = this.props;

		const list = showAnswered === true ? answered : unanswered;

		return (
			<div>
				<div className="dashboard-toggle">
					<button
						style={{
							textDecoration:
								showAnswered === false
									? 'underline'
									: undefined,
						}}
						onClick={this.showUnanswered}
					>
						Unanswered
					</button>
					<span> | </span>
					<button
						style={{
							textDecoration:
								showAnswered === true ? 'underline' : undefined,
						}}
						onClick={this.showAnswered}
					>
						Answered
					</button>
				</div>
				<ul className="dashboard-list">
					{list.map((poll: Poll) => (
						<li key={poll.id}>
							<Link to={`polls/${poll.id}`}>{poll.question}</Link>
						</li>
					))}{' '}
				</ul>
			</div>
		);
	}
}

interface DashboardMappedState {
	answered: Array<Poll>;
	unanswered: Array<Poll>;
}

const mapState = ({
	authedUser,
	polls,
	users,
}: RootState): DashboardMappedState => {
	if (authedUser) {
		const answers = users[authedUser].answers;

		const answered = answers
			.map((id) => polls[id])
			.sort((a, b) => b.timestamp - a.timestamp);

		const unanswered = Object.keys(polls)
			.filter((id) => !answers.includes(id))
			.map((id) => polls[id])
			.sort((a, b) => b.timestamp - a.timestamp);

		return {
			answered,
			unanswered,
		};
	}
	return { answered: [], unanswered: [] };
};

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Dashboard);
