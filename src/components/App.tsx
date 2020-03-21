import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Users, Polls, RootState, RootAction } from '../types';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import Leaderboard from './Leaderboard';
import AddPoll from './AddPoll';
import Poll from './Poll';
import Nav from './Nav';

class App extends Component<PropsFromRedux> {
	componentDidMount(): void {
		const { handleInitialDataDispatch } = this.props;
		handleInitialDataDispatch();
	}
	render(): JSX.Element {
		return (
			<Router>
				<Fragment>
					<LoadingBar />
					<div className="container">
						<Nav />
						{this.props.loading ? null : (
							<div>
								<Route path="/" exact component={Dashboard} />
								<Route
									path="/leaderboard"
									component={Leaderboard}
								/>
								<Route path="/polls/:id" component={Poll} />
								<Route path="/add" component={AddPoll} />
							</div>
						)}
					</div>
				</Fragment>
			</Router>
		);
	}
}

const mapState = (state: RootState): RootState => ({ ...state });

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

const connector = connect(mapState, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedApp = connector(App);

export default ConnectedApp;
