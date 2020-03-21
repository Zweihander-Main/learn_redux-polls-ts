import {
	_getUsers,
	_getPolls,
	_savePoll,
	_savePollAnswer,
	RawUsers,
	RawPolls,
	RawPoll,
} from './_DATA';
import { Poll, Polls, Users, PollToSave, AddAnswerData } from '../types';
import { isObject } from './helpers';

function flattenPoll(poll: RawPoll): Poll {
	return Object.keys(poll).reduce((flattenedPoll, key) => {
		const val = poll[key];

		if (isObject(val)) {
			flattenedPoll[key + 'Text'] = val.text;
			flattenedPoll[key + 'Votes'] = val.votes;
			return flattenedPoll;
		}

		flattenedPoll[key] = val;
		return flattenedPoll;
	}, {} as Poll);
}

function formatPolls(polls: RawPolls): Polls {
	const pollIds = Object.keys(polls);

	return pollIds.reduce((formattedPolls, id) => {
		formattedPolls[id] = flattenPoll(polls[id]);
		return formattedPolls;
	}, {} as Polls);
}

function formatUsers(users: RawUsers): Users {
	return Object.keys(users).reduce((formattedUsers, id) => {
		const user = users[id];

		formattedUsers[id] = {
			...user,
			answers: Object.keys(user.answers),
		};

		return formattedUsers;
	}, {} as Users);
}

export function getInitialData(): Promise<{
	users: Users;
	polls: Polls;
}> {
	return Promise.all([_getUsers(), _getPolls()]).then(
		([users, polls]: [RawUsers, RawPolls]) => ({
			users: formatUsers(users),
			polls: formatPolls(polls),
		})
	);
}

export function savePoll(poll: PollToSave): Promise<Poll> {
	return _savePoll(poll).then((p: RawPoll) => flattenPoll(p));
}

export function savePollAnswer(args: AddAnswerData): Promise<void> {
	return _savePollAnswer(args);
}
