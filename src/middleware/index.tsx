import { applyMiddleware } from 'redux';
import { RootAction, RootState } from '../types';
import ReduxThunk, { ThunkMiddleware, ThunkDispatch } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from './logger';

type DispatchFunctionType = ThunkDispatch<RootState, undefined, RootAction>;

const middleware = composeWithDevTools(
	applyMiddleware<DispatchFunctionType, RootState>(
		ReduxThunk as ThunkMiddleware<RootState, RootAction>,
		logger
	)
);

export default middleware;
