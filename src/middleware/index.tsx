import { applyMiddleware } from 'redux';
import { RootAction, RootState } from '../types';
import ReduxThunk, { ThunkMiddleware, ThunkDispatch } from 'redux-thunk';
import logger from './logger';

type DispatchFunctionType = ThunkDispatch<RootState, undefined, RootAction>;

const middleware = applyMiddleware<DispatchFunctionType, RootState>(
	ReduxThunk as ThunkMiddleware<RootState, RootAction>,
	logger
);

export default middleware;
