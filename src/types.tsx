import { Action } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';

export interface User {
	id: string;
	name: string;
	avatarURL: string;
	answers: Array<string>;
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
	aText: string;
	aVotes: Array<string>;
	author: string;
	bText: string;
	bVotes: Array<string>;
	cText: string;
	cVotes: Array<string>;
	dText: string;
	dVotes: Array<string>;
	id: string;
	question: string;
	timestamp: number;
}

export interface Polls {
	[key: string]: Poll;
}

export type AuthedUserType = string | null;

export interface AddPollState {
	question: string;
	a: string;
	b: string;
	c: string;
	d: string;
}

export interface PollToSave extends AddPollState {
	author: string;
}

export interface AddAnswerData {
	authedUser: AuthedUserType;
	id: string;
	answer: string;
}

export interface RootState {
	users: Users;
	polls: Polls;
	authedUser: AuthedUserType;
	loadingBar: typeof loadingBarReducer;
}

export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const RECEIVE_POLLS = 'RECEIVE_POLLS';
export const ADD_POLL = 'ADD_POLL';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_ANSWER = 'ADD_ANSWER';

export interface ReceiveUsersAction extends Action<typeof RECEIVE_USERS> {
	type: typeof RECEIVE_USERS;
	users: Users;
}

export interface ReceivePollsAction extends Action<typeof RECEIVE_POLLS> {
	type: typeof RECEIVE_POLLS;
	polls: Polls;
}

export interface AddPollAction extends Action<typeof ADD_POLL> {
	type: typeof ADD_POLL;
	poll: Poll;
}

export interface SetAuthedUserAction extends Action<typeof SET_AUTHED_USER> {
	type: typeof SET_AUTHED_USER;
	id: AuthedUserType;
}

export interface AddAnswerAction extends Action<typeof ADD_ANSWER> {
	type: typeof ADD_ANSWER;
	authedUser: AuthedUserType;
	id: string;
	answer: string;
}

// Add Action types from react-redux-loading
const SHOW = 'loading-bar/SHOW';
const HIDE = 'loading-bar/HIDE';

export interface ShowLoadingAction extends Action<typeof SHOW> {
	type: typeof SHOW;
	payload: {
		scope: string;
	};
}

export interface HideLoadingAction extends Action<typeof HIDE> {
	type: typeof HIDE;
	payload: {
		scope: string;
	};
}

export type UsersActionTypes = ReceiveUsersAction;
export type PollsActionTypes = ReceivePollsAction | AddPollAction;
export type OtherActionTypes = SetAuthedUserAction;
export type AddAnswerActionTypes = AddAnswerAction;
export type ExternalActionTypes = ShowLoadingAction | HideLoadingAction;

export type RootAction =
	| UsersActionTypes
	| PollsActionTypes
	| OtherActionTypes
	| ExternalActionTypes
	| AddAnswerActionTypes;
