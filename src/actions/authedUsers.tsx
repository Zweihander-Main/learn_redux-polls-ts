import { OtherActionTypes, SET_AUTHED_USER, AuthedUserType } from '../types';

export function setAuthedUser(id: AuthedUserType): OtherActionTypes {
	return {
		type: SET_AUTHED_USER,
		id,
	};
}
