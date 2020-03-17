import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import {
	Users,
	Polls,
	RootState,
	RootAction,
	ReceiveUsersAction,
	ReceivePollsAction,
	SetAuthedUserAction,
	AuthedUserType,
} from '../types';
import { receiveUsers } from '../actions/users';
import { receivePolls } from '../actions/polls';
import { setAuthedUser } from '../actions/authedUsers';
import { handleInitialData } from '../actions/shared';

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
		handleReceiveUsersDispatch: (users: Users): ReceiveUsersAction =>
			dispatch(receiveUsers(users)),
		handleReceivePollsDispatch: (polls: Polls): ReceivePollsAction =>
			dispatch(receivePolls(polls)),
		handleSetAuthedUserDispatch: (
			id: AuthedUserType
		): SetAuthedUserAction => dispatch(setAuthedUser(id)),
	};
};

export const connector = connect(mapState, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;
