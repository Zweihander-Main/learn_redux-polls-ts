import { Reducer } from 'redux';
import { RECEIVE_USERS, Users, UsersActionTypes } from '../types';

const users: Reducer<Users, UsersActionTypes> = (
	state: Users = {},
	action: UsersActionTypes
) => {
	switch (action.type) {
		case RECEIVE_USERS:
			return {
				...state,
				...action.users,
			};
		default:
			return state;
	}
};

export default users;
