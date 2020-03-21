import { savePollAnswer } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';
import { Dispatch, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
	ADD_ANSWER,
	AddAnswerActionTypes,
	AddAnswerData,
	RootAction,
} from '../types';

function addAnswer({
	authedUser,
	id,
	answer,
}: AddAnswerData): AddAnswerActionTypes {
	return {
		type: ADD_ANSWER,
		authedUser,
		id,
		answer,
	};
}

export const handleAddAnswer: ActionCreator<ThunkAction<
	Promise<RootAction>,
	AddAnswerData,
	null,
	RootAction
>> = (answerData: AddAnswerData) => {
	return (dispatch: Dispatch<RootAction>): Promise<RootAction> => {
		dispatch(showLoading() as RootAction);
		return savePollAnswer(answerData)
			.then(() => dispatch(addAnswer(answerData)))
			.then(() => dispatch(hideLoading() as RootAction));
	};
};
