import { combineReducers } from 'redux';
import authedUser from './authedUser';
import polls from './polls';
import users from './users';
import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
	authedUser,
	users,
	polls,
	loadingBar: loadingBarReducer,
});
