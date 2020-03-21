import { Reducer } from 'redux';
import {
	RECEIVE_POLLS,
	PollsActionTypes,
	Polls,
	ADD_POLL,
	AddAnswerActionTypes,
	ADD_ANSWER,
} from '../types';

const polls: Reducer<Polls, PollsActionTypes | AddAnswerActionTypes> = (
	state: Polls = {},
	action: PollsActionTypes | AddAnswerActionTypes
) => {
	switch (action.type) {
		case RECEIVE_POLLS:
			return {
				...state,
				...action.polls,
			};
		case ADD_POLL:
			return {
				...state,
				[action.poll.id]: action.poll,
			};
		case ADD_ANSWER:
			return {
				...state,
				[action.id]: {
					...state[action.id],
					[action.answer + 'Votes']: state[action.id][
						action.answer + 'Votes'
					].concat([action.authedUser]),
				},
			};
		default:
			return state;
	}
};

export default polls;
