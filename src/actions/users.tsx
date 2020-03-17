import { UsersActionTypes, RECEIVE_USERS, Users } from '../types';

export function receiveUsers(users: Users): UsersActionTypes {
	return {
		type: RECEIVE_USERS,
		users,
	};
}
