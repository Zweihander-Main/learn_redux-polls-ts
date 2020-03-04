import {
	_getUsers,
	_getPolls,
	_savePoll,
	_savePollAnswer,
	Poll,
	Polls,
	Users,
} from './_DATA.js';
import { isObject } from './helpers';

function flattenPoll(poll: Poll): Record<string, string> {
	return Object.keys(poll).reduce((flattenedPoll, key) => {
		const val = poll[key];

		if (isObject(val)) {
			flattenedPoll[key + 'Text'] = val.text;
			flattenedPoll[key + 'Votes'] = val.votes;
			return flattenedPoll;
		}

		flattenedPoll[key] = val;
		return flattenedPoll;
	}, {});
}

function formatPolls(polls: Polls): Record<string, string> {
	const pollIds = Object.keys(polls);

	return pollIds.reduce((formattedPolls, id) => {
		formattedPolls[id] = flattenPoll(polls[id]);
		return formattedPolls;
	}, {});
}

function formatUsers(users: Users): Record<string, string> {
	return Object.keys(users).reduce((formattedUsers, id) => {
		const user = users[id];

		formattedUsers[id] = {
			...user,
			answers: Object.keys(user.answers),
		};

		return formattedUsers;
	}, {});
}

export function getInitialData(): Promise<{
	users: Record<string, string>;
	polls: Record<string, string>;
}> {
	return Promise.all([_getUsers(), _getPolls()]).then(([users, polls]) => ({
		users: formatUsers(users),
		polls: formatPolls(polls),
	}));
}

export function savePoll(poll: Poll): Promise<Record<string, string>> {
	return _savePoll(poll).then((p) => flattenPoll(p));
}

export function savePollAnswer(args: {
	authedUser: string;
	id: string;
	answer: string;
}): Promise<void> {
	return _savePollAnswer(args);
}
