import React, { Component } from 'react';
import { PropsFromRedux, connector } from '../utils/connector';

class App extends Component<PropsFromRedux> {
	componentDidMount(): void {
		const { handleInitialDataDispatch } = this.props;
		handleInitialDataDispatch();
	}
	render(): JSX.Element {
		return <div>Starter Code.</div>;
	}
}

const ConnectedApp = connector(App);

export default ConnectedApp;
