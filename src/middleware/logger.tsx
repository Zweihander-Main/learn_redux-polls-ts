import { Dispatch, MiddlewareAPI } from 'redux';
import { RootAction, RootState } from '../types';

/* eslint-disable no-console */
const logger = (store: MiddlewareAPI<Dispatch, RootState>) => (
	next: Dispatch<RootAction>
) => (action: RootAction): RootAction | void => {
	console.group(action.type);
	console.log('The action:', action);
	const returnValue = next(action);
	console.log('The new state:', store.getState());
	console.groupEnd();
	return returnValue;
};
/* eslint-enable no-console */

export default logger;
