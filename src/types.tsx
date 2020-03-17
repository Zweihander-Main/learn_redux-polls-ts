import { Action } from 'redux';

export interface User {
	id: string;
	name: string;
	avatarURL: string;
	answers: { [key: string]: string };
	polls: Array<string>;
}

export interface Users {
	[key: string]: User;
}

export interface Choice {
	text: string;
	votes: Array<string>;
}

export interface Poll {
	id: string;
	question: string;
	author: string;
	timestamp: number;
	a: Choice;
	b: Choice;
	c: Choice;
	d: Choice;
}

export interface Polls {
	[key: string]: Poll;
}

export interface FlatPoll {
	question: string;
	author: string;
	a: string;
	b: string;
	c: string;
	d: string;
}

export type AuthedUserType = string | null;

export interface RootState {
	users: Users;
	polls: Polls;
	authedUser: AuthedUserType;
}

export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const RECEIVE_POLLS = 'RECEIVE_POLLS';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export interface ReceiveUsersAction extends Action<typeof RECEIVE_USERS> {
	type: typeof RECEIVE_USERS;
	users: Users;
}

export interface ReceivePollsAction extends Action<typeof RECEIVE_POLLS> {
	type: typeof RECEIVE_POLLS;
	polls: Polls;
}

export interface SetAuthedUserAction extends Action<typeof SET_AUTHED_USER> {
	type: typeof SET_AUTHED_USER;
	id: AuthedUserType;
}

export type UsersActionTypes = ReceiveUsersAction;
export type PollsActionTypes = ReceivePollsAction;
export type OtherActionTypes = SetAuthedUserAction;

export type RootAction = UsersActionTypes | PollsActionTypes | OtherActionTypes;
