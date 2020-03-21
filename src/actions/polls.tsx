import {
	PollsActionTypes,
	Polls,
	RECEIVE_POLLS,
	ADD_POLL,
	Poll,
	RootAction,
	RootState,
	AddPollState,
	PollToSave,
} from '../types';
import { Dispatch, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { savePoll } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export function addPoll(poll: Poll): PollsActionTypes {
	return {
		type: ADD_POLL,
		poll,
	};
}

export const handleAddPoll: ActionCreator<ThunkAction<
	Promise<RootAction>,
	RootState | AddPollState,
	null,
	RootAction
>> = (poll: AddPollState) => {
	return (dispatch: Dispatch<RootAction>, getState): Promise<RootAction> => {
		const { authedUser } = getState() as RootState;
		dispatch(showLoading() as RootAction);
		return savePoll({
			...poll,
			author: authedUser as string,
		} as PollToSave)
			.then((poll: Poll) => dispatch(addPoll(poll)))
			.then(() => dispatch(hideLoading() as RootAction));
	};
};

export function receivePolls(polls: Polls): PollsActionTypes {
	return {
		type: RECEIVE_POLLS,
		polls,
	};
}
