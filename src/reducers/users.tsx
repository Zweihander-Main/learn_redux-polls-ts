import { Reducer } from 'redux';
import {
	RECEIVE_USERS,
	ADD_POLL,
	Users,
	UsersActionTypes,
	PollsActionTypes,
	ADD_ANSWER,
	AddAnswerActionTypes,
} from '../types';

const users: Reducer<
	Users,
	UsersActionTypes | PollsActionTypes | AddAnswerActionTypes
> = (
	state: Users = {},
	action: UsersActionTypes | PollsActionTypes | AddAnswerActionTypes
) => {
	switch (action.type) {
		case RECEIVE_USERS:
			return {
				...state,
				...action.users,
			};
		case ADD_POLL:
			return {
				...state,
				[action.poll.author]: {
					...state[action.poll.author],
					polls: state[action.poll.author].polls.concat([
						action.poll.id,
					]),
				},
			};
		case ADD_ANSWER:
			return {
				...state,
				[action.authedUser as string]: {
					...state[action.authedUser as string],
					answers: state[action.authedUser as string].answers.concat([
						action.id,
					]),
				},
			};
		default:
			return state;
	}
};

export default users;
