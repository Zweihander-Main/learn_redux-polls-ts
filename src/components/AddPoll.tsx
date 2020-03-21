import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState, RootAction, AddPollState } from '../types';
import { handleAddPoll } from '../actions/polls';
import { RouteComponentProps } from 'react-router';

class AddPoll extends Component<
	PropsFromRedux & RouteComponentProps,
	AddPollState
> {
	state = {
		question: '',
		a: '',
		b: '',
		c: '',
		d: '',
	};

	handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { value, name } = e.target;
		if (name in this.state) {
			this.setState(
				() =>
					({ [name]: value } as {
						[key in keyof AddPollState]: string;
					})
			);
		}
	};

	isDisabled = (): boolean => {
		const { question, a, b, c, d } = this.state;
		return question === '' || a === '' || b === '' || c === '' || d === '';
	};

	handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
		e.preventDefault();
		this.props.history.push('/');
		const { handleAddPollDispatch } = this.props;
		(handleAddPollDispatch as Function)(this.state);
	};

	render(): JSX.Element {
		const { question, a, b, c, d } = this.state;

		return (
			<form className="add-form" onSubmit={this.handleSubmit}>
				<h3 style={{ marginBottom: 5 }}>What is your question?</h3>
				<input
					value={question}
					onChange={this.handleInputChange}
					name="question"
					className="input"
					type="text"
				/>

				<h3>What are the options?</h3>

				<label className="label" htmlFor="a">
					A.
				</label>
				<input
					value={a}
					onChange={this.handleInputChange}
					name="a"
					className="input"
					id="a"
					type="text"
				/>

				<label className="label" htmlFor="b">
					B.
				</label>
				<input
					value={b}
					onChange={this.handleInputChange}
					name="b"
					className="input"
					id="b"
					type="text"
				/>

				<label className="label" htmlFor="c">
					C.
				</label>
				<input
					value={c}
					onChange={this.handleInputChange}
					name="c"
					className="input"
					id="c"
					type="text"
				/>

				<label className="label" htmlFor="d">
					D.
				</label>
				<input
					value={d}
					onChange={this.handleInputChange}
					name="d"
					className="input"
					id="d"
					type="text"
				/>

				<button
					disabled={this.isDisabled()}
					className="btn"
					type="submit"
				>
					Submit
				</button>
			</form>
		);
	}
}

const mapState = (state: RootState): RootState => ({ ...state });

const mapDispatchToProps = (
	dispatch: ThunkDispatch<AddPollState, AddPollState & undefined, RootAction>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
	return {
		handleAddPollDispatch: (poll: AddPollState): Promise<RootAction> =>
			dispatch(handleAddPoll(poll)),
	};
};

const connector = connect(mapState, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddPoll);
