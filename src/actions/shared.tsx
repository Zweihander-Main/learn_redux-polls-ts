import { getInitialData } from '../utils/api';
import { receiveUsers } from './users';
import { receivePolls } from './polls';
import { setAuthedUser } from './authedUsers';
import { Users, Polls, RootAction } from '../types';
import { Dispatch, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { showLoading, hideLoading } from 'react-redux-loading';

const AUTHED_ID = 'tylermcginnis';

export const handleInitialData: ActionCreator<ThunkAction<
	Promise<void>,
	Users | Polls,
	null,
	RootAction
>> = () => {
	return (dispatch: Dispatch<RootAction>): Promise<void> => {
		dispatch(showLoading() as RootAction);
		return getInitialData().then(({ users, polls }): void => {
			dispatch(receiveUsers(users));
			dispatch(receivePolls(polls));
			dispatch(setAuthedUser(AUTHED_ID));
			dispatch(hideLoading() as RootAction);
		});
	};
};
