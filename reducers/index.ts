import { combineReducers } from 'redux';
import userReducer from './user';
import postReducer from './post';

export default combineReducers({
    user: userReducer,
    posts: postReducer,
});