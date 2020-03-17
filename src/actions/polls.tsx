import { PollsActionTypes, Polls, RECEIVE_POLLS } from '../types';

export function receivePolls(polls: Polls): PollsActionTypes {
	return {
		type: RECEIVE_POLLS,
		polls,
	};
}
