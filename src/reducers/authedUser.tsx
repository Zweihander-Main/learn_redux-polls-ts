import { Reducer } from 'redux';
import { OtherActionTypes, SET_AUTHED_USER, AuthedUserType } from '../types';

const authedUser: Reducer<AuthedUserType, OtherActionTypes> = (
	state: AuthedUserType = null,
	action: OtherActionTypes
) => {
	switch (action.type) {
		case SET_AUTHED_USER:
			return action.id;
		default:
			return state;
	}
};

export default authedUser;
