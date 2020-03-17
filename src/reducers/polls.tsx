import { Reducer } from 'redux';
import { RECEIVE_POLLS, PollsActionTypes, Polls } from '../types';

const polls: Reducer<Polls, PollsActionTypes> = (
	state: Polls = {},
	action: PollsActionTypes
) => {
	switch (action.type) {
		case RECEIVE_POLLS:
			return {
				...state,
				...action.polls,
			};
		default:
			return state;
	}
};

export default polls;
